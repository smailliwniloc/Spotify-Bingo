const axios = require('axios');
const {SPOTIFY_CLIENT_ID} = require('../environmentVars')

exports.handler = async () => {
    try {
        return {
        statusCode: 200,
        body: `testing: ${SPOTIFY_CLIENT_ID}`
        };
    }
    catch (error) {
        return {
            statusCode: error.statusCode || 500,
            body: JSON.stringify(error)
        }
    }
  };