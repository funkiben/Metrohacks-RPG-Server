const messages = require("./messages");
const labels = require("./labels");
const WorldObject = require("./worldObject");

(function() {

    class InteractableWorldObject extends WorldObject {
        
        constructor(game, objectID, type, x, y, action) {
            super(game, objectID, type, x, y);

            this.action = action;

        }
        
    }

    module.exports = InteractableWorldObject;

}());
