const TileWorldObject = require("./tileWorldObject");
const Dungeon = require("./dungeon");
const objectTypes = require("./objectTypes");

(function(){
    var dungeon1Arr;
    
    for(var y=0;y<30;y++){
        for(var x=0;x<40;x++){
            dungeon1Arr.push(new TileWorldObject(game, game.nextObjectID(), objectTypes.FLOOR, x, y, false));
        }
    }
    for(var x=0;x<40;x++){
        dungeon1Arr[x].type=objectTypes.WALL;
        dungeon1Arr[x].isWall=true;
        dungeon1Arr[x+(9*40)].type=objectTypes.WALL;
        dungeon1Arr[x+(9*40)].isWall=true;
        dungeon1Arr[x+(19*40)].type=objectTypes.WALL;
        dungeon1Arr[x+(19*40)].isWall=true;
        dungeon1Arr[x+(29*40)].type=objectTypes.WALL;
        dungeon1Arr[x+(29*40)].isWall=true;
    }
    for(var y=0;y<30*40;y++){
        if(y%40==0){
            dungeon1Arr[y].type=objectTypes.WALL;
            dungeon1Arr[y].isWall=true;
        }

    }
    dungeon1Arr[19].type=objectTypes.BOSS_DOOR;
    dungeon1Arr[19].type=objectTypes.BOSS_DOOR;
    dungeon1Arr[379].type=objectTypes.PUZZLE_DOOR;
    dungeon1Arr[379].isWall=true;
    dungeon1Arr[779].type=objectTypes.PUZZLE_DOOR;
    dungeon1Arr[779].isWall=true;
    var checkSwitch(var switchVals){
        if(switchVals[0]==1 and switchVals[1]==1 and switchVals[2]==1 and switchVals[3]==1){
            switchVals[4]=1;
            dungeon1Arr[779].isWall=false;
        }
    }
    for(var element in dungeon1Arr){
        if(dungeon1Arr[element].x==(1||38) && dungeon1Arr[element].y==(13||17)){
            dungeon1Arr[element]=new interactableWorldObject(game,dungeon1Arr[element].objectID,5,dungeon1Arr[element].x,dungeon1Arr[element].y,false)
        }
        if(dungeon1Arr[element].x=(9||29)&&dungeon1Arr[element].y==(23||27)){
            dungeon1Arr[element]=new interactableWorldObject(game,dungeon1Arr[element].objectID,5,dungeon1Arr[element].x,dungeon1Arr[element].y,game.events.on('switchhit',checkswitch(switchVals)))
        }
        if(dungeon1Arr[element].x==19 && dungeon1Arr[element].y==4){
                dungeon1Arr[element]=new attackableWorldObject(game,dungeon1Arr[element].objectID,6,dungeon1Arr[element].x,dungeon1Arr[element].y,10)
        }
    }


    
    class FirstDungeon extends Dungeon{
        //type 1 is ground button
        //type 2 is floor
        //type 3 is wall
        //type 4 is puzzledoor
        //type 5 is wall button
        //type 6 is boss
        //type 7 is boss door
        //game.nextObjectID()
        constructor(game){
            super(objects,switchVals,game,enemies);
            this.switchVals = [0,0,0,0,0,0,0,0]
            this.switchVals[0].x=1
            this.switchVals[0].y=13
            this.switchVals[1].x=1
            this.switchVals[1].y=17
            this.switchVals[2].x=38
            this.switchVals[2].y=13
            this.switchVals[3].x=38
            this.switchVals[3].y=17
            this.switchVals[4].x=9
            this.switchVals[4].y=23
            this.switchVals[5].x=9
            this.switchVals[5].y=27
            this.switchVals[6].x=29
            this.switchVals[6].y=23
            this.switchVals[7].x=29
            this.switchVals[7].y=27


        }


    }



}());
