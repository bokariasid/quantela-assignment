quantelaProject.factory('socket',
function ($http, $rootScope, configWebApp, $localStorage) {
    var socket = io.connect(configWebApp.socketUrl);
    return {
        on: function(eventName, callback){
            socket.on(eventName, callback);
        },
        emit: function(eventName, data) {
            socket.emit(eventName, data);
        }
    };
    // return socket;
});