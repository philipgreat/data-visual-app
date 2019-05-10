import React, {Component} from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import Locale from "../assets/_locale";
import axios from 'axios';
import http from 'http';
import https from 'https';
class WeeklyLine extends Component {

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
                            this.setState({data: JSON.parse(event.data)});
						}
					});
                    return;
                }
            }
        }).catch(err => console.error(err));
    }
    componentDidUpdate() {
        this.myChart.setOption({
            title: {
                text: Locale.i18n(this.state.data.title, this.state.data.type, this.state.data.dataType, this.state.data.dataId)
            },
            xAxis: {
                data:[
                    Locale.i18nRaw("monday"), 
                    Locale.i18nRaw("tuesday"), 
                    Locale.i18nRaw("wednesday"), 
                    Locale.i18nRaw("thurday"), 
                    Locale.i18nRaw("friday"), 
                    Locale.i18nRaw("satday"), 
                    Locale.i18nRaw("sunday")],
                type: 'category'
            },
            series: [
                {
                    name: Locale.i18nRaw("thisWeek"),
                    type:'line',
                    smooth: true,
                    data: this.state.data.data[0].items.map(item=>item.value)
                },
                {
                    name: Locale.i18nRaw("lastWeek"),
                    type:'line',
                    smooth: true,
                    data: this.state.data.data[1].items.map(item=>item.value)
                }
            ]
        });
        this.myChart.setOption({
            title: {
                text: Locale.i18n(this.state.data.title, this.state.data.type, this.state.data.dataType, this.state.data.dataId)
            },
            xAxis: {
                data:[
                    Locale.i18nRaw("monday"), 
                    Locale.i18nRaw("tuesday"), 
                    Locale.i18nRaw("wednesday"), 
                    Locale.i18nRaw("thurday"), 
                    Locale.i18nRaw("friday"), 
                    Locale.i18nRaw("satday"), 
                    Locale.i18nRaw("sunday")],
                type: 'category'
            },
            series: [
                {
                    name: Locale.i18nRaw("thisWeek"),
                    type:'line',
                    smooth: true,
                    data: this.state.data.data[0].items.map(item=>item.value)
                },
                {
                    name: Locale.i18nRaw("lastWeek"),
                    type:'line',
                    smooth: true,
                    data: this.state.data.data[1].items.map(item=>item.value)
                }
            ]
        });
    }

    componentDidMount() {
        this.fetchData();
        this.myChart = echarts.init(document.getElementById(this.props.id));
        this.myChart.setOption({
            color: ['#f917ff','#62ff0e'],
            textStyle: {
                color: '#b0b0b0'
            },
            title: {
                textStyle: {
                    color: '#fff',
                    fontSize: 13
                },
                left: '5%',
                top: '6%'
            },
            grid: {
                containLabel: true,
                left: '5%',
                top: '22%',
                bottom: '15%'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                axisTick: {
                    show: false
                },
                type: 'category',
                splitLine: {
                    show: false,
                }
            },
            yAxis: {
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                axisTick: {
                    show: false
                },
                type: 'value',
                splitLine: {
                    show: false,
                }
            },
            legend: {
                data:[Locale.i18nRaw("thisWeek"), Locale.i18nRaw("lastWeek")],
                textStyle: {
                    color: '#b0b0b0'
                },
                bottom: '5%'
            }
        });
        
    }

    render() {
        return (
            <div id={this.props.id + "-wrap"}
            className={this.state.selected ? "high-light" : ""}>
            <div id={this.props.id} className="gadget" />
            </div>
        );
    }
}

export default WeeklyLine;