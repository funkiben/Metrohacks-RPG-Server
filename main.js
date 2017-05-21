
const net = require("net");
const EventEmitter = require("events");
const messages = require("./messages");

var clients = new Array();

var server = net.createServer(function (socket) {
	console.log("client connected");
	
	clients.push(socket);
	
	socket.name = "no name!";
	
	socket.messages = new EventEmitter();
	
	socket.on("data", function(data) {
		messages.call(socket.messages, data);
	});
	
	socket.on("end", function() {
		console.log("client disconnected: " + socket.name);
	});
	
	
	
	if (clients.length == 2) {
		
		new Game(clients);
		
		clients = [];
		
	}
	
	
	
});


server.listen(8080, function() {
	console.log("server is listening");
});
















