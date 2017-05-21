
(function() {

    var a = {};

    a.OBJECT_POSITION =         30; // 10 bytes: 2 bytes for world object id, 4 for x, 4 for y
	a.CREATE_OBJECT =           31; // 3 bytes: 2 bytes world object id, 1 byte type
	a.REMOVE_OBJECT =           32; // 2 bytes: world object id
    a.SET_HEALTH =              33; // 2 bytes
    a.SET_MAX_HEALTH =          34; // 2 bytes
    a.SET_PLAYER_PUPPET =       35; // string of puppet name
    a.SET_PLAYER_CONTROLLER =   36; // string of controller name
    a.SET_PLAYER_ID =           37; // 2 bytes of world object id

    module.exports = a;



}());