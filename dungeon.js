
(function(){
    
    class Dungeon{
        //objects is just all the objects
        //switchvals is an array of functions, indexes identify what they are and functions show which values to change
        //bosses is a bosses' stats, [its in an array because there can be multiple bosses[switchValsded,boolDed]
        constructor(objects,switchVals,bosses){
            this.bosses = bosses;
            this.objects = objects;
            this.switchVals = switchVals;
        }
        changeSwitchVal(switchindex){
            switchVals[switchindex]!=switchVals[switchindex];
        }
        changeBossStatus(boss,switchVals){
            if(switchVals==boss[0]){
                boss[1]=true;
            }
        }





    }




}());