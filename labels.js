
(function() {

    var a = {};

    a.OBJECT_POSITION =         30; // 10 bytes: 2 bytes for world object id, 4 for x, 4 for y
	a.CREATE_OBJECT =           31; // 4 bytes: 2 bytes world object id, 1 byte type, 1 byte z
	a.REMOVE_OBJECT =           32; // 2 bytes: world object id
    a.SET_HEALTH =              33; // 4 bytes: 2 bytes world object id, 2 bytes health
    a.SET_MAX_HEALTH =          34; // 4 bytes: 2 bytes world object id, 2 bytes max health
    a.SET_PLAYER_PUPPET =       35; // string of puppet name
    a.SET_PLAYER_CONTROLLER =   36; // string of controller name
    a.SET_PLAYER_ID =           37; // 2 bytes of world object id

    module.exports = a;

}());