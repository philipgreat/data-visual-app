import React, {Component} from 'react';
import Map from "./components/Map";
import './css/app.less'
import axios from "axios";
import Header from "./components/Header";
import CenterGadget from "./components/CenterGadget";
import querystring from "query-string";
import "./assets/_locale/index"
import Locale from './assets/_locale/index';
import MonthlyLine from './components/MonthlyLine';
import WeeklyLine from './components/WeeklyLine';
import DailyLine from './components/DailyLine';
import YearlyLine from './components/YearlyLine';
import Pie from "./components/Pie";
import Bar from "./components/Bar";
import http from 'http';
import https from 'https';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            gadgets: []
        }
        this.axios = axios.create({
            timeout: 10000,
            httpAgent: new http.Agent({keepAlive: true}),
            httpsAgent: new https.Agent({keepAlive: true})
        });
        this.platformType = "";
		this.mapDataUrl = "";
        this.projectName = "";
        this.field = "";
        this.count = 0;
    }

    fetchData() {
        const params = querystring.parse(window.location.search);
        this.platformType = params.platformType;
		this.projectName = params.projectName;
        const platformId = params.platformId;
        this.field = params.field;
        const subType = params.subType;
        const urlPrefix = window.origin;
        //const urlPrefix = "http://localhost:8480"
		var ishttps = 'https:' == document.location.protocol ? true : false;
        var url = `${urlPrefix}/queryCombinedData/${this.projectName}/${this.platformType}/${platformId}/${this.field}/${subType}`;
        this.axios.get(url).then(resp => {
            if (resp.status >= 200 && resp.status < 300) {
                if (resp.data) {
					var protocol = "ws://";
					if (ishttps) {
						protocol = "wss://";
					}
                    var ws = new WebSocket(protocol + window.location.hostname + "/wsSend/" + resp.data);
					
					//var ws = new WebSocket("ws://localhost:8580/wsSend/" + resp.data);
                    ws.onmessage = (event)=> {  
                        if ("heartbeat" !== event.data) {
							//console.log(event.data);
                            this.setState({data: JSON.parse(event.data)});
						}
                    };  
                    return;
                }
            }
        }).catch(err => console.error(err));
    }

    componentDidMount() {
        this.fetchData();
    }


    render() {
        var count = 1;    
		//while (!this.state.data.center) {

		//}
        return (
			(
			
            <div className="App">
                <Header title={this.state.data.projectName + ' 数据大屏'}/>
                <Map data={this.state.data.location}/>
                <CenterGadget key="center" data={this.state.data.center}/>
                <DailyLine id={"gadget" + (count++)} key="dailyline" data={this.state.data.day}/>
                <WeeklyLine id={"gadget" + (count++)} key="weeklyline" data={this.state.data.week}/>
                <MonthlyLine id={"gadget" + (count++)} key="monthlyline" data={this.state.data.month}/>
                <YearlyLine id={"gadget" + (count++)} key="yearlyline" data={this.state.data.year}/>
                <Pie id={"gadget" + (count++)} key={"level0Pie"} data={this.state.data.pie0}/>
                <Bar id={"gadget" + (count++)} key={"level0Bar"} data={this.state.data.bar0}/>
                <Pie id={"gadget" + (count++)} key={"level1Pie"} data={this.state.data.pie1}/>
                <Bar id={"gadget" + (count++)} key={"level1Bar"} data={this.state.data.bar1}/>
            </div> 
			)
        );
    }
}

export default App;
