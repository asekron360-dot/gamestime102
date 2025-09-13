// ECC‑P‑256 + AES‑GCM (Web Crypto API)
export async function generateECC() {
  const pair = await crypto.subtle.generateKey(
    { name: "ECDH", namedCurve: "P-256" },
    true,
    ["deriveKey"]
  );
  const spki = await crypto.subtle.exportKey("spki", pair.publicKey);
  localStorage.setItem("ecc_pub", btoa(String.fromCharCode(...new Uint8Array(spki))));
  return pair;
}

export async function encryptFile(file, eccPair) {
  const buf = await file.arrayBuffer();

  // AES‑GCM
  const aesKey = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt"]);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, aesKey, buf);

  // Wrap AES key with ECC shared secret (ECIES‑like)
  const rawAes = await crypto.subtle.exportKey("raw", aesKey);
  const shared = await crypto.subtle.deriveBits(
    { name: "ECDH", public: eccPair.publicKey },
    eccPair.privateKey,
    256
  );
  const hkdfKey = await crypto.subtle.importKey("raw", shared, { name: "HKDF" }, false, ["deriveKey"]);
  const wrapKey = await crypto.subtle.deriveKey(
    { name: "HKDF", hash: "SHA-256", salt: new Uint8Array([]), info: new Uint8Array([]) },
    hkdfKey,
    { name: "AES-KW", length: 256 },
    false,
    ["wrapKey"]
  );
  const wrappedAes = await crypto.subtle.wrapKey("raw", aesKey, wrapKey, { nam
