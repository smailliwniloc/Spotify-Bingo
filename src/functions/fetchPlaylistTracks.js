const axios = require("axios")

exports.handler = async (event) => {
    const {token, playlistID} = JSON.parse(event.body)

    try {
        if (!token) {
            throw new Error("No token provided")
        }

        const response = await axios({
            method: 'get',
            url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        }
    } catch (error) {
        return {
            statusCode: error.statusCode || 500,
            body: JSON.stringify(error)
        }
    }
}
