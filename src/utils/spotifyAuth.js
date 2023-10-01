const { SPOTIFY_CLIENT_ID } = require("../environmentVars");

function generateRandomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const redirectUri = "http://localhost:8888/new-game";

const codeVerifier = generateRandomString(128);

export default async function auth() {
  let state = generateRandomString(16);
  let scope = "user-read-private user-read-email";

  localStorage.setItem("code_verifier", codeVerifier);

  let args = new URLSearchParams({
    response_type: "code",
    client_id: SPOTIFY_CLIENT_ID,
    scope: scope,
    redirect_uri: redirectUri,
    state: state,
  });

  window.location = "https://accounts.spotify.com/authorize?" + args;
}
