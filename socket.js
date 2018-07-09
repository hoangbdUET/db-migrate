const { FIND_DB_TYPING } = require('./constants/socketEvents')

const configSocket = io => {

    io.on('connection', socket => {
        console.log('socket connected');

        // socket.on(FIND_DB_TYPING, data => {
        //     console.log(data);
        // })

        socket.emit(FIND_DB_TYPING, {msg: 'msg'})
    });


}

module.exports = configSocket;