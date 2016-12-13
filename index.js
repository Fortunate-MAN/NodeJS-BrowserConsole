var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
require('shelljs/global');

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
    		console.log('message: ' + msg);
		exec(msg, function(status, output){
			if(status == 0)
			{
				io.emit('chat message', output);
			}
			if (status !== 0)
			{
				console.log ('error');
			}
		});
		msg = "$ " + msg;
		io.emit('chat message', msg);
  	});
	socket.on('disconnect', function(){
		io.emit('chat message', 'A user has disconnected.');
		console.log('a user disconnected!');
	});
	
	console.log('a user connected!');
	io.emit('chat message', 'A user has connected.');
});

http.listen(3000, function(){
	console.log('Listening on port 3000.');
});
