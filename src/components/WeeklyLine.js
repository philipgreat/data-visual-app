import React, {Component} from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import Locale from "../assets/_locale";

class WeeklyLine extends Component {

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
        this.myChart.setOption({
            title: {
                text: this.props.data.title
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
                    data: this.props.data.data[0].items.map(item=>item.value)
                },
                {
                    name: Locale.i18nRaw("lastWeek"),
                    type:'line',
                    smooth: true,
                    data: this.props.data.data[1].items.map(item=>item.value)
                }
            ]
        });
        this.myChart.setOption({
            title: {
                text: this.props.data.title
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
                    data: this.props.data.data[0].items.map(item=>item.value)
                },
                {
                    name: Locale.i18nRaw("lastWeek"),
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