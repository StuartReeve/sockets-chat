import React from 'react';
import './App.css';
import { UserBar } from "./UserBar/UserBar";
import { RoomList } from "./RoomList/RoomList";
import { ChatBox } from "./ChatBox/ChatBox";
import { UserSetup } from "./UserSetup/UserSetup";
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT } from '../SocketEvents.js';

const socketUrl = 'localhost:4000';

export class App extends React.Component {
    constructor(props) {
        super(props);

        //Default state
        this.state = {
            socket: null,
            user: {}
        };
    }

    componentWillMount() {
        this.createSocket();
    }

    createSocket = () => {
        const socket = io(socketUrl);
        socket.on('connect', () => {
            console.log('connected');
        })
        this.setState({ socket });
    }

    logoutSocket = () => {
        const { socket } = this.state;
        this.setState({ user: null });
        socket.emit(LOGOUT);
    }


    setUsername = (user) => {
        console.log("Setting user");
        const {socket} = this.state;  
        socket.emit(USER_CONNECTED, user);
        this.setState({user});    
        
    }


    render() {
        const needsUserName = !this.state.user.name;

        const mainContent = needsUserName ? <UserSetup socket={this.state.socket} setUsername={this.setUsername} /> : <ChatBox username={this.state.user} />;

        return (
            <div className="app">
                <UserBar user={this.state.user} />
                <div className="chat-container">
                    <RoomList />
                    {mainContent}
                </div>
            </div>
        )
    }
}