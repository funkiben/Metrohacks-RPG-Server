const messages = require("./messages");
const labels = require("./labels");
const InteractableWorldObject = require("./interactableWorldObject");

(function() {

    class AttackableWorldObject extends InteractableWorldObject {
        
        constructor(world, objectID, type, x, y, maxHealth) {
            super(world, objectID, type, x, y, this.attack);

            world.sendToEveryone(this.setHealth(health));
            world.sendToEveryone(this.setMaxHealth(maxHealth));
        }

        attack(dmg) {
            this.setHealth(this.health - dmg);
        }

        setHealth(health) {
            this.health = health;

            var buf = messages.newMessage(labels.SET_ENTITY_HEALTH, 4);
            buf.writeUInt16LE(this.objectID, 2);
            buf.writeUInt16LE(this.health, 4);

            this.world.sendToEveryone(buf);
        }

        setMaxHealth(maxHealth) {
            this.maxHealth = maxHealth;

            var buf = messages.newMessage(labels.SET_ENTITY_MAX_HEALTH, 4);

            buf.writeUInt16LE(this.objectID, 2);
            buf.writeUInt16LE(this.maxHealth, 4);

            this.world.sendToEveryone(buf);
        }


    }

    module.exports = AttackableWorldObject;

}());
