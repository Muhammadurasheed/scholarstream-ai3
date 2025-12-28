import { User } from '../contexts/AuthContext';

// The ID of the Chrome Extension (Must match the CRX ID)
const EXTENSION_ID = 'pngiojijaflejacjoogjapkglpfelp';

/**
 * Sends the current Auth Token and User Profile to the Chrome Extension
 * to enable "Unified Auth" (Zero-Touch Login).
 */
export const syncAuthToExtension = (token: string, user: User) => {
    // Check if Chrome runtime is available (we might not be in a browser environment, or extension might be disabled)
    // We use 'window.chrome' to avoid TS errors if types aren't installed
    const chrome = (window as any).chrome;

    if (chrome && chrome.runtime && chrome.runtime.sendMessage) {
        console.log("🔄 [Extension Sync] Sending session to Extension...");

        chrome.runtime.sendMessage(
            EXTENSION_ID,
            {
                type: 'SYNC_AUTH',
                token: token,
                user: {
                    uid: user.uid,
                    email: user.email,
                    name: user.name
                }
            },
            (response: any) => {
                if (chrome.runtime.lastError) {
                    // This is normal if the extension is not installed or not listening (e.g. background script asleep)
                    console.log("⚠️ [Extension Sync] Extension not listening (not installed?)");
                } else {
                    console.log("✅ [Extension Sync] Success!", response);
                }
            }
        );
    }
};
