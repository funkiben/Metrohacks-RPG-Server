
const messages = require("./messages");
const EventEmitter = require("events");
const Player = require("./player");
const labels = require("./labels");
const TileWorldObject = require("./tileWorldObject");
const SwitchWorldObject = require("./switchWorldObject");
const properties = require("./properties");
const objectTypes = require("./objectTypes");

messages.labelRegistry[1] = 'keyPressed';

(function() {

	const WIDTH = 15;
	const HEIGHT = 15;

	class Game {
		
		constructor(sockets) {
			this.events = new EventEmitter();

			this.objects = [];
			this.players = [];
			this.walls = [];
			this.switches = [];

			this.objectIDs = 0;

			var game = this;
			
			for (var m in sockets) {
				this.players[m] = new Player(this, sockets[m], 100, 100);
			}

			for (var m in this.players) {
				const player = this.players[m];
				this.addObject(player);

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
					} else if (key == 32 || key == 101) {

						var switchX, switchY, distanceSqr;

						for (var j in game.switches) {

                            switchX = game.switches[j].x;
                            switchY = game.switches[j].y;
							
                            distanceSqr = Math.pow(switchX - player.x, 2) + Math.pow(switchY - player.y, 2);

                            if (distanceSqr * distanceSqr < properties.PLAYER_RANGE * properties.PLAYER_RANGE) {
                                
								game.switches[j].setState(true);
								game.check();


                            }
                        

                        }

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

				this.players[m].sendID();
			}

			var obj;
            for (var y = 0; y < WIDTH; y++) {
                for (var x = 0; x < HEIGHT; x++) {
                    obj = new TileWorldObject(this, objectTypes.FLOOR, x * 80, y * 80, false)
					
					if (x == 0 || x == WIDTH - 1 || y == 0 || y == HEIGHT - 1) {
						obj.isWall = true;
						obj.type = objectTypes.WALL;
					}

					this.addObject(obj);

                }
			}

            for (var i = 0; i < 4; i++) {
                this.addObject(new SwitchWorldObject(this, Math.random() * WIDTH * 80, Math.random() * HEIGHT * 80));

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

			if (obj instanceof SwitchWorldObject) {
				this.switches.push(obj);
			}
		}

		check() {
			for (var m in this.switches) {
				if (!this.switches[m].state) {
					return;
				}
			}

			for (var m in this.switches) {
				this.switches[m].setState(false);
				this.switches[m].setPosition(Math.random() * WIDTH * 80, Math.random() * HEIGHT * 80);
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