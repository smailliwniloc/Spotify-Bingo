import {SCOPES} from '../constants/spotify';
import {SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI} from '../environmentVars';

const generateRandomString = (length: number) => {
  let result = '';
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// app.get('/login', function(req, res) {

//   var state = generateRandomString(16);
//   res.cookie(stateKey, state);

//   // your application requests authorization
//   var scope = 'user-read-private user-read-email';
//   res.redirect('https://accounts.spotify.com/authorize?' +
//     querystring.stringify({
//       response_type: 'code',
//       client_id: client_id,
//       scope: scope,
//       redirect_uri: redirect_uri,
//       state: state
//     }));
// });

// This is not safe to use as it exposes the client_id to the frontend. OR NOT with a redirect
export async function auth() {
  const state = generateRandomString(16);
  const scope = SCOPES.join(' ');
  // const codeVerifier = generateRandomString(128);

  const args = new URLSearchParams({
    response_type: 'code',
    client_id: SPOTIFY_CLIENT_ID ?? '',
    scope: scope,
    redirect_uri: SPOTIFY_REDIRECT_URI ?? '',
    state: state,
    // show_dialog: 'true',
  });

  return {
    // codeVerifier,
    spotifyUrl: `https://accounts.spotify.com/authorize?${args}`,
  }
}

// TODO: use the PKCE auth flow correctly in this function. OR NOT
export async function pkceAuth(code: string, codeVerifier: string) {
    const tokenUrl = 'https://accounts.spotify.com/api/token';

    const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: SPOTIFY_REDIRECT_URI ?? '',
        client_id: SPOTIFY_CLIENT_ID ?? '',
        code_verifier: codeVerifier,
    });

    try {
        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error during PKCE authorization:', error);
        throw error;
    }
}