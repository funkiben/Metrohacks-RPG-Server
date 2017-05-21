const messages = require("./messages");
const labels = require("./labels");
const InteractableWorldObject = require("./interactableWorldObject");

(function() {

    class AttackableWorldObject extends InteractableWorldObject {
        
        constructor(game, objectID, type, x, y, maxHealth) {
            super(game, objectID, type, x, y, null);
            
            this.setHealth(maxHealth);
            this.setMaxHealth(maxHealth);

            var w = this;
            this.action = function(dmg) {
                w.setHealth(w.health - dmg);
            }
        }

        attack(dmg) {
            this.setHealth(this.health - dmg);
        }

        setHealth(health) {
            this.health = health;

            var buf = messages.newMessage(labels.SET_ENTITY_HEALTH, 4);
            buf.writeUInt16LE(this.objectID, 2);
            buf.writeUInt16LE(this.health, 4);

            this.game.sendToEveryone(buf);
        }

        setMaxHealth(maxHealth) {
            this.maxHealth = maxHealth;

            var buf = messages.newMessage(labels.SET_ENTITY_MAX_HEALTH, 4);

            buf.writeUInt16LE(this.objectID, 2);
            buf.writeUInt16LE(this.maxHealth, 4);

            this.game.sendToEveryone(buf);
        }


    }

    module.exports = AttackableWorldObject;

}());
