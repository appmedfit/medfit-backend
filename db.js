const config = require('./config');
const firebase = require('firebase')
const admin = require('firebase-admin')
const serviceAccount = require('./medfit-b64e7-29dffd8c4c84.json');


firebase.initializeApp(config.firebaseConfig);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://medfit-b64e7.firebaseapp.com"
});

module.exports = { firebase, admin };