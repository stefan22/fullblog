import { createAuthClient } from 'better-auth/react';
import { convexClient } from '@convex-dev/better-auth/client/plugins';

/**
 * Must match Convex `SITE_URL` (deployment env) exactly (including host:
 * localhost vs 127.0.0.1).
 */
function authBaseURL() {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin;
  }
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
}

export const authClient = createAuthClient({
  baseURL: authBaseURL(),
  plugins: [convexClient()],
});
