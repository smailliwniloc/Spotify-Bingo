import React from 'react';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } from '../environmentVars';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { Step4 } from './Step4';
import { WorkflowTimeline } from './WorkflowTimeline';

function Generator() {
  const [token, setToken] = React.useState<string>('');
  const [playlists, setPlaylists] = React.useState<any[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = React.useState<string>('');
  const [activeStep, setActiveStep] = React.useState(0);

  const getPlaylistTracks = async (playlistID: string) => {
    setSelectedPlaylist(playlistID);
  };

  const requestAccess = async () => {
    let code = localStorage.getItem('code')

    let body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code ?? '',
      redirect_uri: SPOTIFY_REDIRECT_URI ?? '',
    });

    console.log(body);

    const response = await fetch(
      'https://accounts.spotify.com/api/token',
      {
        method: 'POST',
        body,
        headers: {
          Authorization:
            'Basic ' +
            btoa(
              SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET
            ),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const responseBody = await response.json();

    setToken(responseBody.access_token)

    const profileResponse = await fetch('https://api.spotify.com/v1/me',{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${responseBody.access_token}`,
      },
    });

    const profileData = await profileResponse.json();

    console.log(profileData);

    const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${profileData.id}/playlists`,{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${responseBody.access_token}`,
      },
    });

    const playlistData = await playlistResponse.json()

    console.log(playlistData);

    setPlaylists(playlistData.items);
  }

  return (
      <div>
        <WorkflowTimeline step={activeStep} setStep={setActiveStep} size={4}/>
        <Step1/>
        <div className='w-full h-1 bg-black'/>
        {activeStep < 1 ? null :
          <>
            <Step2 requestAccess={requestAccess}/>
            <div className='w-full h-1 bg-black'/>          
          </>
        }
        {activeStep < 2 ? null :
          <>
            <Step3 playlists={playlists} getPlaylistTracks={getPlaylistTracks}/>
            <div className='w-full h-1 bg-black'/>
          </>
        }
        {activeStep < 3 ? null :
          <Step4 token={token} selectedPlaylist={selectedPlaylist}/>
        }
      </div>
  );
}

export default Generator;
