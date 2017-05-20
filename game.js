
const messages = require("./messages");

(function() {

	const ENTITY_POSITION = 30;
	const NEW_OBJECT = 31;
	const KEY_INPUT = 
	
	class Game {
		
		constructor(player1, player2, player3, player4) {
			this.player1 = player1;
			this.player2 = player2;
			this.player3 = player3;
			this.player4 = player4;
			
			this.players = [player1, player2, player3, player4];

			this.objects = new Array();

			this.objects.push(this.players);
			
		}

		addObject(entityID, typeID) {
			var buf = messages.newMessage(NEW_OBJECT, 3);
			
			buf.writeInt16LE(entityID, 2);
			buf.writeInt8(typeID, 4);
			
			sendToEveryone(buf);	
		}
		
		sendEntityPosition(entityID, x, y) {
			
			entity.x = x;
			entity.y = y;
			
			var buf = messages.newMessage(ENTITY_MOVE, 10);
			
			buf.writeInt16LE(entityID, 2);
			buf.writeInt32LE(x, 4);
			buf.writeInt32LE(y, 8);
			
			sendToEveryoneBut(buf, entity);	
		}
		
		sendToEveryoneBut(buf, player) {
			for (var m in this.players) {
				if (this.players[m] == player) {
					this.players[m].write(buf);
				}
			}
		}
		
		sendToEveryone(buf) {
			for (var m in this.players) {
				this.players[m].write(buf);
			}
		}
		
		
		
		
		
		
		
		
		
		
		
	}
	
	
	module.exports = Game;
	
}());