/*var http = require('http');
var port = process.env.port || 1280;
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);*/

var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');

//*****************************
// mysql connection pool
//*****************************
var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    port: '3306',
    user: 'imdbuser',
    password: '1md8user',
    database: 'instant_msg'
});
var tabelname = 'MyGuest';



//*****************************
// Constant group
//*****************************
// If operation is failed by unknown reason
const FAILED = 0;
const SUCCESSFUL = 1;

// When signing up, if username is already taken, return this error
const SIGN_UP_USERNAME_CRASHED = 2;

// When add new friend request, if friend is not found, return this error 
const ADD_NEW_USERNAME_NOT_FOUND=2;

// TIME_INTERVAL_FOR_USER_STATUS: if last authentication time of user is older 
// than NOW - TIME_INTERVAL_FOR_USER_STATUS, then user is considered offline
const TIME_INTERVAL_FOR_USER_STATUS=60;

const USER_APPROVED=1;
const USER_UNAPPROVED=0;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var username = '';
var password = '';
var port = '';
var action = '';

/**
 * Handle requst parameters before handling the action. 
 * If anything wrong with the parameters, return failure.
 * @param req 
 **/
function handle_para(req,res) {
    username = req.body['username'];
    username = check_param(username);

    password = req.body['password'];
    password = check_param(password);
    
    action = req.body['action'];
    action = check_param(action);

    if (username == '' || password == '') { 
        res.send(FAILED);
        return false;
    }
    return true;    
    
}

/**
 * Handle action.
 * @param req 
 **/

function handle_action(res) {
    switch (action) {
        case "authenticateUser":
            break;

        case "signUpUser":
            break;

        case "sendMessage":
            break;
        case "addNewFriend":
            break;
        case "responseOfFriendReqs":
            break;
    }
}

/**
 * Check if a parameter is valid.
 * @param par 
 **/
function check_param(par) { 
    return (par != null && par.length > 0) ? par:'';
}



app.post("/", function (req,res) {
    if (handle_para(req, res)) {
        handle_action(res);
    }
}
);

console.log("Server is listening at port " + 9986);
app.listen(9986);