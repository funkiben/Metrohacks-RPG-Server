const messages = require("./messages");
const labels = require("./labels");
const WorldObject = require("./worldObject");

(function() {

    class InteractableWorldObject extends WorldObject {
        
        constructor(objectID, type, x, y, action) {
            super(objectID, type, x, y);

            this.action = action;

        }
        
    }

    module.exports = InteractableWorldObject;

}());
