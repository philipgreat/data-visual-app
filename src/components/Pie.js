import React, {Component} from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import Locale from "../assets/_locale";
import querystring from "query-string";
import axios from 'axios';
import http from 'http';
import https from 'https';
class Pie extends Component {
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
                    var urlPrefix =  window.origin;
					var source=new EventSource(urlPrefix + "/send/" + resp.data);
					source.onmessage=((event) =>{
						if ("heartbeat" != event.data) {
                            //alert(event.data);
                            this.setState({data: JSON.parse(event.data)});
                            //alert(JSON.stringify(this.state.data));
                            //alert(this.state.data.title);
                            //alert(event.data);
                            //alert(data.title);
						}
					});
                    return;
                }
            }
        }).catch(err => console.error(err));
    }
    componentDidMount() {
        this.fetchData();
        this.myChart = echarts.init(document.getElementById(this.props.id));
        //alert(this.state.data.title);
		// this.myChart.on('click', function (params) {
		// 	var typeId = params.data.id.split("/");
		// 	const addressQueryString = querystring.parse(window.location.search);
		// 	var path = window.location.pathname;
		// 	if (path === "/") {
		// 		path = "";
		// 	}
		// 	window.open(window.location.protocol + "//" + window.location.host + path + "/?projectName=" +addressQueryString.projectName + "&platformType=" + typeId[0] + "&platformId=" + typeId[1] + "&field=" + addressQueryString.field + "&subType=" + addressQueryString.subType);

        // });
       
    }

    componentDidUpdate() {
        //alert(this.state.data.title);
        this.myChart.setOption({
            textStyle: {
                color: '#b0b0b0'
            },
            title: {
                textStyle: {
                    color: '#fff',
                    fontSize: 13
                },
                text: Locale.i18n(this.state.data.title, 'top', this.state.data.dataType, this.state.data.dataId),
                left: '5%',
                top: '6%'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                textStyle: {
                    color: '#b0b0b0',
                    // fontSize: 8
                },
                type: 'scroll',
                orient: 'horizontal',
                bottom: '5%',
                data: this.state.data.items==null?null:this.preproccessItems(this.state.data.items).map(item => item.name)
            },
            series: [
                {
                    name: this.state.data.title,
                    type: 'pie',
                    radius: '50%',
                    roseType: 'radius',
                    center: ['50%', '50%'],
                    data: this.state.data.items==null?null:this.preproccessItems(this.state.data.items),
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        });
		
    }

    preproccessItems(items) {
        return items.filter(item => item.value > 0)
    }

    render() {
        return (
            <div id={this.props.id + "-wrap"}
                 className={this.state.selected ? "high-light" : ""}>
            <div id={this.props.id} className="gadget"/>
            </div>
        );
    }
}

export default Pie;