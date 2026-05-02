import { convexBetterAuthNextJs } from '@convex-dev/better-auth/nextjs';

/**
 * Requires:
 * - NEXT_PUBLIC_CONVEX_URL — deployment (*.convex.cloud)
 * - NEXT_PUBLIC_CONVEX_SITE_URL — HTTP site (*.convex.site), not .cloud
 * - SITE_URL — set on the Convex dashboard to this app’s public URL (mirror NEXT_PUBLIC_SITE_URL)
 * - BETTER_AUTH_SECRET — Convex env (≥32 chars). Encrypts JWKS private keys; if you change it without
 *   clearing `jwks` rows (see convex/authJwksMaintenance.ts), token minting breaks.
 */
export const {
  handler,
  preloadAuthQuery,
  isAuthenticated,
  getToken,
  fetchAuthQuery,
  fetchAuthMutation,
  fetchAuthAction,
} = convexBetterAuthNextJs({
  convexUrl: process.env.NEXT_PUBLIC_CONVEX_URL!,
  convexSiteUrl: process.env.NEXT_PUBLIC_CONVEX_SITE_URL!,
});
