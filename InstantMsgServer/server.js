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
var md5 = require('MD5');

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

var isWriteConsole = true;


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

/*
 * Output message to console, controled by isWriteConsole
 * @param str: string to output to console.
 * */
function write_console(sta,str) {
    if (isWriteConsole) {
        var msg = "";
        if (sta == SUCCESSFUL) {
            msg="SUCCESSFUL: "
        }
        if (sta == FAILED) { 
            msg = "FAILED: ";
        }
        if (sta == -1) {
            msg = "";
        }

        str = msg + str;
        console.log(str);
    }
}


/**
 * Handle action.
 * @param req 
 **/
function getCurrentDatetime() {
    var dt = new Date();
    //"Y-m-d H:i"
    return dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate() + " " + dt.getHours() + ":" + dt.getMinutes()+":"+dt.getSeconds(); 
}

function handle_action(req, res) {
    var out = FAILED;
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({ "code": 100, "status": "Error in connection database" });
            return;
        }
        
        write_console(-1,'connected as id ' + connection.threadId);
        
        switch (action) {
            case "authenticateUser":
                authenticateUser(connection, req, res,function (userId) {
                        var querystring = "select u.Id, u.username, (NOW()-u.authenticationTime) "
                        + "as authenticateTimeDifference, u.IP, f.providerId, f.requestId, f.status, u.port "
                        + "from friends f left join users u on u.Id = if (f.providerId = " + userId + ", f.requestId, f.providerId) "
                        + "where(f.providerId = " + userId +" and f.status = " + USER_APPROVED + ")  or f.requestId = "+ userId +" ";
                        
                        var sqlmessage = "SELECT m.id, m.fromuid, m.touid, m.sentdt, m.read, m.readdt, m.messagetext, u.username from messages m \n"
                         +"left join users u on u.Id = m.fromuid WHERE `touid` = " + userId + " AND `read` = 0 LIMIT 0, 30 ";
                        connection.query(querystring, function (err, rows) {
                            if (!err) {
                                out = "<data>";
                                out += "<user userKey='" + userId + "' />";
                                //while(rows)
                                for (i = 0; i < rows.length; i++) {
                                    var status = "offline";
                                    if (rows[i]['status'] == USER_UNAPPROVED) { 
                                        status = "unApproved";
                                    } else if (rows[i]['authenticateTimeDifference']< TIME_INTERVAL_FOR_USER_STATUS) {
                                        status = "online";
                                    }
                                    out+= "<friend  username = '"+rows[i]['username']+ "'  status='"+ status+"' IP='" + rows[i]['IP'] + "' userKey = '"+rows[i]['Id']+"'  port='"+ rows[i]['port']+"'/>";
                            }
                            connection.query(sqlmessage, function (err, rowmessage) {
                                if (!err) {
                                    for (j = 0; j < rowmessage.length; j++) {
                                        out += "<message  from='" + rowmessage[j]['username'] + "'  sendt='" + rowmessage[j]['sentdt'] + "' text='" + rowmessage[j]['messagetext'] + "' />";
                                        var dt = getCurrentDatetime();
                                        var sqlendmsg = "UPDATE `messages` SET `read` = 1, `readdt` = '" + dt + "' WHERE `messages`.`id` = " + rowmessage[j]['id'] + ";";
                                        connection.query(sqlendmsg);
                                    }
                                    out += "</data>";
                                    var console_msg = build_console_msg(username, action, null);
                                    send_res(res, out, SUCCESSFUL, console_msg, connection);
                                }
                                else {
                                    out = FAILED;
                                    var console_msg = build_console_msg(username, action, err);
                                    send_res(res, out, FAILED, console_msg, connection);
                                }
                            });
                            }
                            else {
                                out = FAILED;
                                var console_msg = build_console_msg(username, action, err);
                                send_res(res, out, FAILED, console_msg, connection);
                            }
                        });
                    });
                break;

            case "signUpUser":
                if (req.body['email'] != null) {
                    var email = req.body['email'];
                    
                    write_console(-1, email + ' is checked.');
                    
                    var querystring = "select Id from users where username = '" + username + "' limit 1 ";
                    connection.query(querystring, function (err, rows) {
                        
                        if (!err) {
                            if (rows.length == 0) {
                                querystring = "insert into ??(??,??,??) values(?,?,?)";
                                var table = ["users", "username", "password", "email", username, md5(password), email];
                                querystring = mysql.format(querystring, table);
                                connection.query(querystring, function (err, rows) {
                                    if (!err) {
                                        out = SUCCESSFUL;
                                        var console_msg= build_console_msg(username, action, null);
                                        send_res(res, out, SUCCESSFUL, console_msg, connection);
                                    }
                                    else {
                                        out = FAILED;
                                        var console_msg = build_console_msg(username, action, err);
                                        send_res(res, out, FAILED, console_msg, connection);
                                    }
                                });
                            }
                            else {
                                out = SIGN_UP_USERNAME_CRASHED;
                                var console_msg= build_console_msg(username, action, "User already exists");
                                send_res(res, out, FAILED, console_msg, connection);
                            }
                        }
                        else {
                            out = FAILED;
                            var console_msg = build_console_msg(username, action, err);
                            send_res(res, out, FAILED, console_msg, connection);
                        }
                    });
                }
                else {
                    out = FAILED;
                    var console_msg= build_console_msg(username, action, "Email not valid.");
                    send_res(res, out, FAILED, console_msg, connection);
                }
                       
                break;

            case "sendMessage":
                authenticateUser(connection, req, res, function (userId) {
                    var reqbody = req.body;
                    if (reqbody['to'] != null) {
                        var tousername = reqbody['to'];
                        var message = reqbody['message'];
                        var querystring = "select Id from  users where username = '" + tousername + "' limit 1";
                        connection.query(querystring, function (err, rows) {
                            if (!err) {
                                var dt = getCurrentDatetime();
                                var touid = rows[0];
                                var sql = "insert into ??(??,??,??,??) values(?,?,?,?);";
                                var table = ["messages", "fromuid", "touid", "sentdt", "messagetext", userId, touid['Id'], dt, message];
                                sql = mysql.format(sql, table);
                                connection.query(sql, function (err, row) {
                                    if (!err) {
                                        out = SUCCESSFUL;
                                        var console_msg = build_console_msg(username, action, null);
                                        send_res(res, out, SUCCESSFUL, console_msg, connection);
                                    }
                                    else {
                                        out = FAILED;
                                        var console_msg = build_console_msg(username, action, err);
                                        send_res(res, out, FAILED, console_msg, connection); 
                                    }
                                });
                            }
                            else {
                                out = FAILED;
                                var console_msg = build_console_msg(username, action, err);
                                send_res(res, out, FAILED, console_msg, connection); 
                            }
                        });
                    }
                });
                break;
            case "addNewFriend":
                authenticateUser(connection, req, res, function (userId) {
                    var reqbody = req.body;
                    if (reqbody['friendUserName'] != null) {
                        var friendUserName = reqbody['friendUserName'];
                        var querystring = "select Id from users where username = '" + friendUserName + "' limit 1 ";
                        connection.query(querystring, function (err, rows) {
                            if (!err) {
                                var row = rows[0];
                                var requestId = row['Id'];
                                if (requestId != userId) {
                                    var sql = "insert into friends(providerId, requestId, status) values(" + userId + ", " + requestId + ", " + USER_UNAPPROVED.toString() + ") ";
                                    connection.query(sql, function (err, row) {
                                        if (!err) {
                                            out = SUCCESSFUL;
                                            var console_msg = build_console_msg(username, action, null);
                                            send_res(res, out, SUCCESSFUL, console_msg, connection);
                                        }
                                        else {
                                            out = FAILED;
                                            var console_msg = build_console_msg(username, action,err);
                                            send_res(res, out, FAILED, console_msg, connection);
                                        }
                                    });
                                }
                                else {
                                    out = FAILED;
                                    var console_msg = build_console_msg(username, action,"Trying to add himself");
                                    send_res(res, out, FAILED, console_msg, connection);
                                }
                            }
                            else {
                                out = FAILED;
                                var console_msg = build_console_msg(username, action,err);
                                send_res(res, out, FAILED, console_msg, connection);
                            } 
                        });
                    }
                    else {
                        out = FAILED;
                        var console_msg = build_console_msg(username, action, "No request friend name");
                        send_res(res, out, FAILED, console_msg, connection);
                    } 
                });
                break;

            case "responseOfFriendReqs":
                authenticateUser(connection, req, res, function (userId) {
                    var Approve = null;
                    var Discard = null;
                    var reqbody = req.body;
                    if (reqbody['approvedFriends'] != null) {
                        var friendNames = reqbody['approvedFriends'].split(",");
                        var friendNamesQueryPart = "";
                        for (i = 0; i < friendNames.length; i++) {
                            if (i > 0) friendNamesQueryPart += ",";
                            friendNamesQueryPart+="'"+friendNames[i]+"'";
                        }
                        if (friendNamesQueryPart != "") {
                            Approve="update friends set status = "+ USER_APPROVED +
                            " where requestId = "+userId+
                            " and providerId in(select Id from users where username in (" + friendNamesQueryPart + "));";
                        }
                    }
                    if (reqbody['discardedFriends'] != null) {
                        var friendNames = reqbody['discardedFriends'].split(",");
                        var friendNamesQueryPart = "";
                        for (i = 0; i < friendNames.length; i++) {
                            if (i > 0) friendNamesQueryPart += ",";
                            friendNamesQueryPart += "'" + friendNames[i] + "'";
                        }
                        if (friendNamesQueryPart != "") { 
                            Discard = "delete from friends " +
                            "where requestId = " + userId + " and" +
                            " providerId in(select Id from users where username in (" + friendNamesQueryPart + "));";
                        }
                    }
                    if ((Approve != ""?connection.query(Approve):true) && (Discard != ""?connection.query(Discard):true)) {
                        out = SUCCESSFUL;
                        var console_msg = build_console_msg(username, action, null);
                        send_res(res, out, SUCCESSFUL, console_msg, connection);
                    }
                    else {
                        out = FAILED;
                        var console_msg = build_console_msg(username, action, "query error");
                        send_res(res, out, FAILED, console_msg, connection);
                    }
                });
                break;
        }

    });
    //res.send(out.toString());
}


