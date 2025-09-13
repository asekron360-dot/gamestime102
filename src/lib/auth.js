// Proton OAuth (implicit flow) – client‑side only
export const PROTON_CLIENT_ID = "YOUR_PROTON_CLIENT_ID"; // <-- değiştir
export const REDIRECT_URI   = `${location.origin}${location.pathname}`;

export function buildAuthUrl() {
  const p = new URLSearchParams({
    client_id: PROTON_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "token",
    scope: "openid email drive",
    state: Math.random().toString(36).substring(2)
  });
  return `https://account.proton.me/oauth/v4/authorize?${p}`;
}

export function extractTokenFromHash() {
  const hash = location.hash.slice(1);
  const data = Object.fromEntries(new URLSearchParams(hash));
  return data.access_token || null;
}
