const messages = require("./messages");
const labels = require("./labels");
const WorldObject = require("./WorldObject");

(function() {

    class TileWorldObject extends WorldObject {
        
        constructor(game, type, x, y, isWall) {
            super(game, type, x, y);

            this.isWall = isWall;
            this.width = 40;
            this.height = 40;

        }

        contains(x, y) {
            return  x >= this.x && 
                    x < this.x + this.width && 
                    y >= this.y && 
                    y < this.y + this.height;
        }

        


    }

    module.exports = TileWorldObject;

}());
