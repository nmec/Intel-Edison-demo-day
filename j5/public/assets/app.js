$(function(){

	var socket = io.connect( location.href );

	var $clients = $('#clients');
	var $canvas = $('#canvas');
	var $player =  $('#player');
	var $chatLog = $('#chat-history');
	var $form = $('#chat-input');
	var $input = $form.find('input');

	socket.on('pos', function (pos) {
		$player.animate({
			left: pos.x,
			top: pos.y,
		}, 'fast');
	});

	socket.on('clients', function(numClients) {
		$clients.text( numClients + ' connected' );
	});

	socket.on('chat', function(msg) {
		var $line = $('<div class="msg"></div>');
		$line.text(msg);
		$chatLog.append( $line );

		var height = $chatLog[0].scrollHeight;
		$chatLog.scrollTop(height);
	});

	socket.on('points', function(points) {

		$('.point').remove();

		points.forEach(function(point) {

			var $point = $('<div class="point"></div>');
			$point.css({
				left: point.x,
				top: point.y,
				background: point.color
			});

			$canvas.append( $point );
		});

	});

	$form.on('submit', function(e) {
		e.preventDefault();

		var text = $input.val();

		socket.emit('chat', text);

		$input.val('');
	});


});