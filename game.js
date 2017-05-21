
const messages = require("./messages");
const EventEmitter = require("events");
const Player = require("./player");
const labels = require("./labels");
const TileWorldObject = require("./tileWorldObject");
const properties = require("./properties");

messages.labelRegistry[1] = 'keyPressed';

(function() {


	class Game {
		
		constructor(sockets) {
			this.events = new EventEmitter();

			this.players = [];
			this.objects = [];
			this.walls = [];

			this.objectIDs = 0;

			var game = this;
			
			for (var m in sockets) {
				this.players[m] = new Player(this, this.nextObjectID(), sockets[m], 0, 0);
			}

			for (var m in this.players) {
				const player = this.players[m];
				this.addObject(player);
				player.sendID();

				sockets[m].messages.on("keyPressed", function(data) {
					var key = data.readInt8(0);
					
					if (key == 119) {
						player.puppet.move(0, -properties.PLAYER_SPEED);
					} else if (key == 115) {
						player.puppet.move(0, properties.PLAYER_SPEED);
					} else if (key == 97) {
						player.puppet.move(-properties.PLAYER_SPEED, 0);
					} else if (key == 100) {
						player.puppet.move(properties.PLAYER_SPEED, 0);
					}

				});

			}

			for (var m in this.players) {

				if (m == 0) {
					this.players[m].setPuppet(this.players[this.players.length - 1]);
				} else {
					this.players[m].setPuppet(this.players[m - 1]);
				}

				this.players[m].setController(this.players[(m + 1) % this.players.length]);
			}
			
		}

		addObject(obj) {
			this.objects.push(obj);
			obj.create();
            
			if (obj instanceof TileWorldObject) {
				if (obj.isWall) {
					this.walls.push(obj);
				}
			}
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

		nextObjectID() {
			return this.objectIDs++;
		}
		
	}
	
	
	module.exports = Game;
	
}());