import React, {Component} from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import Locale from "../assets/_locale";

class WeeklyLine extends Component {

    shouldComponentUpdate(){
        return this.props.data ? true : false
    }

    componentDidUpdate() {
        this.myChart.setOption({
            title: {
                text: Locale.i18n(this.props.data.title)
            },
            xAxis: {
                data:[
                    Locale.i18n("monday"), 
                    Locale.i18n("tuesday"), 
                    Locale.i18n("wednesday"), 
                    Locale.i18n("thurday"), 
                    Locale.i18n("friday"), 
                    Locale.i18n("satday"), 
                    Locale.i18n("sunday")],
                type: 'category'
            },
            series: [
                {
                    name: Locale.i18n("thisWeek"),
                    type:'line',
                    smooth: true,
                    data: this.props.data.data[0].items.map(item=>item.value)
                },
                {
                    name: Locale.i18n("lastWeek"),
                    type:'line',
                    smooth: true,
                    data: this.props.data.data[1].items.map(item=>item.value)
                }
            ]
        });
    }

    componentDidMount() {
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
                data:[Locale.i18n("thisWeek"), Locale.i18n("lastWeek")],
                textStyle: {
                    color: '#b0b0b0'
                },
                bottom: '5%'
            }
        });
    }

    render() {
        return (
            <div id={this.props.id} className="gadget" />
        );
    }
}

export default WeeklyLine;