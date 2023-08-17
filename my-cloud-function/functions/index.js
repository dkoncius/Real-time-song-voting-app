const { onRequest } = require("firebase-functions/v2/https");
const cors = require('cors')({origin: true});

exports.getUserIP = onRequest((request, response) => {
  cors(request, response, () => {
    try {
      const ipAddresses = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
      const ip = ipAddresses.split(',')[0].trim();
      console.log(`User IP: ${ip}`);
      response.send({ ip });

    } catch (error) {
      console.error("Error handling user IP:", error);
      response.status(500).send({ error: error.message });
    }
  });
});
