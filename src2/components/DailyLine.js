import React, {Component} from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import Locale from "../assets/_locale";


class DailyLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        }
    }
    componentDidUpdate() {
        if (!this.props.data) {
            return;
        }
        console.log(this.props.data.title);
        this.myChart.setOption({
            title: {
                text: Locale.i18n(this.props.data.title, this.props.data.type, this.props.data.dataType, this.props.data.dataId)
            },
            xAxis: {
                data: this.props.data.data[0].items.map(item => {
                    const time = item.name.slice(8);
                    return time.substring(0, 2) + ":" + time.slice(2)
                })
            },

            series: [
                {
                    name: Locale.i18nRaw("today"),
                    type: 'line',
                    smooth: true,
                    data: this.props.data.data[0].items.map(item => item.value)
                },
                {
                    name: Locale.i18nRaw("yesterday"),
                    type: 'line',
                    smooth: true,
                    data: this.props.data.data[1].items.map(item => item.value)
                }
            ]
        });
    }
    componentDidMount() {
       
        this.myChart = echarts.init(document.getElementById(this.props.id));
        this.myChart.setOption({
            color: ['#ff464b', '#18dfff'],
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
                    show: false
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
                    show: false
                }
            },
            legend: {
                data: [Locale.i18nRaw("today"), Locale.i18nRaw("yesterday")],
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

export default DailyLine;