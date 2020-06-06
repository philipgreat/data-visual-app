import React, {Component} from 'react';
import moment from "moment";
import "moment/locale/zh-cn"

class Header extends Component {

    constructor(props) {
        super(props)

        this.state = {
            datetime: ''
        }
        moment.locale('zh-cn')
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
                <h1 className="title">优荣代建平台数据大屏</h1>
               
            </div>
        );
    }
}

export default Header;