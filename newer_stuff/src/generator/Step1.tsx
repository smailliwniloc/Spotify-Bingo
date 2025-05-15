import React from 'react';
import { Button } from '../components/Button';
// import {auth} from '../utils/spotifyAuth';
import { StepWrapper } from "./StepWrapper"

export const Step1 = () => {

    const [authenticated, setAuthenticated] = React.useState(false);
    const [spotifyCode, setSpotifyCode] = React.useState<string | null>(null);

    React.useEffect(() => {

        const handleStoreCode = () => {
            console.log("in event");
            const code = localStorage.getItem('code');
            if (code) {
                setAuthenticated(true);
                setSpotifyCode(code);
            }
        }

        window.addEventListener('store-code', handleStoreCode);

        return () => {
            window.removeEventListener('store-code', handleStoreCode);
        }
    }, []);

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.stopPropagation();
        event.preventDefault();
        const target = event.target as HTMLAnchorElement;
        window.open(target.href, '_blank', 'height=200;width=200;');
    }

    return (
        <StepWrapper>
            <div>
                Step 1
            </div>
            <div>
                {/* <Button onClick={auth} title="Connect with Spotify"/> */}
                <a href="/api/spotify/auth" onClick={handleClick}>Connect with spotify</a>
                {authenticated ? <span>Already logged in {spotifyCode}</span> : null}
                <Button onClick={async () => {await fetch('/api/hello')}} title="click"/>
                <Button onClick={() => {console.log(localStorage.getItem('code'))}} title="click2"/>
            </div>
        </StepWrapper>
    )
}