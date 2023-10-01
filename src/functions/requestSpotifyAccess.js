const axios = require("axios");
const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI,
} = require("../environmentVars");

exports.handler = async (event) => {
  const { code } = JSON.parse(event.body);
  try {
    let body = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
    });

    const { data } = await axios.post(
      "https://accounts.spotify.com/api/token",
      body,
      {
        headers: {
          Authorization:
            "Basic " +
            new Buffer.from(
              SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET,
            ).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    return {
      statusCode: 200,
      body: data.access_token,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify(error),
    };
  }
};
