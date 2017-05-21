(function(){
    const dungeon1Arr;
    
    for(var y=0;y<30;y++){
        for(var x=0;x<40;x++){
            dungeon1Arr.push(new tileWorldObject(game,game.nextObjectID(),2,x,y,False));
        }
    }
    for(var x=0;x<40;x++){
        dungeon1Arr[x].type=3;
        dungeon1Arr[x].isWall=True;
        dungeon1Arr[x+(9*40)].type=3;
        dungeon1Arr[x+(9*40)].isWall=True;
        dungeon1Arr[x+(19*40)].type=3;
        dungeon1Arr[x+(19*40)].isWall=True;
        dungeon1Arr[x+(29*40)].type=3;
        dungeon1Arr[x+(29*40)].isWall=True;
    }
    for(var y=0;y<30*40;y++){
        if(y%40==0){
            dungeon1Arr[y].type=3;
            dungeon1Arr[y].isWall=True;
        }

    }
    dungeon1Arr[19].type=7;
    dungeon1Arr[379].type=4;
    dungeon1Arr[779].type=4;
    for(var element in dungeon1Arr){
        if(dungeon1Arr[element].x==(1||38) && dungeon1Arr[element].y==(13||17)){
            dungeon1Arr[element].type=5;
        }
        if(dungeon1Arr[element].x=(9||29)&&dungeon1Arr[element].y==(23||27)){
            dungeon1Arr[element].type=5;
        }
        if(dungeon1Arr[element].x==19 && dungeon1Arr[element].y==4){
            dungeon1Arr[element].type=6;
        }
    }


    
    class firstDungeon extends Dungeon{
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

        }


    }



}())
