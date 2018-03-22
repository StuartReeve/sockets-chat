const io = ('./server.js').io;
const { VERIFY_USER, USER_CONNECTED, LOGOUT } = require('../SocketEvents.js');
const { createUser } = require('../Factories');

let connectedUsers = {}

module.exports = function (socket) {
    console.log("Socket ID: ", socket.id);

    //Verify if the username already exists
    socket.on(VERIFY_USER, (name, callback) => {
        console.log("VERIFYING: ", name);
        if (isUser(name)) {
            callback({ user: null, isValid: false });
        }
        else {
            callback({ user: createUser({name, color:""}), isValid: true });
        }
    });

    //Login the user after a verify
    socket.on(USER_CONNECTED, (user) => {
        connectedUsers = addUser(user);
        socket.user = user;
        console.log(connectedUsers);
    });

    //Handle disconnecting of the socket
    socket.on('disconnect',() => {
        console.log('disconnected! ', socket.user);
        connectedUsers = removeUser(socket.user);
    });
}


function isUser(name) {
    return name in connectedUsers;
}

function addUser(user) {
    console.log("adding user");
    let newUserList = Object.assign({}, connectedUsers);
    newUserList[user.name] = user;
    return newUserList;
}

function removeUser(user) {
    let newUserList = Object.assign({}, connectedUsers);
    delete newUserList[user.name];
    return newUserList;
}
