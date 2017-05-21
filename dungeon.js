
(function(){
    
    const EventEmitter = require('events');
    class Dungeon{
        
        //objects is just all the objects
        //switchvals is an array of arrays []
        //bosses is a bosses' stats, [its in an array because there can be multiple bosses[switchValsded,boolDed]
        constructor(objects,switchVals,game){
            this.objects = objects;
            this.switchVals = switchVals;
            this.game=game;
            this.events=new EventEmitter();
            var events=this.events
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
                            if(distance<3){
                                events.emit('switchhit');
                                
                            }
                        

                        }
                        
                    }


                });
            }
        }

        
        }





    module.exports=Dungeon;



}());