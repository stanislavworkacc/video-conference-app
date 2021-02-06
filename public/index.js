const roomId = document.getElementById('roomId').value;
console.log(roomId);
const socket = io('/');

var myPeer = new Peer(undefined,{
    host: '/',
    port: 3001,
});

myPeer.on('open', id => {
    socket.emit('join-room', roomId, 10);
})

socket.on('user-connected', userId => {
    console.log('User connected: ' + userId)
});