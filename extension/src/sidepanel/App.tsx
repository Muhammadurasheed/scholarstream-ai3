import React, { useState, useRef, useEffect } from 'react';
import { Send, Upload, Sparkles, User, Bot, Mic, MicOff, FileText, LogIn, AlertCircle, CheckCircle2, Circle, Globe, X, Loader2, RefreshCw } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';
import { ENDPOINTS, detectPlatform, calculateProfileCompleteness, parseDocument, generateDocumentId, type ContextStatus, type UploadedDocument } from '../config';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    text: string;
}

export default function App() {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', role: 'assistant', text: 'Hello! I am your ScholarStream Co-Pilot. I can help you apply for this opportunity. Upload your project doc or ask me anything!' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [projectContext, setProjectContext] = useState<string | null>(null);
    const [projectFileName, setProjectFileName] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Auth State
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [userProfile, setUserProfile] = useState<any>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [authLoading, setAuthLoading] = useState(false);

    // Context Status (Enhanced for Phase 2)
    const [contextStatus, setContextStatus] = useState<ContextStatus>({
        profileCompleteness: 0,
        hasDocument: false,
        documentName: null,
        documentCharCount: 0,
        platform: 'Unknown',
        pageUrl: '',
        isProcessing: false,
        processingError: null,
    });
    const [showContextPanel, setShowContextPanel] = useState(true);
    const [isSyncingProfile, setIsSyncingProfile] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    // Check for existing token and profile on mount
    useEffect(() => {
        chrome.storage.local.get(['authToken', 'userProfile', 'projectContext', 'projectFileName', 'documentMeta'], (result) => {
            if (result.authToken) {
                setAuthToken(result.authToken);
            }
            if (result.userProfile) {
                setUserProfile(result.userProfile);
                setContextStatus(prev => ({
                    ...prev,
                    profileCompleteness: calculateProfileCompleteness(result.userProfile)
                }));
            }
            if (result.projectContext) {
                setProjectContext(result.projectContext);
                setProjectFileName(result.projectFileName || 'document.txt');
                const meta = result.documentMeta || {};
                setContextStatus(prev => ({
                    ...prev,
                    hasDocument: true,
                    documentName: result.projectFileName || 'document.txt',
                    documentCharCount: meta.charCount || result.projectContext.length,
                }));
            }
        });

        // Listen for storage changes
        const listener = (changes: any, area: string) => {
            if (area === 'local') {
                if (changes.authToken) {
                    setAuthToken(changes.authToken.newValue);
                }
                if (changes.userProfile) {
                    setUserProfile(changes.userProfile.newValue);
                    setContextStatus(prev => ({
                        ...prev,
                        profileCompleteness: calculateProfileCompleteness(changes.userProfile.newValue)
                    }));
                }
            }
        };
        chrome.storage.onChanged.addListener(listener);
        return () => chrome.storage.onChanged.removeListener(listener);
    }, []);

    // Detect platform when tab changes
    useEffect(() => {
        const updatePlatform = async () => {
            try {
                const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                if (tab?.url) {
                    setContextStatus(prev => ({
                        ...prev,
                        platform: detectPlatform(tab.url || ''),
                        pageUrl: tab.url || ''
                    }));
                }
            } catch (e) {
                console.warn("Could not detect platform:", e);
            }
        };
        updatePlatform();

        // Listen for tab changes
        chrome.tabs.onActivated?.addListener(updatePlatform);
        chrome.tabs.onUpdated?.addListener((_, changeInfo) => {
            if (changeInfo.url) updatePlatform();
        });
    }, []);

    // Sync profile from Firebase
    const syncProfile = async () => {
        if (!authToken) return;
        setIsSyncingProfile(true);

        try {
            const user = auth.currentUser;
            if (user) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const profileData = userDoc.data();
                    await chrome.storage.local.set({ userProfile: profileData });
                    setUserProfile(profileData);
                    setContextStatus(prev => ({
                        ...prev,
                        profileCompleteness: calculateProfileCompleteness(profileData)
                    }));
                    setMessages(prev => [...prev, {
                        id: Date.now().toString(),
                        role: 'assistant',
                        text: `✅ Profile synced! Completeness: ${calculateProfileCompleteness(profileData)}%`
                    }]);
                }
            }
        } catch (error) {
            console.error("Profile sync failed:", error);
        } finally {
            setIsSyncingProfile(false);
        }
    };

    // Handle Login Logic
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError('');
        setAuthLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const token = await user.getIdToken();

            // 1. Sync Token
            await chrome.storage.local.set({ authToken: token });
            setAuthToken(token);

            // 2. Fetch & Sync User Profile (Knowledge Base)
            try {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const profileData = userDoc.data();
                    await chrome.storage.local.set({ userProfile: profileData });
                    setUserProfile(profileData);
                    setContextStatus(prev => ({
                        ...prev,
                        profileCompleteness: calculateProfileCompleteness(profileData)
                    }));
                    console.log("[EXT] Profile Synced:", profileData);
                }
            } catch (profileErr) {
                console.error("[EXT] Failed to sync profile:", profileErr);
            }

        } catch (error: any) {
            console.error("Login Failed:", error);
            setAuthError(error.message || "Invalid credentials");
        } finally {
            setAuthLoading(false);
        }
    };

    // Voice Handler (Web Speech API)
    const toggleVoice = () => {
        if (isListening) {
            return;
        }

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Voice input is not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setIsListening(true);

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInput(prev => prev + (prev ? ' ' : '') + transcript);
        };

        recognition.onend = () => setIsListening(false);
        recognition.onerror = (event: any) => {
            console.error("Speech error", event.error);
            setIsListening(false);
        };

        recognition.start();
    };

    // Enhanced File Upload Handler with Backend Parsing
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Update UI to show processing
        setContextStatus(prev => ({
            ...prev,
            isProcessing: true,
            processingError: null,
        }));

        // Check file type for smart parsing
        const filename = file.name.toLowerCase();
        const needsBackendParsing = filename.endsWith('.pdf') || filename.endsWith('.docx');

        if (needsBackendParsing && authToken) {
            // Use backend for PDF/DOCX parsing
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'assistant',
                text: `📄 Processing "${file.name}"... Extracting text content.`
            }]);

            const result = await parseDocument(file, authToken);

            if (result.success) {
                setProjectContext(result.content);
                setProjectFileName(file.name);

                const documentMeta: UploadedDocument = {
                    id: generateDocumentId(),
                    filename: file.name,
                    content: result.content,
                    uploadedAt: Date.now(),
                    charCount: result.charCount,
                    fileType: result.fileType,
                    platformHint: contextStatus.platform,
                };

                // Persist Context
                await chrome.storage.local.set({
                    projectContext: result.content,
                    projectFileName: file.name,
                    documentMeta,
                });

                setContextStatus(prev => ({
                    ...prev,
                    hasDocument: true,
                    documentName: file.name,
                    documentCharCount: result.charCount,
                    isProcessing: false,
                    processingError: null,
                }));

                setMessages(prev => [...prev, {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    text: `✅ Successfully extracted ${result.charCount.toLocaleString()} characters from "${file.name}". I'll use this context to help with your application!`
                }]);
            } else {
                setContextStatus(prev => ({
                    ...prev,
                    isProcessing: false,
                    processingError: result.error || 'Failed to parse document',
                }));

                setMessages(prev => [...prev, {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    text: `❌ Failed to parse "${file.name}": ${result.error}. Try a different format (TXT, MD, or ensure the PDF isn't password protected).`
                }]);
            }
        } else {
            // Simple text reading for TXT/MD/JSON
            const reader = new FileReader();
            reader.onload = async (e) => {
                const text = e.target?.result as string;
                setProjectContext(text);
                setProjectFileName(file.name);

                const documentMeta: UploadedDocument = {
                    id: generateDocumentId(),
                    filename: file.name,
                    content: text,
                    uploadedAt: Date.now(),
                    charCount: text.length,
                    fileType: 'text',
                    platformHint: contextStatus.platform,
                };

                // Persist Context
                await chrome.storage.local.set({
                    projectContext: text,
                    projectFileName: file.name,
                    documentMeta,
                });

                setContextStatus(prev => ({
                    ...prev,
                    hasDocument: true,
                    documentName: file.name,
                    documentCharCount: text.length,
                    isProcessing: false,
                    processingError: null,
                }));

                setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    role: 'assistant',
                    text: `✅ Loaded "${file.name}" (${text.length.toLocaleString()} chars). I'll use this context for your answers.`
                }]);
            };
            reader.onerror = () => {
                setContextStatus(prev => ({
                    ...prev,
                    isProcessing: false,
                    processingError: 'Failed to read file',
                }));
            };
            reader.readAsText(file);
        }

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Clear document context
    const clearDocument = () => {
        setProjectContext(null);
        setProjectFileName(null);
        chrome.storage.local.remove(['projectContext', 'projectFileName', 'documentMeta']);
        setContextStatus(prev => ({
            ...prev,
            hasDocument: false,
            documentName: null,
            documentCharCount: 0,
            processingError: null,
        }));
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'assistant',
            text: '📄 Document context cleared.'
        }]);
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            // 1. Get Page Context from Content Script
            let context = { title: 'Unknown', url: '', content: '', forms: [] };

            try {
                const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                if (tab?.id) {
                    context = await chrome.tabs.sendMessage(tab.id, { type: 'GET_PAGE_CONTEXT' });
                }
            } catch (e) {
                console.warn("Could not get page context:", e);
            }

            // 2. Call Backend API
            const response = await fetch(ENDPOINTS.chat, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    query: userMsg.text,
                    page_context: context,
                    project_context: projectContext
                })
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`Server Error: ${response.status} - ${errText}`);
            }

            const data = await response.json();
            const aiResponse = data.data;

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                text: aiResponse.message || "I processed that, but have nothing to say."
            };
            setMessages(prev => [...prev, aiMsg]);

            // Handle Actions (Auto-fill)
            if (aiResponse.action && aiResponse.action.type === 'fill_field') {
                const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                if (tab?.id) {
                    chrome.tabs.sendMessage(tab.id, {
                        type: 'FILL_FIELD',
                        selector: aiResponse.action.selector,
                        value: aiResponse.action.value
                    });
                }
            }

        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'assistant',
                text: "Sorry, I couldn't reach the server. Please check your connection."
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleAutoFill = async () => {
        setLoading(true);
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab?.id) {
                const response = await chrome.tabs.sendMessage(tab.id, {
                    type: 'AUTO_FILL_REQUEST',
                    projectContext: projectContext || undefined
                });

                setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    role: 'assistant',
                    text: response.success
                        ? `✨ Magic! Auto-filled ${response.filled} fields based on your profile.`
                        : `❌ Auto-fill failed: ${response.message || response.error}`
                }]);
            }
        } catch (e) {
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'assistant',
                text: "Could not communicate with the page. Try refreshing the page."
            }]);
        } finally {
            setLoading(false);
        }
    };

    // Get context status color
    const getContextStatusColor = () => {
        const { profileCompleteness, hasDocument } = contextStatus;
        if (profileCompleteness >= 70 && hasDocument) return 'bg-green-500';
        if (profileCompleteness >= 40 || hasDocument) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    // --- UNIFIED AUTH LANDING (No Token) ---
    if (!authToken) {
        return (
            <div className="flex flex-col h-screen bg-slate-950 text-slate-100 p-6 items-center justify-center">
                <div className="w-full max-w-xs space-y-6">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-2 relative group cursor-pointer hover:scale-105 transition-transform">
                            <Sparkles className="w-8 h-8 text-white relative z-10" />
                            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50" />
                        </div>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            ScholarStream
                        </h1>
                        <p className="text-sm text-slate-400 text-center px-4 leading-relaxed">
                            Sign in on our website to automatically unlock your AI Co-Pilot.
                        </p>
                    </div>

                    <div className="space-y-3 pt-4">
                        <button
                            onClick={() => window.open('http://localhost:8080/auth', '_blank')}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-all flex justify-center items-center gap-2 shadow-lg shadow-blue-900/20 group hover:shadow-blue-500/25 active:scale-95"
                        >
                            <span>Launch Web App</span>
                            <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <p className="text-xs text-slate-600 text-center">
                            Already logged in?
                            <button
                                onClick={() => chrome.runtime.reload()}
                                className="text-blue-500 hover:text-blue-400 ml-1 hover:underline"
                            >
                                Reload Extension
                            </button>
                        </p>
                    </div>

                    <div className="pt-8 border-t border-slate-900/50">
                        <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                            <div className="w-2 h-2 rounded-full bg-blue-500/50 animate-pulse"></div>
                            Waiting for secure handshake...
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- MAIN APP (Authenticated) ---
    return (
        <div className="flex flex-col h-screen bg-slate-900 text-slate-100">
            {/* Header */}
            <header className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-950">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getContextStatusColor()} animate-pulse`} />
                    <Sparkles className="w-5 h-5 text-blue-500" />
                    <div className="flex flex-col">
                        <h1 className="font-bold text-sm leading-none truncate max-w-[120px]">
                            {userProfile?.name || userProfile?.full_name || 'Co-Pilot'}
                        </h1>
                        <span className="text-[10px] text-slate-400 leading-none truncate max-w-[120px]">
                            {userProfile?.email || 'ScholarStream'}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => {
                            chrome.storage.local.remove(['authToken', 'userProfile']);
                            setAuthToken(null);
                            setUserProfile(null);
                        }}
                        className="text-xs text-slate-500 hover:text-slate-300"
                        title="Sign Out"
                    >
                        Sign Out
                    </button>
                    <button
                        onClick={handleAutoFill}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors"
                    >
                        <Sparkles className="w-3 h-3" /> Auto-Fill
                    </button>
                </div>
            </header>

            {/* Context Status Panel */}
            {showContextPanel && (
                <div className="p-3 bg-slate-950/50 border-b border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-slate-400">📄 Active Context</span>
                        <button
                            onClick={() => setShowContextPanel(false)}
                            className="text-slate-500 hover:text-slate-300 p-0.5"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                    <div className="space-y-2">
                        {/* Profile Status */}
                        <div className="flex items-center gap-2">
                            {contextStatus.profileCompleteness >= 70 ? (
                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                            ) : contextStatus.profileCompleteness >= 40 ? (
                                <Circle className="w-4 h-4 text-yellow-400" />
                            ) : (
                                <Circle className="w-4 h-4 text-slate-500" />
                            )}
                            <span className="text-xs text-slate-300 flex-1">Profile</span>
                            <span className={`text-xs font-medium ${contextStatus.profileCompleteness >= 70 ? 'text-green-400' :
                                contextStatus.profileCompleteness >= 40 ? 'text-yellow-400' : 'text-slate-500'
                                }`}>
                                {contextStatus.profileCompleteness}%
                            </span>
                            <button
                                onClick={syncProfile}
                                disabled={isSyncingProfile}
                                className="text-slate-500 hover:text-blue-400 p-0.5"
                                title="Sync Profile"
                            >
                                <RefreshCw className={`w-3 h-3 ${isSyncingProfile ? 'animate-spin' : ''}`} />
                            </button>
                        </div>

                        {/* Document Status */}
                        <div className="flex items-center gap-2">
                            {contextStatus.isProcessing ? (
                                <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                            ) : contextStatus.hasDocument ? (
                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                            ) : (
                                <Circle className="w-4 h-4 text-slate-500" />
                            )}
                            <span className="text-xs text-slate-300 flex-1 truncate">
                                {contextStatus.isProcessing
                                    ? 'Processing...'
                                    : contextStatus.hasDocument
                                        ? contextStatus.documentName
                                        : 'No document'}
                            </span>
                            {contextStatus.hasDocument && (
                                <>
                                    <span className="text-xs text-slate-500">
                                        {(contextStatus.documentCharCount / 1000).toFixed(1)}k
                                    </span>
                                    <button
                                        onClick={clearDocument}
                                        className="text-slate-500 hover:text-red-400 p-0.5"
                                        title="Remove document"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Processing Error */}
                        {contextStatus.processingError && (
                            <div className="text-xs text-red-400 bg-red-950/30 p-2 rounded border border-red-900/50">
                                {contextStatus.processingError}
                            </div>
                        )}

                        {/* Platform */}
                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-blue-400" />
                            <span className="text-xs text-slate-300 flex-1">Platform</span>
                            <span className="text-xs font-medium text-blue-400">{contextStatus.platform}</span>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-2 mt-3">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={contextStatus.isProcessing}
                            className="flex-1 text-xs bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 py-1.5 px-2 rounded border border-slate-700 flex items-center justify-center gap-1"
                        >
                            {contextStatus.isProcessing ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                                <Upload className="w-3 h-3" />
                            )}
                            {contextStatus.hasDocument ? 'Replace Doc' : 'Upload Doc'}
                        </button>
                        <button
                            onClick={() => window.open('http://localhost:8080/profile', '_blank')}
                            className="flex-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 py-1.5 px-2 rounded border border-slate-700 flex items-center justify-center gap-1"
                        >
                            <User className="w-3 h-3" />
                            View Profile
                        </button>
                    </div>
                </div>
            )}

            {/* Collapsed Context Indicator */}
            {!showContextPanel && (
                <button
                    onClick={() => setShowContextPanel(true)}
                    className="px-3 py-1.5 bg-slate-950/50 border-b border-slate-800 flex items-center gap-2 hover:bg-slate-800/50 transition-colors"
                >
                    <div className="flex items-center gap-1">
                        {contextStatus.profileCompleteness >= 70 ? (
                            <span className="w-2 h-2 rounded-full bg-green-400" />
                        ) : (
                            <span className="w-2 h-2 rounded-full bg-yellow-400" />
                        )}
                        {contextStatus.hasDocument ? (
                            <span className="w-2 h-2 rounded-full bg-green-400" />
                        ) : (
                            <span className="w-2 h-2 rounded-full bg-slate-500" />
                        )}
                    </div>
                    <span className="text-xs text-slate-400">
                        {contextStatus.platform} • {contextStatus.profileCompleteness}% profile
                        {contextStatus.hasDocument && ` • ${(contextStatus.documentCharCount / 1000).toFixed(1)}k chars`}
                    </span>
                </button>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'assistant' && (
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                                <Bot className="w-5 h-5" />
                            </div>
                        )}
                        <div className={`max-w-[85%] rounded-lg p-3 text-sm ${msg.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 text-slate-200 border border-slate-700'
                            }`}>
                            {msg.text}
                        </div>
                        {msg.role === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                                <User className="w-5 h-5" />
                            </div>
                        )}
                    </div>
                ))}

                {loading && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                            <Bot className="w-5 h-5 animate-pulse" />
                        </div>
                        <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-slate-800 bg-slate-950">
                <div className="relative flex items-center gap-2">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        className="hidden"
                        accept=".txt,.md,.json,.csv,.pdf,.docx"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={contextStatus.isProcessing}
                        className={`p-2 rounded-full transition-colors ${contextStatus.isProcessing
                            ? 'text-blue-400 bg-blue-500/10 animate-pulse'
                            : projectContext
                                ? 'text-green-400 bg-green-500/10'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                            }`}
                        title={contextStatus.isProcessing ? 'Processing...' : 'Upload Project Context'}
                    >
                        {contextStatus.isProcessing ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Upload className="w-5 h-5" />
                        )}
                    </button>

                    <div className="relative flex-1">
                        <textarea
                            value={input}
                            onChange={e => {
                                setInput(e.target.value);
                                e.target.style.height = 'auto';
                                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                            }}
                            onKeyDown={e => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                    // Reset height
                                    const target = e.target as HTMLTextAreaElement;
                                    target.style.height = 'auto';
                                }
                            }}
                            placeholder={isListening ? "Listening..." : "Ask Co-Pilot..."}
                            className={`w-full bg-slate-800 border-none rounded-xl py-3 pl-4 pr-20 focus:ring-2 focus:ring-blue-600 text-sm resize-none min-h-[44px] max-h-[120px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent ${isListening ? 'ring-2 ring-red-500 animate-pulse' : ''}`}
                            style={{ height: 'auto' }}
                            rows={1}
                        />
                        <button
                            onClick={toggleVoice}
                            className={`absolute right-10 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-colors ${isListening ? 'text-red-500 hover:text-red-400' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        </button>
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || loading}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 rounded-full hover:bg-blue-500 disabled:opacity-50 transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}