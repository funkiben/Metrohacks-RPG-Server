
const messages = require("./messages");
const labels = require("./labels");
const TileWorldObject = require("./tileWorldObject");

(function() {

    class SwitchWorldObject extends TileWorldObject {
        
        constructor(game, objectID, type, x, y) {
            super(game, objectID, type, x, y, false);

            this.state = false;

        }

        
    }

    module.exports = SwitchWorldObject;

}());
