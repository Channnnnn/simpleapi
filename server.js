// =======================
// get the packages we need ============
// =======================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User = require('./models/user'); // get our mongoose model
var Users = require('./controllers/userController');
var Post = require('./controllers/postController');
// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('appSecret', config.secret); // secret variable
app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes ================
// =======================
// basic route
app.post('/login', function(req,res){
    Users.login(req,res);
    // var username = req.params.username;
    // var password = req.params.password;

    // User.login(username, password, function(err,user){
    //     if (err) throw err;
        
    //     if (user && user.length != 0) {
    //         const payload = {
    //             id: user.id,
    //             email: user.email,
    //             admin: user.admin,
    //         };

    //         var token = jwt.sign(payload, config.secret, {
    //             expiresIn: 86400
    //         });

    //         return res.json({
    //             success: true,
    //             message: 'Enjoy your token !',
    //             token: token
    //         })
    //     }
    //     else {
    //         return res.json({
    //             success: false,
    //             message: 'Authentication failed please try again'
    //         })
    //     }
    // });
});

// API ROUTES -------------------

app.get('/', (req,res) => {
    Users.getAllUsers(req,res);
});

app.get('/user', (req,res) => {
    Users.getUsers(req,res);
});

app.post('/user', (req,res) => {
    Users.addUser(req,res);
});

app.get('/user/:id', (req, res) => {
    Users.getUserById(req,res);
});

app.put('/user/:id', (req, res) => {
    Users.updateUserById(req,res);
});

app.delete('/user/:id', (req, res) => {
    Users.removeUserById(req,res);
});

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);