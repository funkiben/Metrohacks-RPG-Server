const messages = require("./messages");
const labels = require("./labels");
const AttackableWorldObject = require("./attackableWorldObject");
const objectTypes = require("./objectTypes");
const properties = require("./properties");

(function() {

    class Player extends AttackableWorldObject {

         constructor(objectID, socket, x, y) {
            super(objectID, objectTypes.PLAYER, x, y, properties.MAX_HEALTH);

            this.socket = socket;
            this.name = "no name";

            this.controller = null;
            this.puppet = null;
            
            this.sendID();

         }

         setPuppet(player) {
             this.puppet = puppet;

             var buf = messages.newMessage(labels.SET_PLAYER_PUPPET, this.puppet.name.length);
             
             buf.write(this.puppet.name, 2, this.puppet.name.length, 'utf8');

             this.socket.write(buf);
         }

        setController(player) {
             this.controller = controller;

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

