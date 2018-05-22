import React, {Component} from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import Locale from "../assets/_locale";

class Pie extends Component {

    shouldComponentUpdate() {
        return this.props.data ? true : false
    }

    componentDidMount() {
        this.myChart = echarts.init(document.getElementById(this.props.id));
    }

    componentDidUpdate() {
        this.myChart.setOption({
            textStyle: {
                color: '#b0b0b0'
            },
            title: {
                textStyle: {
                    color: '#fff',
                    fontSize: 13
                },
                text: Locale.i18n(this.props.data.title),
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
                data: this.preproccessItems(this.props.data.items).map(item => item.name)
            },
            series: [
                {
                    name: this.props.data.title,
                    type: 'pie',
                    radius: '50%',
                    roseType: 'radius',
                    center: ['50%', '50%'],
                    data: this.preproccessItems(this.props.data.items),
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
            <div id={this.props.id} className="gadget"/>
        );
    }
}

export default Pie;