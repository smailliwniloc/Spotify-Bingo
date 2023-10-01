// async function generateCodeChallenge(codeVerifier) {
//   var digest = await crypto.subtle.digest("SHA-256",
//     new TextEncoder().encode(codeVerifier));

//   return btoa(String.fromCharCode(...new Uint8Array(digest)))
//     .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
// }

async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);

  return window.crypto.subtle.digest("SHA-256", data);
}

function base64urlencode(a) {
  return btoa(
    String.fromCharCode
      .apply(null, new Uint8Array(a))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, ""),
  );
}

async function generateCodeChallenge(verifyCode) {
  const hashed = await sha256(verifyCode);
  const codeChallenge = base64urlencode(hashed);
  return codeChallenge;
}

export default generateCodeChallenge;
