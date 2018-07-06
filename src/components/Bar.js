import React, {Component} from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import Locale from "../assets/_locale";

class Bar extends Component {

    shouldComponentUpdate() {
        return this.props.data ? true : false
    }

    componentDidUpdate() {
        this.myChart.setOption({
            textStyle: {
                color: '#b0b0b0'
            },
            title: {
                text: Locale.i18n(this.props.data.title, 'top', this.props.data.dataType, this.props.data.dataId),
                textStyle: {
                    color: '#fff',
                    fontSize: 13
                },
                left: '5%',
                top: '6%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                containLabel: true,
                left: '5%',
                top: '22%',
                bottom: '15%'
            },
            yAxis: {
                data: this.preproccessItems(this.props.data.items).map(item => item.name),
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
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
                splitLine: {
                    show: false
                }
            },
            series: [{
                type: 'bar',
                name: this.props.data.title,
                data: this.preproccessItems(this.props.data.items).map(item => item.value),
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#83bff6'},
                                {offset: 0.5, color: '#188df0'},
                                {offset: 1, color: '#188df0'}
                            ]
                        )
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#2378f7'},
                                {offset: 0.7, color: '#2378f7'},
                                {offset: 1, color: '#83bff6'}
                            ]
                        )
                    }
                }
            }]
        });
    }

    preproccessItems(items) {
        return items.filter(item => item.value > 0).sort((a, b) => a.value - b.value)
    }

    componentDidMount() {
        this.myChart = echarts.init(document.getElementById(this.props.id));
    }

    render() {
        return (
            <div id={this.props.id} className="gadget"
                 onClick={() => this.props.refreshData(this.props.data)}/>
        );
    }
}

export default Bar;