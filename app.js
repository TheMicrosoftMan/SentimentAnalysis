let express = require("express");
let app = express();

app.set("view engine", "ejs");
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/views'));

let server = app.listen(app.get('port'));

var socket = require('socket.io');

let Sentiment = require('sentiment');
let sentiment = new Sentiment();


app.get("/", function (req, res) {
    res.render("index", {
        content: "Модуль аналізу текстів для визначення емоцінального контексту"
    });
});

var io = socket(server);
io.on('connection', function (socket) {
    console.log("connected");
    socket.on('text', function (data) {
        let result = sentiment.analyze(data.text);
        console.log("Text: " + data.text + " Score: " + result.score);
        socket.emit("textStyle", {
            text: data.text,
            mark: result
        })
    });
});