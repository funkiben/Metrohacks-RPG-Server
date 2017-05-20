const messages = require("./messages");
const labels = require("./labels");

(function() {

    class WorldObject {
        
        constructor(objectID, type, x, y) {
            this.objectID = objectID;
            this.type = type;
            this.x = x;
            this.y = y;
        }

        create() {
            var buf = messages.newMessage(labels.CREATE_OBJECT, 3);

            buf.writeUInt16LE(this.objectID, 2);
            buf.writeUInt8(this.type, 4);

            return buf;
        }

        remove() {
            var buf = messages.newMessage(labels.REMOVE_OBJECT, 2);

            buf.writeUInt16LE(this.objectID, 2);
            
            return buf;
        }

        setPosition(x, y) {
            this.x = x;
            this.y = y;

            var buf = messages.newMessage(labels.OBJECT_POSITION, 8);

            buf.writeUInt16LE(this.objectID, 2);
            buf.writeInt32LE(this.x, 4);
            buf.writeInt32LE(this.y, 8);


            return buf;
            
        }

        move(deltaX, deltaY) {
            return this.setPosition(this.x + deltaX, this.y + deltaY);
        }


    }

    module.exports = WorldObject;

}());
