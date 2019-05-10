import React, {Component} from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import '../assets/_locale/index'
import Locale from "../assets/_locale";
import axios from 'axios';
import http from 'http';
import https from 'https';

class YearlyLine extends Component {
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
                    var urlPrefix =  "http://localhost:8580";
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
        
        const thisYear = this.state.data.data[0].items
        if (!thisYear || thisYear.length < 12) {
            const length = thisYear ? thisYear.length : 0;
            for (let i = 0; i < 12 - length; i++) {
                thisYear.push({
                    "name": "",
                    "value": 0
                })
            }
        }
        var colors = ['#d8aeff', '#0a4fff'];
        this.myChart.setOption({
            color: colors,
            title: {
                text: Locale.i18n(this.state.data.title, this.state.data.type, this.state.data.dataType, this.state.data.dataId)
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                if (!params.value) {
                                    return null;
                                }
                                return params.value
                                    + (params.seriesData.length ? ': ' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: this.state.data.data[0].items.map(item => {
                        const date = item.name;
                        if (!date) {
                            return "";
                        }
                        return date.substring(0, 4) + "-" + date.slice(4)
                    })
                },
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[0]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                if (!params.value) {
                                    return null;
                                }
                                return params.value
                                    + (params.seriesData.length ? ': ' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: this.state.data.data[1].items.map(item => {
                        const date = item.name;
                        if (!date) {
                            return "";
                        }
                        return date.substring(0, 4) + "-" + date.slice(4)
                    })
                }
            ],
            series: [
                {
                    name: Locale.i18nRaw("lastYear"),
                    type: 'line',
                    smooth: true,
                    data: this.state.data.data[1].items.map(item => item.value),
                    xAxisIndex: 1
                },
                {
                    name: Locale.i18nRaw("thisYear"),
                    type: 'line',
                    smooth: true,
                    data: this.state.data.data[0].items.map(item => item.value)
                }
            ]
        });
    }

    componentDidMount() {
        this.fetchData();

        this.myChart = echarts.init(document.getElementById(this.props.id));
        this.myChart.setOption({
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
                trigger: 'none',
                axisPointer: {
                    type: 'cross'
                }
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
                },
                axisPointer: {
                    label: {
                        color: 'red'
                    }
                }
            },
            legend: {
                data: [Locale.i18nRaw("thisYear"), Locale.i18nRaw("lastYear")],
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
            <div id={this.props.id} className="gadget"/>
            </div>
        );
    }
}

export default YearlyLine;