import React, {Component} from 'react';
import Map from "./components/Map";
import './css/app.less'
import axios from "axios";
import Gadget from "./components/Gadget";
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
        const projectName = params.projectName;
        const urlPrefix = window.origin;
        var url = `${urlPrefix}/queryCombinedData/${this.projectName}/${this.platformType}/${platformId}/${this.field}/${subType}`;
        this.axios.get(url).then(resp => {
            if (resp.status >= 200 && resp.status < 300) {
                if (resp.data) {
                    var urlPrefix =  window.origin;
					var source=new EventSource(urlPrefix + "/send/" + resp.data);
					source.onmessage=((event) =>{
						if ("heartbeat" != event.data) {
                            this.setState({data: JSON.parse(event.data)});
                           // alert(3);
						}
					});
                    return;
                }
            }
        }).catch(err => console.error(err));
    }

    componentDidMount() {
        this.fetchData();


        //alert(this.state.data.center);
        //gadgets.push(<CenterGadget key="center" title={Locale.i18n(this.field,'entity','','')} data={this.state.data.center}/>);

        // 当日和前一日线性图
       
        //gadgets.push(<DailyLine id={"gadget" + (count++)} key="dailyline" data={this.state.data.day}/>);
        // 本周和前一周线性图
       
        //gadgets.push(<WeeklyLine id={"gadget" + (count++)} key="weeklyline" data={this.state.data.week}/>);
        // 本月和上月线性图
        
        //gadgets.push(<MonthlyLine id={"gadget" + (count++)} key="monthlyline" data={this.state.data.month}/>);
        // 今年和去年线性图
        
       // gadgets.push(<YearlyLine id={"gadget" + (count++)} key="yearlyline" data={this.state.data.year}/>);

        // client.get(`${urlPrefix}/queryPath/${projectName}/${this.platformType}/${subType}`).then(resp => {
        //     const types = resp.data
        //     if (types.length > 0) {
        //         for (let i = 0; i < types.length; i++) {
		// 			if (i  >= 1) {
        //                 break;
        //             }
        //             // 占比饼图
        //             const pieUrl = `${urlPrefix}/queryChildren/${projectName}/${this.platformType}/${platformId}/${types[i]}/${field}`;
        //             gadgets.push(<Pie id={"gadget" + (count++)} key={"level" + i + "Pie"} url={pieUrl}/>);
        //             // 排行柱状图
        //             const barUrl = `${urlPrefix}/queryChildren/${projectName}/${this.platformType}/${platformId}/${types[i]}/${field}/5`;
        //             gadgets.push(<Bar id={"gadget" + (count++)} key={"level" + i + "Bar"} url={barUrl}/>);
        //         }
        //         this.setState({gadgets: gadgets})
        //     }
        // });
        //alert(2);
       
    }


    render() {
        var count = 1;
        var children = [];
        
        return (
            <div className="App">
                <Header title={this.projectName.toUpperCase() + ' Data Compass'}/>
                <Map data={this.state.data.location}/>
                <CenterGadget key="center" title={Locale.i18n(this.field,'entity','','')} data={this.state.data.center}/>
                <DailyLine id={"gadget" + (count++)} key="dailyline" data={this.state.data.day}/>
                <WeeklyLine id={"gadget" + (count++)} key="weeklyline" data={this.state.data.week}/>
                <MonthlyLine id={"gadget" + (count++)} key="monthlyline" data={this.state.data.month}/>
                <YearlyLine id={"gadget" + (count++)} key="yearlyline" data={this.state.data.year}/>
                <Pie id={"gadget" + (count++)} key={"level0Pie"} data={this.state.data.pie0}/>
                <Bar id={"gadget" + (count++)} key={"level0Bar"} data={this.state.data.bar0}/>
                <Pie id={"gadget" + (count++)} key={"level1Pie"} data={this.state.data.pie1}/>
                <Bar id={"gadget" + (count++)} key={"level1Bar"} data={this.state.data.bar1}/>
            </div>
        );
    }
}

export default App;
