
(function(){
    
    const EventEmitter = require('events');
    class Dungeon{
        
        //objects is just all the objects
        //switchvals is an array of arrays []
        //enemy is some stuff, probably [somestuff] with x and y pos vals
        constructor(objects,switchVals,game,enemies,properties){
            this.objects = objects;
            this.properties=properties;
            this.switchVals = switchVals;
            this.game=game;
            this.enemy=enemy;
            
            
            for(var player in game){
                game[player].socket.messages.on("keyPress",function(data){
                    var key=data.readInt8(0)
                    if(key==32 || key==101){
                        
                        for(var switchpos in switchVals){
                            var xval=switchVals[switchpos].x;
                            var yval=switchVals[switchpos].y;
                            var playerx=game[player].x;
                            var playery=game[player].y;
                            var distance=sqrt(pow((xval-playerx),2)-pow((yval-playery),2));
                            if(distance<properties.PLAYER_RANGE){
                                game.events.emit('switchhit');
                                
                            }
                        

                        }
                        for(var enemy in enemies){
                            var xval=enemies[enemy].x;
                            var yval=enemies[enemy].y;
                            var playerx=game[player].x;
                            var playery=game[player].y;
                            var distance=sqrt(pow((xval-playerx),2)-pow((yval-playery),2));
                            if(distance<properties.PLAYER_RANGE){
                                game.events.emit('enemyhit');
                                
                            }
                        

                        }
                game.events.on("playerMove",function(){
                    for(object in objects){
                        var xval=objects[object].x;
                        var yval=objects[object].y;
                        var playerx=game[player].x;
                        var playery=game[player].y;
                        var distance=sqrt(pow((xval-playerx),2)-pow((yval-playery),2));
                        if(distance<10){
                            game.events.emit('tilehit')
                        }
                    }

                });

                        
                    }


                });
            }
            
        }

        
        }





    module.exports=Dungeon;



}());