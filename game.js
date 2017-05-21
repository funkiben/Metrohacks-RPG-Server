
const messages = require("./messages");
const Player = require("./player");

messages.labelRegistry[1] = "keyPressed";

(function() {


	class Game {
		
		constructor(sockets) {
			this.players = [];
			this.objects = [];

			var game = this;
			var player;

			for (var m in sockets) {
				player = this.players[m] = new Player(m, sockets[m], 0, 0);
				this.addObject(player);

				sockets[m].messages.on("keyPressed", function(data) {
					var key = data.readInt8(0);

					if (key == 119) {
						game.sendToEveryone(player.puppet.move(0, labels.PLAYER_SPEED));
					} else if (key == 115) {
						game.sendToEveryone(player.puppet.move(0, -labels.PLAYER_SPEED));
					} else if (key == 97) {
						game.sendToEveryone(player.puppet.move(-labels.PLAYER_SPEED, 0));
					} else if (key == 100) {
						game.sendToEveryone(player.puppet.move(labels.PLAYER_SPEED, 0));
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
			this.sendToEveryone(obj.create());	
		}
		
		removeObject(obj) {
			this.objects.splice(this.objects.indexOf(obj), 1);
			this.sendToEveryone(obj.remove());
		}
		
		sendToEveryone(buf) {
			for (var m in this.players) {
				this.players[m].socket.write(buf);
			}
		}
		
	}
	
	
	module.exports = Game;
	
}());