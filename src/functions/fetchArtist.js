const axios = require("axios");

exports.handler = async (event) => {
  const { token } = JSON.parse(event.body);

  try {
    if (!token) {
      throw new Error("No token provided");
    }

    const response = await axios({
      method: "get",
      url: "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify(error),
    };
  }
};
