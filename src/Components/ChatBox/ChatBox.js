import React from 'react';
import './ChatBox.css';



export class ChatBox extends React.Component {
    constructor(props) {
        super(props);

        //Set up default state
        this.state = {
            messages: [],
            currMessage: ""
        };

        //Set up function binding
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEnterKey = this.handleEnterKey.bind(this);
    }

    componentDidMount() {

    }


    handleInputChange(event) {
        this.setState({currMessage: event.target.value});
    }

    handleEnterKey(event) {
        if (event.key === 'Enter') {
            let messageObject = {author:this.props.username, message:this.state.currMessage};
            console.log(messageObject);
            this.setState({currMessage: ""});
        }
    }

    render() {
        const listItems = this.state.messages.map((messageObj, index) => <pre key={index}>{messageObj.author}: {messageObj.message}</pre>);

        return (
            <div className="chat-box-wrapper">
                <div className="chat-box">
                    <div className="message-list">
                        {listItems}
                    </div>
                    <input type="text" className="message-box" value={this.state.currMessage} onChange={this.handleInputChange} onKeyPress={this.handleEnterKey}/>
                </div>
            </div>
        )
    }
}