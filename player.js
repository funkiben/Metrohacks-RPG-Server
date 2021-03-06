const messages = require("./messages");
const labels = require("./labels");
const WorldObject = require("./worldObject");
const objectTypes = require("./objectTypes");
const properties = require("./properties");

(function() {

    class Player extends WorldObject {

         constructor(game, socket, x, y) {
            super(game, objectTypes.PLAYER, x, y);

            this.z = 1;

            this.socket = socket;
            this.name = "no name";

            this.controller = null;
            this.puppet = null;

         }

         setPuppet(player) {
             this.puppet = player;

             var buf = messages.newMessage(labels.SET_PLAYER_PUPPET, this.puppet.name.length);
             
             buf.write(this.puppet.name, 2, this.puppet.name.length, 'utf8');

             this.socket.write(buf);
         }

        setController(player) {
             this.controller = player;

             var buf = messages.newMessage(labels.SET_PLAYER_CONTROLLER, this.controller.name.length);
             
             buf.write(this.controller.name, 2, this.controller.name.length, 'utf8');

             this.socket.write(buf);
         }

         sendID() {
             var buf = messages.newMessage(labels.SET_PLAYER_ID, 2);

             buf.writeUInt16LE(this.objectID, 2);

             this.socket.write(buf);
         }

    }


    module.exports = Player;

}());

