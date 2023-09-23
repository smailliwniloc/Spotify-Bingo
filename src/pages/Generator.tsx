// import React, {Component} from 'react';
// import './singo.css';
// import axios from 'axios';
// import PageLayout from '../components/PageLayout';

// const CLIENT_ID = "94848050246e4d1e9afd600c52dba933"
// const REDIRECT_URI = "http://localhost:3000/singo"
// const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
// const RESPONSE_TYPE = "token"
// // const PLAYLIST_ID = "2ufAm3ukdQDuX17quR8wzI" // SINGO FUN
// // const PLAYLIST_ID = "08toWOb1Lxrt7578WucmYd" // SINGO FUN PT.2
  
// class Singo extends Component {

//     logout = () => {
//         this.setState({token: ""})
//         window.localStorage.removeItem("token")
//     }

//     findPlaylist = async (e: React.MouseEvent) => {
//         this.logout()
//         console.log("Inside search artists")

//         let token = this.getToken()
//         console.log("token is " + token)

//         e.preventDefault()

//         let requests = []
//         let i = 0
//         while (true) {
//             let request = await axios.get(`https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 },
//                 params: {
//                     offset: 100*i
//                 }
//             })
//             i += 1
//             requests.push(request)
//             if (!request.data.next) { break }
//         }

//         let songs = []
//         for (let i = 0; i < requests.length; i++){
//             songs.push(...requests[i].data.items.map( (item: any) => item.track.name ))
//         }

//         let formattedSongs = []

//         for(let i = 0; i < songs.length; i++) {
//             let song = songs[i]
//             if (song.includes(" - ")) {
//                 song = song.split(" - ")[0]
//             }
//             if (song.includes("(")) {
//                 song = song.split("(")[0]
//             }
//             if (song.includes("_")) {
//                 song = song.split("_")[0]
//             }

//             formattedSongs.push(song)
//         }

//         console.log(formattedSongs)

//         this.setState({songs: formattedSongs})
    
//     }

//     getToken = () => {
//         const hash = window.location.hash
//         let tokens = window.localStorage.getItem("token")

//         if (!tokens && hash) {
//             tokens = (hash.substring(1).split("&").find(elem => elem.startsWith("access_token")) ?? "").split("=")[1]
//             window.location.hash = ""
//             window.localStorage.setItem("token", tokens)
//         }

//         return tokens

//     }

    
//     cards = [...Array(20)]

//     constructor(props: any) {
//         super(props);

//         this.state = { 
//             // Initialize state values
//             token: "",
//             songs: [
//                 "Party in the USA", "Tequila", "Dance, Dance", "Sugar, we're going down", "Stick Season", "Cotton-Eyed Joe",
//                 "Sexy and I know it", "Bad Guy", "Life is a highway", "Gallway Girl", "I Still Haven't Found What I'm Looking For", "Call Me Maybe", 
//                 "Photograph", "Rockstar", "FourFiveSeconds", "Happy Birthday", "Pokemon Themesong", "Bang Bang", "It's Time",
//                 "Radioactive", "Demons", "Car Radio", "Blurryface", "O'Reilly Autoparts Theme", "Let It Go", "Thnks Fr Th Mmrs",
//                 "Hallelujah", "Party Rock Anthem", "Boys are Back in Town", "Back in Black", "We will rock you", "Red Solo Cup"
//                     ]
//         };
//         // Notation for defining functions
//         this.makeSingo = this.makeSingo.bind(this);
//     }

//     makeSingo(num: any) {
//         let mixedList = this.state.songs.sort(() => Math.random() - 0.5).slice(0,25)
//         let mixedMatrix = []
//         let row = []
//         let count = 0
//         for (const song in mixedList) {
//             row.push(mixedList[song])
//             count += 1
//             if (count === 5) {
//                 mixedMatrix.push(row)
//                 row = []
//                 count = 0
//             }
//         }

//         return (
//             <table className={'Singo-board' + num}>
//                 <tbody>
//                     {mixedMatrix.map( (row, i) => (
//                         <tr key={[row,i]}>
//                             {row.map( (song, j) => (
//                                 <td key={[song,j]}>{song}</td>
//                             ))}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         )
//     }

//     render() {
//         return (
//             <Layout>
//             <div className='Full-wrapper'>
//                 <a 
//                 href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
//                 >
//                     Login to Spotify
//                 </a>

//                 <button type={"submit"} onClick={this.findPlaylist}>Generate Playlist</button>

//                 {this.cards.map( (num, i) => (
//                     <div key={i}>
//                         <h1 className='Singo-title'><u>Baby Singo</u></h1>

//                         <div className='Top-Singo'>                 
//                             {this.makeSingo(1)}
//                             {this.makeSingo(2)}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             </Layout>
//         )
//     } 
// };
  
// export default Singo;

import React from 'react'
import axios from 'axios'
import PageLayout from '../components/PageLayout'
import { API_ROUTE } from '../constants/ROUTES'

const PLAYLIST_ID = "0L9bUjiBKpLQah8N17alz6" // Baby shower Singo

const testRoute = async () => {
    const {data} = await axios.get(`${API_ROUTE}/test`)
    console.log(data)
}

function Generator() {

    const [token, setToken] = React.useState("")

    const requestAccess = async () => {
        const {data} = await axios.get(`${API_ROUTE}/requestSpotifyAccess`)
        setToken(data)
    }

    const fetchPlaylistTracks = async () => {
        const {data} = await axios.post(`${API_ROUTE}/fetchPlaylistTracks`, {token: token, playlistID: PLAYLIST_ID})
        console.log(data)
    }

    React.useEffect(() => {
        requestAccess()
    }, [])

    return (
        <PageLayout>
        <div onClick={fetchPlaylistTracks}>help me</div>
        </PageLayout>
    )
}

export default Generator