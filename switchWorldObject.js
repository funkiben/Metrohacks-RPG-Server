const WorldObject = require("./worldObject");
const messages = require("./messages");
const labels = require("./labels");

(function() {

    class SwitchWorldObject extends WorldObject {
        
        constructor(game, type, x, y) {
            super(game, type, x, y);

            this.state = false;

        }

        setState(state) {
            this.state = state;

            var buf = messages.newMessage(labels.SET_SWITCH, 3);

            buf.writeUInt16LE(this.objectID, 2);
            buf.writeInt8(state, 4);

            game.sendToEveryone(buf); 
        }

        
    }

    module.exports = SwitchWorldObject;

}());
