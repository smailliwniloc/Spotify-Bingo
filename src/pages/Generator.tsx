import React from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import { useLocation } from 'react-router-dom';
import {Divider, Grid, TextField} from '@mui/material';
import PageLayout from '../components/PageLayout';
import auth from '../utils/spotifyAuth';
import PlaylistCard from '../components/PlaylistCard';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } from '../environmentVars';

function Generator() {
  const [token, setToken] = React.useState<string>('');
  const [playlists, setPlaylists] = React.useState<any[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = React.useState<string>('');
  const [numberOfCards, setNumberOfCards] = React.useState<number>(30);
  const [title, setTitle] = React.useState<string>('Singo');
  const [isLoadingProfileData, setIsLoadingProfileData] = React.useState<boolean>(false);
  const [userName, setUserName] = React.useState<string | null>(null);

  const getPlaylistTracks = async (playlistID: string) => {
    setSelectedPlaylist(playlistID);
  };

  const onNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfCards(Number(event.target.value))
  }

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }

  const location = useLocation();

  React.useEffect(() => {
    setIsLoadingProfileData(true);

    const idk = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      let code = urlParams.get('code');
      if (!code) {
        return;
      }

      if ((!!playlists && playlists.length > 0) || token) {
        return; 
      }

      if (isLoadingProfileData) {
        return;
      }


      let body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code ?? '',
        redirect_uri: SPOTIFY_REDIRECT_URI ?? '',
      });

      console.log(body);

      try {
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

      setUserName(profileData.display_name);

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
      catch (error) {
        console.error('Error fetching Spotify data:', error);
      }

      setIsLoadingProfileData(false);
    }

    idk();
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [location]);

  const printCards = () => {
    const printableCards = window.frames[0];
    printableCards.print();
  };

  return (
    <PageLayout>
      <Grid container={true}>
        <Grid item={true} xs={4}>
          Step 1
        </Grid>
        <Grid item={true} xs={8}>
          {token && userName ? <span>Hello {userName}!</span> : <button onClick={auth}>Log In To Spotify</button>}
        </Grid>
        <Divider style={{width: '100%'}}/>
        <Divider style={{width: '100%'}}/>
        <Grid item={true} xs={4}>
          Step 2
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
        <Divider style={{width: '100%'}}/>
        <Grid item={true} xs={4}>
          Step 3
        </Grid>
        <Grid item={true} xs={8}>
          <TextField onChange={onTitleChange} type='text' value={title} label="Title" sx={{margin: '8px'}}/>
          <TextField onChange={onNumberChange} type='number' value={numberOfCards} label="Number of Cards" sx={{margin: '8px'}}/>
        </Grid>
        {!!token && !!selectedPlaylist ? <Grid item={true} xs={12}>
          Print the cards
          <button onClick={printCards}>Print Cards</button>
          <iframe
            title="Printable Cards"
            name="printable_cards"
            src={`/printable-cards?token=${token}&playlistID=${selectedPlaylist}&amount=${numberOfCards}&title=${title}`}
            style={{height: '100vh', width: '100%'}}
          />
        </Grid> : null}
      </Grid>
    </PageLayout>
  );
}

export default Generator;
