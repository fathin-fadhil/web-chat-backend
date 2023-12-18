const db = require("../app/model/index")

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

 

    io.on('connection', async (socket) => {
        console.info(`Client connected [id=${socket.id}]`);
        const { room_id, username, public_key } = socket.request._query;

        await db.rooms.findByIdAndUpdate(room_id, {joinedUser: [{
            socket_id: socket.id,
            username: username,
            public_key: public_key
        }]})

        socket.join(room_id);

        io.to(room_id).emit('user_joined', {
            socket_id: socket.id,
            username: username,
            public_key: public_key
        })
        
        socket.on('disconnect', async () => {
            console.info(`Client disconnected [id=${socket.id}]`);
            await db.rooms.updateOne(
                { _id: room_id },
                { $pull: {joinedUser: {socket_id: socket.id}} }
            )

            io.to(room_id).emit('user_left', {
                socket_id: socket.id,
                username: username,
                public_key: public_key
            })
        });
    });
};

exports.sendMessage = (roomId, key, message) => io.to(roomId).emit(key, message);

exports.getRooms = () => io.sockets.adapter.rooms;