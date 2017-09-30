var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    fs = require("fs");
const fileUpload = require('express-fileupload');

app.use(bodyParser.urlencoded({extends: true}));
app.use(bodyParser.json());
app.use(fileUpload());

var ern = fs.readFileSync("config.cfg", "utf8");
var apikey = ern;

var info = {
    'apikey' : apikey,
}

app.get("/", function (req, res) {
    res.render('index.ejs', { info: info });
});

app.post("/upload", function (req, res) {
    var apikeyd = req.body.keyd;
    fs.writeFile("config.cfg", apikeyd, function(error){
        if(error) throw error; // если возникла ошибка
        console.log("Запись файла завершена.");
    });
    console.log(apikeyd);
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    var sampleFile = req.files.sampleFile;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('file.txt', function(err) {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded!');
    });
});

app.listen(3000, function () {
    console.log("Start at port 3000");
});