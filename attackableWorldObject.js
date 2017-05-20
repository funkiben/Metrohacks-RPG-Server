const messages = require("./messages");
const labels = require("./labels");
const InteractableWorldObject = require("./interactableWorldObject");

(function() {

    class AttackableWorldObject extends InteractableWorldObject {
        
        constructor(objectID, type, x, y, maxHealth) {
            super(objectID, type, x, y, this.attack);

            this.health = maxHealth;
            this.maxHealth = maxHealth;
        }

        attack(dmg) {
            return this.setHealth(this.health - dmg);
        }

        setHealth(health) {
            this.health = health;

            var buf = messages.newMessage(labels.SET_ENTITY_HEALTH, 2);

            buf.writeUInt16LE(this.health, 2);

            return buf;
        }

        setMaxHealth(maxHealth) {
            this.maxHealth = maxHealth;

            var buf = messages.newMessage(labels.SET_ENTITY_MAX_HEALTH, 2);

            buf.writeUInt16LE(this.maxHealth, 2);

            return buf;
        }


    }

    module.exports = AttackableWorldObject;

}());
