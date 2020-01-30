const express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    port = process.env.PORT || 8080;
server.listen(port);
console.log('Server is running!');

// routing
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

require('./socket')(io);