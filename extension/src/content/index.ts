console.log("ScholarStream Content Script Loaded");

import { getPageContext } from '../utils/domScanner';

// API Configuration - matches extension config
const API_URL = '__VITE_API_URL__' !== '__VITE_API_URL__' 
    ? '__VITE_API_URL__' 
    : 'http://localhost:8081';

const ENDPOINTS = {
    mapFields: `${API_URL}/api/extension/map-fields`,
};

// ===== REAL AUTH: Extract token from ScholarStream web app =====
if (window.location.host.includes('localhost') || window.location.host.includes('scholarstream')) {
    const extractAndSendToken = () => {
        let token = localStorage.getItem('scholarstream_auth_token');

        if (!token) {
            Object.keys(localStorage).forEach(key => {
                if (key.includes('firebase:authUser')) {
                    try {
                        const user = JSON.parse(localStorage.getItem(key) || '{}');
                        if (user.stsTokenManager && user.stsTokenManager.accessToken) {
                            token = user.stsTokenManager.accessToken;
                        }
                    } catch (e) {
                        // ignore parse errors
                    }
                }
            });
        }

        if (token) {
            chrome.storage.local.set({ authToken: token }, () => {
                chrome.storage.local.get(['lastLoggedToken'], (result) => {
                    if (result.lastLoggedToken !== token) {
                        console.log('🔑 [EXT] Real Firebase token captured!');
                        chrome.storage.local.set({ lastLoggedToken: token });
                    }
                });
            });
        }
    };

    extractAndSendToken();
    setInterval(extractAndSendToken, 2000);
}

// ===== MIND-BLOWING UX: Sparkle Focus Engine =====
class FocusEngine {
    private activeElement: HTMLElement | null = null;
    private sparkleBtn: HTMLDivElement;
    private tooltip: HTMLDivElement;
    private thoughtBubble: HTMLDivElement;
    private guidanceBubble: HTMLDivElement; // NEW: Guidance for missing context
    private isStreaming = false;
    private isDragging = false;
    private dragOffset = { x: 0, y: 0 };
    private sparkleHidden = false;

    constructor() {
        this.sparkleBtn = this.createSparkleButton();
        this.tooltip = this.createTooltip();
        this.thoughtBubble = this.createThoughtBubble();
        this.guidanceBubble = this.createGuidanceBubble();
        this.initListeners();
    }

