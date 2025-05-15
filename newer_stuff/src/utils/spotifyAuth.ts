import {SCOPES} from '../constants/SPOTIFY_SCOPES';

import {SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI} from '../environmentVars';

function generateRandomString(length: number) {
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

export async function _auth() {
  let state = generateRandomString(16);
  let scope = SCOPES.join(' ');

  localStorage.setItem('code_verifier', codeVerifier);

  let args = new URLSearchParams({
    response_type: 'code',
    client_id: SPOTIFY_CLIENT_ID ?? '',
    scope: scope,
    redirect_uri: redirectUri ?? '',
    state: state,
    show_dialog: 'true',
  });

  const tester = window.open(`https://accounts.spotify.com/authorize?${args}`, '_blank', 'height=200;width=200;');

  if (tester !== null) {
    tester.onbeforeunload = function () {
      console.log('test')
    }
  }
}

export async function auth() {
  const response = await fetch('http://localhost:3001/api/spotify/auth', {method: 'GET', redirect: 'manual'})
  console.log(response);
  const location = response.headers.get('Location');
  if (location) {
    const tester = window.open(location, '_blank', 'height=200;width=200;');
    if (tester !== null) {
      tester.onbeforeunload = function () {
        console.log('test')
      }
    }
  }
}
