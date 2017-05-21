
(function(){
    
    const EventEmitter = require('events');
    const properties= require('./properties');
    class Dungeon{
        
        //objects is just all the objects
        //switchvals is an array of arrays []
        //enemy is some stuff, probably [somestuff] with x and y pos vals
        constructor(objects,switchVals,game,enemies){
            this.objects = objects;
            this.switchVals = switchVals;
            this.game=game;
            this.enemy=enemy;
            
            
            for(var player in game){
                game[player].socket.messages.on("keyPress",function(data){
                    var key=data.readInt8(0)
                    if(key==32 || key==101){
                        
                        for(var switchpos in switchVals){
                            var xval=switchVals[switchpos].x*20;
                            var yval=switchVals[switchpos].y*20;
                            var playerx=game[player].x*20;
                            var playery=game[player].y*20;
                            var distance=sqrt(pow((xval-playerx),2)-pow((yval-playery),2));
                            if(distance<properties.PLAYER_RANGE){
                                game.events.emit('switchhit');
                                
                            }
                        

                        }
                        for(var enemy in enemies){
                            var xval=enemies[enemy].x*20;
                            var yval=enemies[enemy].y*20;
                            var playerx=game[player].x*20;
                            var playery=game[player].y*20;
                            var distance=sqrt(pow((xval-playerx),2)-pow((yval-playery),2));
                            if(distance<properties.PLAYER_RANGE){
                                game.events.emit('enemyhit');
                                
                            }
                        

                        }
                game.events.on("playerMove",function(){
                    for(object in objects){
                        var xval=objects[object].x*20;
                        var yval=objects[object].y*20;
                        var playerx=game[player].x*20;
                        var playery=game[player].y*20;
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