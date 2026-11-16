/**
 * Safe wrappers around Web Storage. Access can throw (private mode, blocked
 * cookies, sandboxed iframes), so every call degrades to a no-op instead of
 * crashing the app.
 */
function getStorage(type) {
  try {
    return window[type];
  } catch {
    return null;
  }
}

export function readStorage(key, fallback, type = 'localStorage') {
  try {
    const raw = getStorage(type)?.getItem(key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value, type = 'localStorage') {
  try {
    getStorage(type)?.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable or full: ignore */
  }
}

export function removeStorage(key, type = 'localStorage') {
  try {
    getStorage(type)?.removeItem(key);
  } catch {
    /* ignore */
  }
}
