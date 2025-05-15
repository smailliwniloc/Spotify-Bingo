import {SCOPES} from '../constants/SPOTIFY_SCOPES';

const {SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI} = require('../environmentVars');

function generateRandomString(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const redirectUri = SPOTIFY_REDIRECT_URI;

const codeVerifier = generateRandomString(128);

export default async function auth() {
  let state = generateRandomString(16);
  let scope = SCOPES.join(' ');

  localStorage.setItem('code_verifier', codeVerifier);

  let args = new URLSearchParams({
    response_type: 'code',
    client_id: SPOTIFY_CLIENT_ID,
    scope: scope,
    redirect_uri: redirectUri,
    state: state,
    show_dialog: true,
  });

  window.location = 'https://accounts.spotify.com/authorize?' + args;
}
