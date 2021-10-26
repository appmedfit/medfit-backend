'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const studentRoutes = require('./routes/student-routes');
const userRoutes= require('./routes/user-routes');
const app = express();
const isAuthenticated=require('./auth/authenticated')
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
res.setHeader('Last-Modified', (new Date()).toUTCString());
req.headers['if-none-match'] = 'no-match-for-this';
res.header('Access-Control-Allow-Origin', '*');
res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS',
);
res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials',
);
res.header('Access-Control-Allow-Credentials', 'true');
if (req.url.split('/')[3] === 'user' ||
    req.url.split('/')[3] === 'auth' 
    ) {
    next();
    } else if (req.headers.authorization) {
    isAuthenticated(req,res,next)
    
    } else { res.status(401).json('Unautorized'); }
});
// const router = express.Router();

// this.app.use('/', router);'=
const version = '/api/v1';
app.use(version+'/student', studentRoutes.routes);
app.use(version+'/user', userRoutes.routes);


app.listen(config.port, () => console.log('App is  listening on url http://localhost' + config.port));
