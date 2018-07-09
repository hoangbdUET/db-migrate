const app = require('./app');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const config = require('config');
require("./socket")(io);

// io.on('connection', socket => {
//     console.log('socket connect');
// });


server.listen(config.application.port, () => console.log('server started'));