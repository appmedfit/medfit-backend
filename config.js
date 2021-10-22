'use strict';
// const dotenv = require('dotenv');
// const assert = require('assert');

// dotenv.config();

// const {
//     PORT,
//     HOST,
//     HOST_URL,
//     API_KEY,
//     AUTH_DOMAIN,
//     DATABASE_URL,
//     PROJECT_ID,
//     STORAGE_BUCKET,
//     MESSAGING_SENDER_ID,
//     APP_ID
// } = process.env;

// assert(PORT, 'PORT is required');
// assert(HOST, 'HOST is required');

module.exports = {
    port: 8080,
    host: "localhost",
    url: "http://localhost:8080",
    
    firebaseConfig: {
    apiKey: "AIzaSyD0hWcsSNCMmNXVy8LP9NkmjL-QELnizEs",
    authDomain: "fir-a43f5.firebaseapp.com",
    databaseURL: "https://fir-a43f5-default-rtdb.firebaseio.com",
    projectId: "fir-a43f5",
    storageBucket: "fir-a43f5.appspot.com",
    messagingSenderId: "589443950538",
    appId: "1:589443950538:web:ce76d134d6f0bc1f109133",
    measurementId: "G-TW502YKYSX"
    }
}