const express = require('express');
const bp = require('body-parser');
const signup = require('./src/controllers/signup');
const login = require('./src/controllers/login');
const auth = require('./src/middlewares/auth');
const errHan = require('./src/middlewares/err_handaler');
const cors = require('./src/middlewares/cors');
const redirects = require('./src/controllers/redirect');
const path = require('path');
const app = express();

//middelware
app.use(cors)
app.use(bp.json());
app.use('/api',auth);
app.use(express.static(path.resolve(__dirname,'./frontend/public')));
//routs
app.use(signup);
app.use(login);
app.use(redirects);


app.use(errHan);
const _port = process.env.PORT || 4000;
app.listen(_port,()=>{
    console.log('Application running or Port : '+_port);
})
// app.listen(4000,()=>{
//     console.log('Application running or Port : 4000')
// })