    private createSparkleButton(): HTMLDivElement {
        const container = document.createElement('div');
        container.id = 'ss-sparkle-container';
        container.style.cssText = `
            position: absolute;
            display: none;
            z-index: 2147483647;
            cursor: grab;
        `;

        const btn = document.createElement('div');
        btn.id = 'ss-sparkle-trigger';
        btn.style.cssText = `
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #FF6B6B, #4ECDC4);
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
            animation: ss-pulse 2s infinite;
        `;
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path></svg>`;

        const closeBtn = document.createElement('div');
        closeBtn.id = 'ss-sparkle-close';
        closeBtn.style.cssText = `
            position: absolute;
            top: -8px;
            right: -8px;
            width: 18px;
            height: 18px;
            background: #ef4444;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
            color: white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            opacity: 0;
            transition: opacity 0.2s;
        `;
        closeBtn.innerHTML = '×';

        container.appendChild(btn);
        container.appendChild(closeBtn);

        container.onmouseenter = () => {
            closeBtn.style.opacity = '1';
            if (!this.isDragging) btn.style.transform = 'scale(1.1)';
        };
        container.onmouseleave = () => {
            closeBtn.style.opacity = '0';
            btn.style.transform = 'scale(1)';
        };

        const style = document.createElement('style');
        style.textContent = `
            @keyframes ss-pulse { 0% { box-shadow: 0 0 0 0 rgba(78, 205, 196, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(78, 205, 196, 0); } 100% { box-shadow: 0 0 0 0 rgba(78, 205, 196, 0); } }
            @keyframes ss-typewriter { from { width: 0; } to { width: 100%; } }
            @keyframes ss-fade-in-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            #ss-sparkle-container.dragging { cursor: grabbing !important; }
            @keyframes ss-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        `;
        document.head.appendChild(style);
        document.body.appendChild(container);

        btn.onclick = (e) => {
            if (this.isDragging) return;
            e.preventDefault();
            e.stopPropagation();
            this.handleSparkleClick();
        };

        closeBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.sparkleHidden = true;
            this.hideSparkle();
        };

        container.onmousedown = (e) => {
            if ((e.target as HTMLElement).id === 'ss-sparkle-close') return;
            this.isDragging = true;
            container.classList.add('dragging');
            const rect = container.getBoundingClientRect();
            this.dragOffset = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            container.style.left = `${e.clientX - this.dragOffset.x + window.scrollX}px`;
            container.style.top = `${e.clientY - this.dragOffset.y + window.scrollY}px`;
        });

        document.addEventListener('mouseup', () => {
            if (this.isDragging) {
                this.isDragging = false;
                container.classList.remove('dragging');
            }
        });

        return container as HTMLDivElement;
    }

    private createTooltip() {
        const div = document.createElement('div');
        div.style.cssText = `
            position: absolute;
            display: none;
            background: #1e293b;
            color: #fff;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 12px;
            font-family: sans-serif;
            z-index: 2147483647;
            pointer-events: none;
            white-space: nowrap;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        `;
        div.innerText = "✨ Auto-Fill with ScholarStream";
        document.body.appendChild(div);
        return div;
    }

    private createThoughtBubble() {
        const div = document.createElement('div');
        div.style.cssText = `
            position: absolute;
            display: none;
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            color: #e2e8f0;
            padding: 12px 16px;
            border-radius: 12px;
            border: 1px solid #334155;
            font-size: 13px;
            font-family: 'Inter', system-ui, sans-serif;
            line-height: 1.4;
            max-width: 320px;
            z-index: 2147483647;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
            pointer-events: none;
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.3s, transform 0.3s;
        `;
        document.body.appendChild(div);
        return div;
    }

    private createGuidanceBubble() {
        const div = document.createElement('div');
        div.id = 'ss-guidance-bubble';
        div.style.cssText = `
            position: absolute;
            display: none;
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            color: #e2e8f0;
            padding: 16px;
            border-radius: 12px;
            border: 1px solid #3b82f6;
            font-size: 13px;
            font-family: 'Inter', system-ui, sans-serif;
            line-height: 1.5;
            max-width: 320px;
            z-index: 2147483647;
            box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.3);
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.3s, transform 0.3s;
        `;
        document.body.appendChild(div);
        return div;
    }

    private initListeners() {
        document.addEventListener('focusin', (e) => this.handleFocus(e), true);
        document.addEventListener('scroll', () => this.updatePosition(), true);
        window.addEventListener('resize', () => this.updatePosition());
    }

    private handleFocus(e: FocusEvent) {
        const target = e.target as HTMLElement;
        if (!target) return;

        if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) && !target.isContentEditable) {
            this.hideSparkle();
            return;
        }

        const input = target as HTMLInputElement;
        if (input.type === 'file' || input.type === 'hidden' || input.type === 'submit' || input.type === 'image') {
            this.hideSparkle();
            return;
        }

        this.activeElement = target;
        this.showSparkle(target);
    }

    private showSparkle(target: HTMLElement) {
        if (!target || this.sparkleHidden) return;
        const rect = target.getBoundingClientRect();

        const top = rect.top + window.scrollY + (rect.height / 2) - 16;
        const left = rect.right + window.scrollX - 40;

        this.sparkleBtn.style.top = `${top}px`;
        this.sparkleBtn.style.left = `${left}px`;
        this.sparkleBtn.style.display = 'flex';

        this.tooltip.style.top = `${top - 30}px`;
        this.tooltip.style.left = `${left - 60}px`;
    }

    private hideSparkle() {
        this.sparkleBtn.style.display = 'none';
        this.tooltip.style.display = 'none';
        this.thoughtBubble.style.opacity = '0';
        this.hideGuidanceBubble();
    }

    private updatePosition() {
        if (this.activeElement && this.sparkleBtn.style.display !== 'none') {
            this.showSparkle(this.activeElement);
        }
    }

    private showReasoning(text: string, target: HTMLElement) {
        if (!text || !target) return;

        const rect = target.getBoundingClientRect();
        const top = rect.bottom + window.scrollY + 8;
        const left = rect.left + window.scrollX;

        this.thoughtBubble.innerHTML = `<span style="color: #4ECDC4; font-weight: 600;">🧠 AI Thought:</span> ${text}`;
        this.thoughtBubble.style.top = `${top}px`;
        this.thoughtBubble.style.left = `${left}px`;
        this.thoughtBubble.style.display = 'block';

        void this.thoughtBubble.offsetWidth;

        this.thoughtBubble.style.opacity = '1';
        this.thoughtBubble.style.transform = 'translateY(0)';

        setTimeout(() => {
            this.thoughtBubble.style.opacity = '0';
            this.thoughtBubble.style.transform = 'translateY(10px)';
            setTimeout(() => {
                if (this.thoughtBubble.style.opacity === '0') {
                    this.thoughtBubble.style.display = 'none';
                }
            }, 300);
        }, 6000);
    }

    private showGuidanceBubble(target: HTMLElement, hasProfile: boolean, hasDocument: boolean, fieldType: string) {
        const rect = target.getBoundingClientRect();
        const top = rect.bottom + window.scrollY + 8;
        const left = rect.left + window.scrollX;

        let message = '';
        let buttons = '';

        if (!hasProfile && !hasDocument) {
            message = `
                <div style="margin-bottom: 8px; font-weight: 600; color: #fbbf24;">🤔 I can help, but I don't know much about you yet.</div>
                <div style="color: #94a3b8; margin-bottom: 12px;">
                    For a <strong>great ${fieldType}</strong>, I need:
                    <ul style="margin: 8px 0 0 16px; padding: 0;">
                        <li>Your project details (upload via sidebar)</li>
                        <li>Your background (complete your profile)</li>
                    </ul>
                </div>
            `;
            buttons = `
                <button id="ss-guidance-upload" style="flex: 1; background: #3b82f6; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 12px;">Upload Doc</button>
                <button id="ss-guidance-profile" style="flex: 1; background: #1e293b; color: #94a3b8; border: 1px solid #334155; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 12px;">Complete Profile</button>
                <button id="ss-guidance-try" style="flex: 1; background: #1e293b; color: #4ade80; border: 1px solid #22c55e; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 12px;">Try Anyway</button>
            `;
        } else if (!hasDocument) {
            message = `
                <div style="margin-bottom: 8px; font-weight: 600; color: #60a5fa;">💡 I'll use your profile, but I don't have project context.</div>
                <div style="color: #94a3b8; margin-bottom: 12px;">
                    Upload a project README or description for better results on this ${fieldType} field.
                </div>
            `;
            buttons = `
                <button id="ss-guidance-upload" style="flex: 1; background: #3b82f6; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 12px;">Upload Doc</button>
                <button id="ss-guidance-try" style="flex: 1; background: #22c55e; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 12px;">Generate Anyway</button>
            `;
        }

        this.guidanceBubble.innerHTML = `
            ${message}
            <div style="display: flex; gap: 8px; margin-top: 8px;">
                ${buttons}
            </div>
        `;

        this.guidanceBubble.style.top = `${top}px`;
        this.guidanceBubble.style.left = `${left}px`;
        this.guidanceBubble.style.display = 'block';
        this.guidanceBubble.style.pointerEvents = 'auto';

        void this.guidanceBubble.offsetWidth;

        this.guidanceBubble.style.opacity = '1';
        this.guidanceBubble.style.transform = 'translateY(0)';

        // Add button listeners
        setTimeout(() => {
            document.getElementById('ss-guidance-upload')?.addEventListener('click', () => {
                chrome.runtime.sendMessage({ type: 'OPEN_SIDE_PANEL' });
                this.hideGuidanceBubble();
            });
            document.getElementById('ss-guidance-profile')?.addEventListener('click', () => {
                window.open('https://scholarstream.lovable.app/profile', '_blank');
                this.hideGuidanceBubble();
            });
            document.getElementById('ss-guidance-try')?.addEventListener('click', () => {
                this.hideGuidanceBubble();
                this.generateWithAvailableContext();
            });
        }, 100);
    }

    private hideGuidanceBubble() {
        this.guidanceBubble.style.opacity = '0';
        this.guidanceBubble.style.transform = 'translateY(10px)';
        setTimeout(() => {
            this.guidanceBubble.style.display = 'none';
        }, 300);
    }

    private async handleSparkleClick() {
        if (!this.activeElement || this.isStreaming) return;

        const target = this.activeElement as HTMLInputElement;

        // Check context availability
        const stored = await chrome.storage.local.get(['userProfile', 'projectContext']);
        const hasProfile = stored.userProfile && Object.keys(stored.userProfile).length > 0;
        const hasDocument = !!stored.projectContext;

        // Determine field type for guidance message
        const fieldLabel = this.getLabel(target);
        const fieldType = this.categorizeField(fieldLabel, (target as any).placeholder || '');

        // Show guidance if missing critical context for project-specific fields
        const needsProjectContext = ['elevator pitch', 'description', 'about', 'inspiration', 'how built', 'challenges'].some(
            keyword => fieldLabel.toLowerCase().includes(keyword) || ((target as any).placeholder || '').toLowerCase().includes(keyword)
        );

        if (needsProjectContext && !hasDocument && !hasProfile) {
            this.showGuidanceBubble(target, hasProfile, hasDocument, fieldType);
            return;
        }

        // Generate with available context
        await this.generateWithAvailableContext();
    }

    private async generateWithAvailableContext() {
        if (!this.activeElement) return;

        this.isStreaming = true;
        const target = this.activeElement as HTMLInputElement;

        // Animation: Spin
        const btn = this.sparkleBtn.querySelector('#ss-sparkle-trigger');
        if (btn) {
            btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10" opacity="0.25"/><path d="M12 2C6.48 2 2 6.48 2 12" opacity="0.75"/></svg>`;
        }

