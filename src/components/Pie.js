import React, {Component} from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import Locale from "../assets/_locale";

class Pie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        }

    }
    componentDidMount() {
        this.myChart = echarts.init(document.getElementById(this.props.id));
        //alert(this.props.data.title);
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
        if (!this.props.data) {
            return;
        }
        this.myChart.setOption({
            textStyle: {
                color: '#b0b0b0'
            },
            title: {
                textStyle: {
                    color: '#fff',
                    fontSize: 13
                },
                text: this.props.data.title,
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
                data: this.props.data.items==null?null:this.preproccessItems(this.props.data.items).map(item => item.name)
            },
            series: [
                {
                    name: this.props.data.title,
                    type: 'pie',
                    radius: '50%',
                    roseType: 'radius',
                    center: ['50%', '50%'],
                    data: this.props.data.items==null?null:this.preproccessItems(this.props.data.items),
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