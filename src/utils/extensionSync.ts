import { User } from '../contexts/AuthContext';

// Optional: configure the Chrome Extension ID via env for different builds (dev/prod)
// If unset or invalid, we simply skip unified auth sync.
const EXTENSION_ID = (import.meta as any).env?.VITE_CHROME_EXTENSION_ID || 'pngiojijaflejacjoogjapkglpfelp';

const isValidExtensionId = (id: unknown) => typeof id === 'string' && /^[a-p]{32}$/.test(id);

/**
 * Sends the current Auth Token and User Profile to the Chrome Extension
 * to enable "Unified Auth" (Zero-Touch Login).
 */
export const syncAuthToExtension = (token: string, user: User) => {
  const chrome = (window as any).chrome;

  if (!chrome?.runtime?.sendMessage) return;

  if (!isValidExtensionId(EXTENSION_ID)) {
    // Avoid throwing: web app auth must never depend on extension presence.
    console.log('⚠️ [Extension Sync] Skipping: invalid/missing extension id');
    return;
  }

  try {
    console.log('🔄 [Extension Sync] Sending session to Extension...');

    chrome.runtime.sendMessage(
      EXTENSION_ID,
      {
        type: 'SYNC_AUTH',
        token,
        user: {
          uid: user.uid,
          email: user.email,
          name: user.name,
        },
      },
      (response: any) => {
        if (chrome.runtime.lastError) {
          // Normal if extension is not installed / not listening.
          console.log('⚠️ [Extension Sync] Extension not listening (not installed?)');
        } else {
          console.log('✅ [Extension Sync] Success!', response);
        }
      }
    );
  } catch (err) {
    // Defensive: never let extension messaging break web auth.
    console.log('⚠️ [Extension Sync] Send failed');
  }
};
