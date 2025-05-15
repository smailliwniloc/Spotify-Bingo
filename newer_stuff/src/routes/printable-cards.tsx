import { createFileRoute } from '@tanstack/react-router'
import React from 'react';

export const Route = createFileRoute('/printable-cards')({
  component: RouteComponent,
})

function RouteComponent() {
  const [tracks, setTracks] = React.useState<any[]>([]);
  const [count, setCount] = React.useState<number | null>(null);
  const title = 'A SINGO Christmas';

  const fetchPlaylistTracks = React.useCallback(
    async (token: string | null, playlistID: string | null) => {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
        method: 'GET',
        // url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!data.items) {
        return;
      }

      console.log(data);

      const songs = data.items.map((track: any) => track.track.name);

      const formattedSongs = [];

      for (let i = 0; i < songs.length; i++) {
        let song = songs[i];
        if (song.includes(' - ')) {
          song = song.split(' - ')[0];
        }
        if (song.includes('(')) {
          song = song.split('(')[0];
        }
        if (song.includes('_')) {
          song = song.split('_')[0];
        }

        formattedSongs.push(song);
      }

      setTracks(formattedSongs);
    },
    []
  );

  React.useEffect(() => {
    const URLParams = new URLSearchParams(window.location.search);
    const token = URLParams.get('token');
    const playlistID = URLParams.get('playlistID');
    const amount = Number(URLParams.get('amount'));
    setCount(amount);
    fetchPlaylistTracks(token, playlistID);
  }, [fetchPlaylistTracks]);

  const makeSingo = (num: number) => {
    const mixedList = tracks.sort(() => Math.random() - 0.5).slice(0, 25);
    const mixedMatrix = [];
    let row = [];
    let count = 0;
    for (const song in mixedList) {
      row.push(mixedList[song]);
      count += 1;
      if (count === 5) {
        mixedMatrix.push(row);
        row = [];
        count = 0;
      }
    }

    return (
      <table className={'Singo-board' + num}>
        <tbody>
          {mixedMatrix.map((row, i) => (
            <tr key={`${row},${i}`}>
              {row.map((song, j) => (
                <td key={`${song},${j}`}>{song}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const cards = [...Array(count)];

  console.log(tracks);

  return (
    <>
      {cards.map((_, i) => (
        <div key={i}>
          <h1 className="Singo-title">
            <u>{title}</u>
          </h1>

          <div className="Top-Singo">
            {makeSingo(1)}
            {makeSingo(2)}
          </div>
        </div>
      ))}
    </>
  );
};