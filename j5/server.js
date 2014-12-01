var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var ev = require('./event');

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

server.listen(port);

var maxX = 640;
var maxY = 400;
var pos = {
	x: maxX / 2,
	y: maxY / 2
};


var randomPoint = function(max) {

	var num = Math.floor(Math.random() * max) + 1;

	return Math.ceil(num / 10) * 10;

};

var winningPoint = {};

var newPoints = function() {

	var points = [{
		color: 'blue',
		win: false,
		x: randomPoint(maxX - 20),
		y: randomPoint(maxY - 20),
	}, {
		color: 'green',
		win: false,
		x: randomPoint(maxX - 20),
		y: randomPoint(maxY - 20),

	}];

	var winIn = Math.floor(Math.random() * 2);

	points[winIn].win = true;

	winningPoint = points[winIn];

	console.log( winningPoint.color );

	ev.emit('winColor', winningPoint.color);

	return points;
};

var points = newPoints();

var clients = 0;

io.on('connection', function (socket) {

	socket.emit('pos', pos);
	socket.emit('points', points);
	clients++;
	io.sockets.emit('clients', clients);

	socket.on('chat', function(msg) {
		io.sockets.emit('chat', msg);
	});

	socket.on('chat', function(msg) {

		msg = msg.trim().toLowerCase();

		if ( msg === 'up' ) {
			pos.y = pos.y - 10;
		}
		else if ( msg === 'down' ) {
			pos.y = pos.y + 10;
		}
		else if ( msg === 'left' ) {
			pos.x = pos.x - 10;
		}
		else if ( msg === 'right' ) {
			pos.x = pos.x + 10;
		}

		if ( pos.y < 0 ) {
			pos.y = 0;
		} else if ( pos.y > maxY ) {
			pos.y = maxY;
		}

		if ( pos.x < 0 ) {
			pos.x = 0;
		} else if ( pos.x > maxX ) {
			pos.x = maxX;
		}

		if ( pos.x === winningPoint.x && pos.y === winningPoint.y ) {
			points = newPoints();
			io.sockets.emit('points', points);
		}

		io.sockets.emit('pos', pos);

	});

	socket.on('disconnect', function () {
		clients--;
		io.sockets.emit('clients', clients);
	});

});
