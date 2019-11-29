import React, {Component} from 'react';

class CenterGadget extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="center">
                <div className="content">{this.props.data?this.props.data.value:""}</div>
                <div className="sub-title">{this.props.data?this.props.data.title:""}</div>
            </div>
        );
    }
}

export default CenterGadget;