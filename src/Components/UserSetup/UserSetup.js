import React from 'react';
import './UserSetup.css';
import { VERIFY_USER } from '../../SocketEvents.js';

export class UserSetup extends React.Component {
    constructor(props) {
        super(props);

        //Default state
        this.state = {
            name: "",
            error: ""
        };
    }

    setUser = ({ user, isValid }) => {
        console.log(user, isValid);
        if(isValid) {
            this.props.setUsername(user);
        }
        else {
            this.setState({error: "Name already taken!"});
        }
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.submitName();
        }
    }

    handleInputChange = (event) => {
        this.setState({ name: event.target.value });
    }

    submitName = () => {
        if (this.state.name !== "") {
            const { socket } = this.props;
            const { name } = this.state;
            socket.emit(VERIFY_USER, name, this.setUser);
        }
        else {
            this.setState({error: "You need a name"});
        }
    }

    render() {
        return (
            <div className="user-setup-wrapper">
                <div className="user-setup">
                    <input type="text" className="user-name-input" name="user-name-input" placeholder="Username"
                        value={this.state.name} onChange={this.handleInputChange} onKeyPress={this.handleKeyPress} />
                        <div class="user-name-error">
                            {this.state.error}
                        </div>
                </div>
                <button className="user-name-submit" onClick={this.submitName}>Submit</button>

            </div>
        )
    }
}
