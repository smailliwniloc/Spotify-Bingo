import PlaylistCard from "./PlaylistCard"
import { StepWrapper } from "./StepWrapper"

type Step3Props = {
    playlists: any[];
    getPlaylistTracks: (playlistID: string) => Promise<void>
}

export const Step3 = ({playlists, getPlaylistTracks}: Step3Props) => {
    return (
        <StepWrapper>
            <div>
                Step 3
            </div>
            <div>
            <div>Choose Your Playlist</div>
            <div className="flex flex-col max-h-[50vw] overflow-y-auto gap-2">
                {playlists.map((playlist) => {
                return !!playlist &&
                <PlaylistCard
                    key={playlist.id}
                    playlist={playlist}
                    onPlaylistClick={getPlaylistTracks}
                />
                })}
            </div>
            </div>
        </StepWrapper>
    )
}