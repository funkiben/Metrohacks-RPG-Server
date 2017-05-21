const messages = require("./messages");
const labels = require("./labels");
const GameObject = require("./GameObject");

(function() {

    class TileGameObject extends GameObject {
        
        constructor(world, objectID, type, x, y) {
            super(world, objectID, type, x, y);

            this.width = 20;
            this.height = 20;

        }

        contains(x, y) {
            return  x >= this.x && 
                    x < this.x + this.width && 
                    y >= this.y && 
                    y < this.y + this.height;
        }

        


    }

    module.exports = TileGameObject;

}());