/**
 * Check if a parameter is valid.
 * @param par 
 **/
function check_param(par) { 
    return (par != null && par.length > 0) ? par:'';
}

function build_console_msg(user, action, err_msg) {
    var msg = "[USER]:" + user + "; [ACTION]:" + action;
    if (err_msg != null)
        msg += "; [ERROR]:" + err_msg;
    return msg;

}

function send_res(res,out, sta, console_msg, connection) {
    res.send(out.toString());
    write_console(sta, console_msg);
    if(connection!=null)
        connection.release();
}

app.post("/", function (req,res) {
    if (handle_para(req, res)) {
        handle_action(req, res);
    }
}
);

function authenticateUser(connection,req, res,callback) {
    var querystring = "select * from users where username = '" + username + "' and password = '" + md5(password) + "' limit 1 ";
    var id = null;
    connection.query(querystring, function (err, rows) {
        if (!err) {
            id = rows[0]['Id'];
            if (id > 0) {
                querystring = "update users set authenticationTime = NOW(), IP = '" + req.connection.remoteAddress + "' , port = 15145 where Id = " + rows[0]['Id'] + " limit 1 ";
                connection.query(querystring, function (err, rows) {
                    if (!err) {
                        write_console(SUCCESSFUL, "User :" + username + " Logged in.");
                        callback(id);
                    }
                    else {
                        writer_console(FAILED, ": " + err);
                        res.send(FAILED);
                    }
                });
            }
            else {
                writer_console(FAILED, "User: " + username + " does not exist.");
                res.send(FAILED);
            }
        }
        else {
            writer_console(FAILED, ": " + err);
            res.send(FAILED);
        }
    });
}


write_console(-1,"Server is listening at port " + 9986);
//console.log("Server is listening at port " + 9986);
app.listen(9986);