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
                <h1 className="title" style={{fontSize:"60px"}}>小黄龙回收供应链数据</h1>
                <span className="clock" style={{position:"absolute",top:0,right:0,fontSize:"10px"}}>{this.state.datetime}</span>
                <span><img 
                    src='https://demo.doublechaintech.com/_yourong/images/logo-icon.png/' 
                    width="40px" 
                    style={{position:"absolute",top:0,left:20}}
                /></span>

            </div>
        );
    }
}

export default Header;