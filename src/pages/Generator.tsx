import React from 'react';
import axios from 'axios';
// import {useLocation} from 'react-router-dom';
import PageLayout from '../components/PageLayout';
// import {API_ROUTE} from '../constants/ROUTES';
import {Grid} from '@mui/material';
import auth from '../utils/spotifyAuth';
import PlaylistCard from '../components/PlaylistCard';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } from '../environmentVars';
import { Buffer } from 'buffer';

function Generator() {
  const [token, setToken] = React.useState<string>('');
  const [playlists, setPlaylists] = React.useState<any[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = React.useState<string>('');

  // const getProfile = async (code: string) => {
  //   const codeVerifier = localStorage.getItem('code_verifier');
  //   const {data: tokenData} = await axios.post(
  //     `${API_ROUTE}/requestSpotifyAccess`,
  //     {
  //       code: code,
  //       codeVerifier: codeVerifier,
  //     }
  //   );
  //   setToken(tokenData);
  //   const {data: profileData} = await axios.post(
  //     `${API_ROUTE}/getCurrentProfile`,
  //     {
  //       token: tokenData,
  //     }
  //   );
  //   const {data: playlistData} = await axios.post(
  //     `${API_ROUTE}/fetchUserPlaylists`,
  //     {
  //       token: tokenData,
  //       userID: profileData.id,
  //     }
  //   );
  //   setPlaylists(playlistData.items);
  // };

  const getPlaylistTracks = async (playlistID: string) => {
    setSelectedPlaylist(playlistID);
  };

  // const location = useLocation();

  // React.useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   let code = urlParams.get('code');
  //   if (code) {
  //     getProfile(code);
  //   }
  //   window.history.replaceState({}, '', '/new-game');
  // }, [location]);

  const printCards = () => {
    const printableCards = window.frames[0];
    printableCards.print();
  };

  const requestAccess = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    let body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code ?? '',
      redirect_uri: SPOTIFY_REDIRECT_URI ?? '',
    });

    console.log(body);

    const {data} = await axios.post(
      'https://accounts.spotify.com/api/token',
      body,
      {
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(
              SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET
            ).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    setToken(data.access_token);

    const {data: profileData} = await axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/me',
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    });

    console.log(profileData);

    const {data: playlistData} = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/users/${profileData.id}/playlists`,
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    });

    console.log(playlistData);

    setPlaylists(playlistData.items);


  }

  return (
    <PageLayout>
      <Grid container={true}>
        <Grid item={true} xs={4}>
          {'Step 1 :)'}
        </Grid>
        <Grid item={true} xs={8}>
          <button onClick={auth}>Log In To Spotify</button>
        </Grid>
        <Grid item={true} xs={4}>
          Step 2
          <button onClick={requestAccess}>RequestAccess</button>
          {token ?? 'wait'}
        </Grid>
        <Grid
          item={true}
          xs={8}
          style={{display: 'flex', flexDirection: 'column', gap: '8px'}}
        >
          <div>Choose Your Playlist</div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '50vh',
              overflowY: 'auto',
              gap: '8px',
            }}
          >
            {playlists.map((playlist) => {
              return !!playlist &&
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                onPlaylistClick={getPlaylistTracks}
              />
})}
          </div>
        </Grid>
        <Grid item={true} xs={4}>
          Step 3
        </Grid>
        <Grid item={true} xs={12}>
          Print the cards
          <button onClick={printCards}>Print Cards</button>
          <iframe
            title="Printable Cards"
            name="printable_cards"
            src={`/printable-cards?token=${token}&playlistID=${selectedPlaylist}`}
            style={{height: '100vh', width: '100%'}}
          />
        </Grid>
      </Grid>
    </PageLayout>
  );
}

export default Generator;
