
const net = require("net");
const EventEmitter = require("events");
const messages = require("./messages");

var server = net.createServer(function (socket) {
	console.log("client connected");
	
	socket.name = "no name!";
	
	socket.messages = new EventEmitter();
	
	socket.on("data", function(data) {
		messages.call(socket.messages, data);
	});
	
	socket.on("end", function() {
		console.log("client disconnected: " + socket.name);
	});
});


server.listen(8080, function() {
	console.log("server is listening");
});