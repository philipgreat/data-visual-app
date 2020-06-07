import React, {Component} from 'react';
import Bar from "./Bar";
import axios from 'axios';
import http from 'http';
import https from 'https';
import DailyLine from "./DailyLine";
import WeeklyLine from "./WeeklyLine";
import MonthlyLine from "./MonthlyLine";
import YearlyLine from "./YearlyLine";
import Pie from "./Pie";

class Gadget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            selected: false
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
							this.setState({data: JSON.parse(event.data)})
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
        const decideComponent = (data) => {
            if (!data) {
                return null;
            }
            switch (data.type) {
                case 'day':
                    return <DailyLine id={this.props.id} data={this.state.data}/>;
                case 'week':
                    return <WeeklyLine id={this.props.id} data={this.state.data}/>;
                case 'month':
                    return <MonthlyLine id={this.props.id} data={this.state.data}/>;
                case 'year':
                    return <YearlyLine id={this.props.id} data={this.state.data}/>;
                case 'top':
                    return <Bar id={this.props.id} data={this.state.data}/>;
                case 'normal':
                    return <Pie id={this.props.id} data={this.state.data}/>
            }
        }

        return (
            <div id={this.props.id + "-wrap"}
                 className={this.state.selected ? "high-light" : ""}>{decideComponent(this.state.data)}</div>
        );
    }
}

export default Gadget;