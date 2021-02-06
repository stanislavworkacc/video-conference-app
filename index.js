const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server)
const ExpressPeerServer = require('peer').ExpressPeerServer;
const exphbs = require('express-handlebars')
const chatRouter = require('./routes/chat');

const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
});

const options = {
    debug: true
}

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static('public'))

app.use('/', chatRouter);
app.use('/peerjs', ExpressPeerServer(server, options));

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        console.log(roomId, userId)
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', userId);
    })
})

server.listen(PORT, () => {
    console.log(`The server was running on the ${PORT} port`)
})

