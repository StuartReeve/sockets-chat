const app = require('express')();
var http = require('http').Server(app);
const io = require('socket.io')(http, {wsEngine: 'ws'});
const SocketManager = require('./SocketManager');

const PORT = process.env.PORT || 4000;

app.get('/', function(req, res) {
    res.send({response: "ONLINE"}).status(200);
});

io.on('connection', SocketManager);


http.listen(PORT, () => console.log("Listening on port: 4000"));