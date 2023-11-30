let io;

exports.socketConnection = (server) => {
    const socket = require("socket.io");

    io = socket(server, {
        cors: "*",
        serveClient: false,  
        transports: [ 'websocket' , 'polling'], 
        pingInterval: 25000,
        pingTimeout: 15000,
        cookie: false,
    });

 

    io.on('connection', (socket) => {
        console.info(`Client connected [id=${socket.id}]`);
        
        socket.join(socket.request._query.room_id);
                     
        socket.on('disconnect', () => {
            console.info(`Client disconnected [id=${socket.id}]`);
        });
    });
};

exports.sendMessage = (roomId, key, message) => io.to(roomId).emit(key, message);

exports.getRooms = () => io.sockets.adapter.rooms;