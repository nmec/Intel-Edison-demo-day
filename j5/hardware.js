var five = require('johnny-five'),
	board = new five.Board({
		repl: false
	});

var ev = require('./event');

var winColor;

ev.once('winColor', function(color) {
	winColor = color;
});

board.on('ready', function() {

	var led = {
		green: new five.Led(13),
		blue: new five.Led(12),
	};

	led[winColor].on();

	ev.on('winColor', function(color) {

		led.green.off();
		led.blue.off();

		setTimeout(function() {
			led[color].on();
		}, 1000);

	});

});