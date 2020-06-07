import React, {Component} from 'react';

class CenterGadget extends Component {

    constructor(props) {
        super(props)
        this.state = {
            content: ""
        }

    }

    render() {
        return (
            <div id="center">
                <div className="content">{this.props.data}</div>
                <div className="sub-title">{this.props.title}</div>
            </div>
        );
    }
}

export default CenterGadget;