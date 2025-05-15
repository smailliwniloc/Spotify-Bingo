type PlaylistCardProps = {
  playlist: any;
  onPlaylistClick: (playlistID: string) => Promise<any>;
};

function PlaylistCard({playlist, onPlaylistClick}: PlaylistCardProps) {
  const {name, images, owner} = playlist;
  return (
    <div
      style={{flexShrink: 0, margin: '8px', cursor: 'pointer'}}
      onClick={() => onPlaylistClick(playlist.id)}
    >
      <div>
        <div>
          <img
            src={images[0].url}
            alt={`${name} playlist art`}
            style={{maxWidth: '100%'}}
          />
        </div>
        <div>
          <div>
            {name}
          </div>
          <div>
            Author
          </div>
          <div>
            {owner.display_name}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaylistCard;
