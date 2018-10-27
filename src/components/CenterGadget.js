import React, {Component} from 'react';
import axios from "axios/index";
import http from 'http';
import https from 'https';
import numeral from "numeral";
import Locale from "../assets/_locale";

class CenterGadget extends Component {

    constructor(props) {
        super(props)
        this.state = {
            content: {}
        }

        this.axios = axios.create({
            timeout: 10000,
            httpAgent: new http.Agent({keepAlive: true}),
            httpsAgent: new https.Agent({keepAlive: true})
        });
    }

    fetchData() {
        this.axios.get(this.props.url).then(resp => {
            if (resp.status >= 200 && resp.status < 300) {
                this.setState({content: resp.data});
            }
        }).catch(err => console.error(err));
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    componentWillMount() {
        this.fetchData()
        this.interval = setInterval(() => this.fetchData(), 1000)
    }

    render() {
		var res = [];
		if (this.state.content) {
			for (var i=0; i<this.state.content.length; i++){
				var value = "";
				this.state.content[i].data.forEach((ele,index)=>{
					value = value + ele + "|";
				});
				res.push(<div className="content">{value}</div>);
				res.push(<div className="sub-title">{Locale.i18nRaw(this.state.content[i].name)}</div>);
			}
		}
        return (
            <div id="center">
			
			{res}
            </div>
        );
    }
}

export default CenterGadget;