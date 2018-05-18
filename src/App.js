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

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            gadgets: []
        }
        this.platformType = ""
    }


    refreshData(data) {
        this.setState({data: data});
    }

    componentWillMount() {
        const params = querystring.parse(window.location.search)

        // const baseUrl = "http://clariones.doublechaintech.com:8580";
        // const platformType = "CarInspectionPlatform";
        // const platformId = "CIP000001";
        // const field = 'actual_amount';
        // const subType = 'VehicleInspectionOrder';
        this.platformType = params.platformType;
        const platformId = params.platformId;
        const field = params.field;
        const subType = params.subType;
        const client = axios.create({
            timeout: 3000,
            withCredentials: false
        });
        var gadgets = [];
        var count = 1
        const centerUrl = `/queryEntity/${this.platformType}/${platformId}/${field}`;
        gadgets.push(<CenterGadget key="center" title={Locale.i18n(this.platformType + "." + field)} url={centerUrl}/>)

        // 当日和前一日线性图
        const dailylineUrl = `/queryTimelyData/${this.platformType}/${platformId}/${field}/day`;
        gadgets.push(<Gadget id={"gadget" + (count++)} key="dailyline" url={dailylineUrl}/>);
        // 本周和前一周线性图
        const weeklylineUrl = `/queryTimelyData/${this.platformType}/${platformId}/${field}/week`;
        gadgets.push(<Gadget id={"gadget" + (count++)} key="weeklyline" url={weeklylineUrl}/>);
        // 本月和上月线性图
        const monthlylineUrl = `/queryTimelyData/${this.platformType}/${platformId}/${field}/month`;
        gadgets.push(<Gadget id={"gadget" + (count++)} key="monthlyline" url={monthlylineUrl}/>);
        // 今年和去年线性图
        const yearlylineUrl = `/queryTimelyData/${this.platformType}/${platformId}/${field}/year`;
        gadgets.push(<Gadget id={"gadget" + (count++)} key="yearlyline" url={yearlylineUrl}/>);

        client.get(`/queryPath/${this.platformType}/${subType}`).then(resp => {
            const types = resp.data
            if (types.length > 1) {
                for (let i = 1; i < types.length; i++) {
                    if (i > 2) {
                        break;
                    }
                    // 占比饼图
                    const pieUrl = `/queryChildren/${this.platformType}/${platformId}/${types[i]}/${field}`;
                    gadgets.push(<Gadget id={"gadget" + (count++)} key={"level" + i + "Pie"} url={pieUrl}/>);
                    // 排行柱状图
                    const barUrl = `/queryChildren/${this.platformType}/${platformId}/${types[i]}/${field}/5`;
                    gadgets.push(<Gadget id={"gadget" + (count++)} key={"level" + i + "Bar"} url={barUrl}
                                         refreshData={this.refreshData.bind(this)}/>);
                }
                this.setState({gadgets: gadgets})
            }
        });
    }


    render() {
        return (
            <div className="App">
                <Header title={Locale.i18n(this.platformType) + '数据罗盘'}/>
                <Map data={this.state.data}/>
                {this.state.gadgets}
            </div>
        );
    }
}

export default App;
