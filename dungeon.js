
const properties= require('./properties');

(function() {
    
    
    class Dungeon {
        
        constructor(objects, switches, game, enemies) {
            this.objects = objects;
            this.switches = switches;
            this.game = game;
            this.enemy = enemy;
            
            var switchX, switchY, playerX, playerY, distanceSqr;
            
            for (var i in game.players) {

                game[i].socket.messages.on("keyPress", function(data) {

                    var key = data.readInt8(0);

                    if (key == 32 || key == 101) {
                        
                        for (var j in switches) {

                            switchX = switches[j].x;
                            switchY = switchVals[j].y;
                            playerX = game[i].x;
                            playerY = game[i].y;

                            distanceSqr = pow(switchX - playerX, 2) + pow(switchY - playerY, 2);

                            if (distanceSqr * distanceSqr < properties.PLAYER_RANGE * properties.PLAYER_RANGE) {
                                game.events.emit('switchInteraction', game[i], switches[j]);
                            }
                        

                        }
                        
                    }


                });
            }
            
        }

        
        }





    module.exports=Dungeon;



}());