        try {
            const fieldData = {
                id: target.id,
                name: (target as any).name,
                type: (target as any).type,
                placeholder: (target as any).placeholder || '',
                label: this.getLabel(target),
                surroundingText: "",
                pageTitle: document.title,
                pageUrl: window.location.href
            };

            const result = await generateFieldContent(fieldData);

            const content = result.sparkle_result?.content || result.filled_value;
            const reasoning = result.sparkle_result?.reasoning || result.reasoning;

            if (content) {
                if (reasoning) {
                    this.showReasoning(reasoning, target);
                }
                await this.typewriterEffect(target, content);
            }
        } catch (e) {
            console.error("Focus Fill Failed", e);
        } finally {
            this.isStreaming = false;
            const btn = this.sparkleBtn.querySelector('#ss-sparkle-trigger');
            if (btn) {
                btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path></svg>`;
            }
        }
    }

    private categorizeField(label: string, placeholder: string): string {
        const text = (label + ' ' + placeholder).toLowerCase();
        if (text.includes('elevator') || text.includes('pitch')) return 'elevator pitch';
        if (text.includes('description') || text.includes('about')) return 'description';
        if (text.includes('inspiration') || text.includes('why')) return 'inspiration';
        if (text.includes('built') || text.includes('how')) return 'technical explanation';
        if (text.includes('challenge')) return 'challenges section';
        return 'response';
    }

    private getLabel(el: HTMLElement): string {
        return (
            document.querySelector(`label[for="${el.id}"]`)?.textContent?.trim() ||
            el.closest('label')?.textContent?.trim() ||
            el.previousElementSibling?.textContent?.trim() ||
            el.parentElement?.textContent?.trim() ||
            ''
        ).slice(0, 100);
    }

    private async typewriterEffect(element: HTMLInputElement | HTMLTextAreaElement, text: string) {
        element.value = "";
        element.focus();

        const speed = Math.max(10, Math.min(50, 1000 / text.length));

        for (let i = 0; i < text.length; i++) {
            element.value += text.charAt(i);
            element.dispatchEvent(new Event('input', { bubbles: true }));
            if (element.scrollTop !== undefined) element.scrollTop = element.scrollHeight;

            await new Promise(r => setTimeout(r, speed + Math.random() * 10));
        }
        element.dispatchEvent(new Event('change', { bubbles: true }));

        const originalBg = element.style.backgroundColor;
        element.style.transition = "background-color 0.5s";
        element.style.backgroundColor = "#dcfce7";
        setTimeout(() => element.style.backgroundColor = originalBg, 1000);
    }
}

// Initialize Focus Engine
new FocusEngine();

// API Helper for Single Field
async function generateFieldContent(targetField: any) {
    let userProfile: any = {};
    try {
        const stored = await chrome.storage.local.get(['userProfile']);
        userProfile = stored.userProfile || {};
    } catch (e) { }

    const storedToken = (await chrome.storage.local.get(['authToken'])).authToken;
    const authToken = storedToken;

    if (!authToken) {
        throw new Error('Not authenticated');
    }

    let projectContext = "";
    try {
        const stored = await chrome.storage.local.get(['projectContext']);
        projectContext = stored.projectContext || "";
    } catch (e) { }

    const response = await fetch(ENDPOINTS.mapFields, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            form_fields: [],
            user_profile: userProfile,
            target_field: targetField,
            project_context: projectContext,
            instruction: "Fill this field based on my profile and project."
        })
    });

    return await response.json();
}

// Safe Message Sender
const safeSendMessage = async (message: any) => {
    if (!chrome.runtime?.id) {
        console.warn("Extension context invalidated. Reload page to reconnect.");
        return;
    }
    try {
        return await chrome.runtime.sendMessage(message);
    } catch (e) {
        const msg = (e as any).message || "";
        if (msg.includes("Extension context invalidated") || msg.includes("receiving end does not exist")) {
            console.log("Extension disconnected (reload needed).");
        } else {
            console.error("Message send failed:", e);
        }
    }
};

// Listen for context requests and Auto-Fill commands
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (!chrome.runtime?.id) return;

    try {
        if (message.type === 'GET_PAGE_CONTEXT') {
            const context = getPageContext();
            console.log("Creating context:", context.title);
            sendResponse(context);
        }

        if (message.type === 'AUTO_FILL_REQUEST') {
            console.log("Agentic Auto-Fill Triggered");
            handleAutoFill(message.projectContext).then(result => {
                try {
                    sendResponse(result);
                } catch (e) { /* Context likely lost during long op */ }
            });
            return true;
        }
    } catch (e) {
        console.error("Content Script Error:", e);
    }
});

async function handleAutoFill(projectContext?: string) {
    const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
    const formFields = inputs.map((el: any) => ({
        id: el.id,
        name: el.name,
        type: el.type || el.tagName.toLowerCase(),
        placeholder: el.placeholder,
        label: (
            document.querySelector(`label[for="${el.id}"]`)?.textContent?.trim() ||
            el.closest('label')?.textContent?.trim() ||
            el.previousElementSibling?.textContent?.trim() ||
            el.parentElement?.textContent?.trim() ||
            ''
        ).slice(0, 100),
        selector: uniqueSelector(el)
    })).filter(f => f.type !== 'hidden' && f.type !== 'submit' && f.type !== 'file');

    if (formFields.length === 0) return { success: false, message: "No fields found" };

    let userProfile: any = {};
    try {
        const stored = await chrome.storage.local.get(['userProfile']);
        userProfile = stored.userProfile || {};
    } catch (e) {
        console.log("No stored profile, using empty");
    }

    try {
        const storedToken = (await chrome.storage.local.get(['authToken'])).authToken;
        const authToken = storedToken;

        if (!authToken) {
            return { success: false, message: "Please sign in securely through the extension first." };
        }

        console.log(`🔑 [EXT] Using secure token for API call`);
        const response = await fetch(ENDPOINTS.mapFields, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                form_fields: formFields,
                user_profile: userProfile,
                project_context: projectContext
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Backend error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        const fieldMappings = data.field_mappings || {};

        let filledCount = 0;
        for (const [selector, value] of Object.entries(fieldMappings)) {
            const el = document.querySelector(selector) as HTMLInputElement;
            if (el && value) {
                if (el.type === 'file') continue;

                el.value = String(value);
                el.dispatchEvent(new Event('input', { bubbles: true }));
                el.dispatchEvent(new Event('change', { bubbles: true }));
                filledCount++;
                el.style.border = "2px solid #22c55e";
                el.style.backgroundColor = "#f0fdf4";
            }
        }

        return { success: true, filled: filledCount };

    } catch (error) {
        console.error("Auto-Fill Failed:", error);
        return { success: false, error: String(error) };
    }
}

function uniqueSelector(el: Element): string {
    if (el.id) return `#${el.id}`;
    if ((el as any).name) return `[name="${(el as any).name}"]`;
    return el.tagName.toLowerCase();
}

// ===== SIDE PANEL TRIGGER (PULSE ICON) =====
if (document.body.innerText.toLowerCase().includes('scholarship') ||
    document.body.innerText.toLowerCase().includes('hackathon') ||
    document.body.innerText.toLowerCase().includes('grant') ||
    window.location.hostname.includes('devpost') ||
    window.location.hostname.includes('dorahacks') ||
    window.location.hostname.includes('mlh') ||
    window.location.hostname.includes('taikai')) {

    const icon = document.createElement('div');
    icon.id = 'scholarstream-pulse-icon';
    icon.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      border-radius: 50%;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      z-index: 9999;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-family: sans-serif;
      font-weight: bold;
      transition: transform 0.2s;
    `;
    icon.innerText = "SS";

    icon.onclick = () => {
        console.log("Pulse Clicked - Requesting Side Panel Open");
        safeSendMessage({ type: 'OPEN_SIDE_PANEL' });
    };

    document.body.appendChild(icon);
}
