// generateToken.cjs
const dotenv = require('dotenv');
const admin = require('firebase-admin');
const path = require('path');

dotenv.config();

const serviceAccount = require(path.resolve(process.cwd(), process.env.SERVICE_ACCOUNT_KEY_PATH));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const uid = process.env.UID;  // Replace this with the UID of the user for which you want to generate a custom token

admin.auth().createCustomToken(uid)
  .then((customToken) => {
    console.log("Custom Token:", customToken);
  })
  .catch((error) => {
    console.log("Error creating custom token:", error);
  });
