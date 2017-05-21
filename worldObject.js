const messages = require("./messages");
const labels = require("./labels");

(function() {

    class WorldObject {
        
        constructor(game, type, x, y) {
            this.game = game;
            this.objectID = game.nextObjectID(;
            this.type = type;
            this.x = x;
            this.y = y;
            this.z = 0;
        }

        create() {
            var buf = messages.newMessage(labels.CREATE_OBJECT, 4);

            buf.writeUInt16LE(this.objectID, 2);
            buf.writeUInt8(this.type, 4);
            buf.writeUInt8(this.z , 5);

            this.game.sendToEveryone(buf);

            this.setPosition(this.x, this.y);
        }

        remove() {
            var buf = messages.newMessage(labels.REMOVE_OBJECT, 2);

            buf.writeUInt16LE(this.objectID, 2);
            
            this.game.sendToEveryone(buf);
        }

        setPosition(x, y) {
            for (var m in this.game.walls) {
                if (this.game.walls[m].contains(x, y)) {
                    return;
                }
            }

            this.x = x;
            this.y = y;
            
            var buf = messages.newMessage(labels.OBJECT_POSITION, 10);

            buf.writeUInt16LE(this.objectID, 2);
            buf.writeInt32LE(this.x, 4);
            buf.writeInt32LE(this.y, 8);


            this.game.sendToEveryone(buf);
            
        }

        move(deltaX, deltaY) {
            this.setPosition(this.x + deltaX, this.y + deltaY);
        }


    }

    module.exports = WorldObject;

}());
