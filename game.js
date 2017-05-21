
const messages = require("./messages");
const EventEmitter = require("events");
const Player = require("./player");

messages.labelRegistry[1] = "keyPressed";

(function() {


	class Game {
		
		constructor(sockets) {
			this.events = new EventEmitter();

			this.players = [];
			this.objects = [];
			this.wall = [];

			var game = this;
			var player;

			for (var m in sockets) {
				player = this.players[m] = new Player(this, m, sockets[m], 0, 0);
				this.addObject(player);

				sockets[m].messages.on("keyPressed", function(data) {
					var key = data.readInt8(0);

					if (key == 119) {
						player.puppet.move(0, labels.PLAYER_SPEED);
					} else if (key == 115) {
						player.puppet.move(0, -labels.PLAYER_SPEED);
					} else if (key == 97) {
						player.puppet.move(-labels.PLAYER_SPEED, 0);
					} else if (key == 100) {
						player.puppet.move(labels.PLAYER_SPEED, 0);
					}

				});

			}

			for (var m in this.players) {
				this.players[m].setController(this.players[(m + 1) % this.players.length]);
				this.players[m].setPuppet(this.players[(m - 1) % this.players.length]);
			}
			
		}

		addObject(obj) {
			this.objects.push(obj);
			obj.create();	
		}
		
		removeObject(obj) {
			this.objects.splice(this.objects.indexOf(obj), 1);
			obj.remove();
		}
		
		sendToEveryone(buf) {
			for (var m in this.players) {
				this.players[m].socket.write(buf);
			}
		}
		
	}
	
	
	module.exports = Game;
	
}());