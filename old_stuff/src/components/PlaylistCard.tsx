import {Card, Grid} from '@mui/material';
import React from 'react';

type PlaylistCardProps = {
  playlist: any;
  onPlaylistClick: (playlistID: string) => Promise<any>;
};

function PlaylistCard({playlist, onPlaylistClick}: PlaylistCardProps) {
  const {name, images, owner} = playlist;
  return (
    <Card
      raised={true}
      style={{flexShrink: 0, margin: '8px', cursor: 'pointer'}}
      onClick={() => onPlaylistClick(playlist.id)}
    >
      <Grid container={true}>
        <Grid item={true} xs={4}>
          <img
            src={images[0].url}
            alt={`${name} playlist art`}
            style={{maxWidth: '100%'}}
          />
        </Grid>
        <Grid item={true} container={true} xs={8}>
          <Grid item={true} xs={12}>
            {name}
          </Grid>
          <Grid item={true} xs={4}>
            Author
          </Grid>
          <Grid item={true} xs={8}>
            {owner.display_name}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default PlaylistCard;
