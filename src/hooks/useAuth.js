import { useCallback, useMemo, useState } from 'react';
import { readStorage, removeStorage, writeStorage } from '../lib/storage';

/**
 * Front-end only authentication.
 *
 * Accounts live in this browser's localStorage so the sign-in, register and
 * sign-out flows work end to end without a server. Before going live, replace
 * the bodies of `signIn` and `register` with calls to a real auth API; the
 * rest of the app only depends on the shapes returned here.
 */
const ACCOUNTS_KEY = 'handaan:accounts';
const SESSION_KEY = 'handaan:session';

async function hashPassword(password, email) {
  const data = new TextEncoder().encode(`${email}:${password}`);
  if (globalThis.crypto?.subtle) {
    const digest = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest), (byte) =>
      byte.toString(16).padStart(2, '0'),
    ).join('');
  }
  // crypto.subtle only exists on https/localhost. Fall back to a simple hash.
  let hash = 5381;
  for (const byte of data) hash = ((hash << 5) + hash + byte) >>> 0;
  return `djb2-${hash.toString(16)}`;
}

const normaliseEmail = (email) => email.trim().toLowerCase();
const loadAccounts = () => readStorage(ACCOUNTS_KEY, []);

function loadSession() {
  return (
    readStorage(SESSION_KEY, null, 'localStorage') ??
    readStorage(SESSION_KEY, null, 'sessionStorage')
  );
}

export function useAuth() {
  const [user, setUser] = useState(loadSession);

  const startSession = useCallback((account, remember) => {
    const session = { name: account.name, email: account.email };
    removeStorage(SESSION_KEY, 'localStorage');
    removeStorage(SESSION_KEY, 'sessionStorage');
    // "Remember me" keeps the session after the browser is closed.
    writeStorage(SESSION_KEY, session, remember ? 'localStorage' : 'sessionStorage');
    setUser(session);
    return session;
  }, []);

  const signIn = useCallback(
    async ({ email, password, remember = false }) => {
      const normalised = normaliseEmail(email);
      const account = loadAccounts().find((entry) => entry.email === normalised);
      const passwordHash = await hashPassword(password, normalised);

      if (!account || account.passwordHash !== passwordHash) {
        return {
          ok: false,
          error:
            "We couldn't find an account with that email and password. Check your details or register a new account.",
        };
      }
      return { ok: true, user: startSession(account, remember) };
    },
    [startSession],
  );

  const register = useCallback(
    async ({ name, email, password }) => {
      const normalised = normaliseEmail(email);
      const accounts = loadAccounts();

      if (accounts.some((entry) => entry.email === normalised)) {
        return {
          ok: false,
          field: 'email',
          error: 'An account with this email already exists. Try signing in.',
        };
      }

      const account = {
        name: name.trim(),
        email: normalised,
        passwordHash: await hashPassword(password, normalised),
        createdAt: new Date().toISOString(),
      };
      writeStorage(ACCOUNTS_KEY, [...accounts, account]);
      return { ok: true, user: startSession(account, true) };
    },
    [startSession],
  );

  const signOut = useCallback(() => {
    removeStorage(SESSION_KEY, 'localStorage');
    removeStorage(SESSION_KEY, 'sessionStorage');
    setUser(null);
  }, []);

  return useMemo(
    () => ({ user, signIn, register, signOut }),
    [user, signIn, register, signOut],
  );
}
