import React from 'react';
import './UserBar.css';



export class UserBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="user-bar">
                {this.props.user.name}
            </div>
        )
    }
}