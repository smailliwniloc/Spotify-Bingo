const axios = require('axios')
const {SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET} = require("../environmentVars")

exports.handler = async () => {
    try {

        const requestBody = {
            grant_type: 'client_credentials',
            client_id: SPOTIFY_CLIENT_ID,
            client_secret: SPOTIFY_CLIENT_SECRET
        };

        const {data} = await axios.post('https://accounts.spotify.com/api/token', requestBody, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        return {
        statusCode: 200,
        body: data.access_token
        };
    }
    catch (error) {
        return {
            statusCode: error.statusCode || 500,
            body: JSON.stringify(error)
        }
    }
  };