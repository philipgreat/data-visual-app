import React, {Component} from 'react';
import moment from "moment";
import "moment/locale/zh-cn"

class Header extends Component {

    constructor(props) {
        super(props)

        this.state = {
            datetime: ''
        }
        moment.locale('en-us')
    }

    tick(){
        this.setState({
            datetime: moment().format('YYYY-MM-DD HH:mm:ss dddd')
        })
    }

    componentWillMount() {
        this.tick()
        this.interval = setInterval(()=>this.tick())
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return (
            <div id="header">
                <h1 className="title">{this.props.title}</h1>
                <span className="clock">{this.state.datetime}</span>
            </div>
        );
    }
}

export default Header;