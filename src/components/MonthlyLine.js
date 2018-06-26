import React, {Component} from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import Locale from "../assets/_locale";

class MonthlyLine extends Component {

    shouldComponentUpdate() {
        return this.props.data ? true : false
    }

    componentWillReceiveProps(newProps) {

        if (!newProps.data) {
            return;
        }

        const lastMonthData = newProps.data.data[1].items
        if (lastMonthData.length < 31) {
            for (let i = 0; i < 31 - lastMonthData.length; i++) {
                lastMonthData.push({
                    "name": "",
                    "value": 0
                })
            }
        }


        const thisMonthData = newProps.data.data[0].items
        if (!thisMonthData || thisMonthData.length < 31) {
            const length = thisMonthData ? thisMonthData.length : 0;
            for (let i = 0; i < 31 - length; i++) {
                thisMonthData.push({
                    "name": "",
                    "value": 0
                })
            }
        }

    }

    componentDidUpdate() {
        var colors = ['#5a9cff', '#ff5876'];
        this.myChart.setOption({
            color: colors,
            title: {
                text: Locale.i18n(this.props.data.title)
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
                    data: this.props.data.data[0].items.map(item => {
                        if (!item.name) {
                            return "";
                        }
                        const date = item.name.slice(4);
                        return date.substring(0, 2) + "-" + date.slice(2)
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
                    data: this.props.data.data[1].items.map(item => {
                        if (!item.name) {
                            return "";
                        }
                        const date = item.name.slice(4);
                        return date.substring(0, 2) + "-" + date.slice(2)
                    })
                }
            ],
            series: [
                {
                    name: Locale.i18n("lastMonth"),
                    type: 'line',
                    smooth: true,
                    data: this.props.data.data[1].items.map(item => item.value),
                    xAxisIndex: 1
                },
                {
                    name: Locale.i18n("thisMonth"),
                    type: 'line',
                    smooth: true,
                    data: this.props.data.data[0].items.map(item => item.value)
                }
            ]
        });
    }

    componentDidMount() {
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
                data: [Locale.i18n("thisMonth"), Locale.i18n("lastMonth")],
                textStyle: {
                    color: '#b0b0b0'
                },
                bottom: '5%'
            }
        });
    }

    render() {
        return (
            <div id={this.props.id} className="gadget"/>
        );
    }
}

export default MonthlyLine;