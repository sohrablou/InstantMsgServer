var express = require("express");
var multer = require('multer');
var app = express();
var done = false;
var hashcode = "";

app.use(multer({
    //dest: './images/',
    dest: 'c:/server/images/',
    rename: function (fieldname, filename,req) {
        
        return filename;
    },
    onFileUploadStart: function (file, req, res) {
        var checksum = req.headers['checksum'];
        if (checksum == file.originalname.split('.')[0]) {
            console.log(file.originalname + ' is starting ..');
        }
        else { 
            return false;
        }
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to ' + file.path);
        done = true;
    }
}));

app.get('/', function (req, res) {
    res.sendfile("./views/index.html");
});

app.post('/', function (req, res) {
    if (done == true) {
        console.log(req.files);
        res.send("success");
    }
    else {
        res.send("fail");
    }
});

app.listen(9987, function () {
    console.log("working on port 9987");
})