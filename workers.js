// workers.js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

const PROTON_TOKEN_ENDPOINT = 'https://account.proton.me/oauth/v2/token';
const PROTON_DRIVE_UPLOAD   = 'https://drive.proton.me/api/v2/files';

async function handleRequest(request) {
  const url = new URL(request.url);
  if (url.pathname === '/api/token' && request.method === 'POST') {
    const {code, redirect_uri} = await request.json();
    const params = new URLSearchParams({
      client_id: 'YOUR_CLIENT_ID',
      client_secret: 'YOUR_CLIENT_SECRET',
      grant
