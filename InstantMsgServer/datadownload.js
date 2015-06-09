var express = require('express');
var app = express();
var fileSystem = require('fs');
var path = require('path');
var http = require('http');

http.createServer(function (req, res) {
    //var filePath = path.join(__dirname, '1024768.jpg');
    var filePath = path.join('c:/server/images',req.headers['filename']);
    var stat = fileSystem.statSync(filePath);
    res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': stat.size
    });
    var readStream = fileSystem.createReadStream(filePath);
    readStream.pipe(res);
    console.log("Send image successfully");
}).listen(9988);
