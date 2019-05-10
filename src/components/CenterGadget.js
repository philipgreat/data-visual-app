import React, {Component} from 'react';
import axios from "axios/index";
import http from 'http';
import https from 'https';
import numeral from "numeral";

class CenterGadget extends Component {

    constructor(props) {
        super(props)
        this.state = {
            content: ""
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
                if (resp.data) {
                    var urlPrefix = window.origin;
					var source=new EventSource(urlPrefix + "/send/" + resp.data);
					source.onmessage=((event) =>{
						if ("heartbeat" != event.data) {
							this.setState({content: event.data})
						}
					});
                    return;
                }
            }
        }).catch(err => console.error(err));
    }
    componentWillMount() {
        this.fetchData()
    }

    render() {
        return (
            <div id="center">
                <div className="content">{this.state.content}</div>
                <div className="sub-title">{this.props.title}</div>
            </div>
        );
    }
}

export default CenterGadget;