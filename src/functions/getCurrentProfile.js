const axios = require("axios");

exports.handler = async (event) => {
  const { token } = JSON.parse(event.body);

  try {
    if (!token) {
      throw new Error("No token provided");
    }

    console.log(1);

    const response = await axios({
      method: "get",
      url: "https://api.spotify.com/v1/me",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.log("error :(");
    console.log(error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify(error),
    };
  }
};
