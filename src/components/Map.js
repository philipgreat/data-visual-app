import React, {Component} from 'react';
import echarts from 'echarts';
import bmap from 'echarts/extension/bmap/bmap';

class Map extends Component {

    convertData = function (data) {
        if (!data || !data.items) {
            return [];
        }
        var res = [];
        data.items.forEach(item => res.push({
            name: item.name,
            value: item.location.concat(item.value)
        }));
        return res;
    };

    calculateMapZoom(data) {
        if (!data || !data.items) {
            return 5;
        }
        const points = data.items.map(item => item.location).filter(p => p !== undefined);
        if (!points || points.length === 0) {
            return 5;
        }
        const maxLng = Math.max(...points.map(p => p[0]));
        const minLng = Math.min(...points.map(p => p[0]));
        const maxLat = Math.max(...points.map(p => p[1]));
        const minLat = Math.min(...points.map(p => p[1]));
        const zoom = ["50", "100", "200", "500", "1000", "2000", "5000", "10000", "20000", "25000", "50000", "100000", "200000", "500000", "1000000", "2000000"]//级别18到3。
        const pointA = new window.BMap.Point(maxLng, maxLat);  // 创建点坐标A
        const pointB = new window.BMap.Point(minLng, minLat);  // 创建点坐标B
        const map = this.myChart.getModel().getComponent('bmap').getBMap();
        const distance = map.getDistance(pointA, pointB).toFixed(1);  //获取两点距离,保留小数点后两位
        for (var i = 0, zoomLen = zoom.length; i < zoomLen; i++) {
            if (zoom[i] - distance > 0) {
                return 18 - i + 3;//之所以会多3，是因为地图范围常常是比例尺距离的10倍以上。所以级别会增加3。
            }
        }
    }

    calculateMapCenter(data) {
        if (!data || !data.items) {
            return [104.114129, 37.550339];
        }
        const points = data.items.map(item => item.location).filter(p => p !== undefined);
        if (!points || points.length === 0) {
            return [104.114129, 37.550339];
        }
        const maxLng = Math.max(...points.map(p => p[0]));
        const minLng = Math.min(...points.map(p => p[0]));
        const maxLat = Math.max(...points.map(p => p[1]));
        const minLat = Math.min(...points.map(p => p[1]));
        const cenLng = (parseFloat(maxLng) + parseFloat(minLng)) / 2;
        const cenLat = (parseFloat(maxLat) + parseFloat(minLat)) / 2;
        return [cenLng, cenLat];
    }

    componentDidUpdate() {
        if (!this.props.data || !this.props.data.items) {
            return;
        }
        const locations = this.props.data.items.filter(item => item.location && item.location !== undefined);
        if (!locations || locations.length === 0) {
            return;
        }
        this.myChart.setOption({
            bmap: {
                center: this.calculateMapCenter(this.props.data),
                zoom: this.calculateMapZoom(this.props.data)
            },
            // title: {
            //     text: this.props.data.title,
            //     left: 'center',
            //     textStyle: {
            //         color: '#fff'
            //     }
            // },
            series: [
                {
                    type: 'scatter',
                    coordinateSystem: 'bmap',
                    data: this.convertData(this.props.data),
                    symbolSize: function (value) {
                        return value[2];
                    },
                    label: {
                        normal: {
                            formatter: '{b}: {@[2]}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#ddb926'
                        }
                    }
                }
            ]
        });
    }

    componentDidMount() {
        this.myChart = echarts.init(document.getElementById('map'));
        const option = {
            bmap: {
                center: this.calculateMapCenter(this.props.data),
                zoom: this.calculateMapZoom(this.props.data),
                roam: true,
                mapStyle: {
                    styleJson: [
                        {
                            "featureType": "water",
                            "elementType": "all",
                            "stylers": {
                                "color": "#021019"
                            }
                        },
                        {
                            "featureType": "highway",
                            "elementType": "geometry.fill",
                            "stylers": {
                                "color": "#000000"
                            }
                        },
                        {
                            "featureType": "highway",
                            "elementType": "geometry.stroke",
                            "stylers": {
                                "color": "#147a92"
                            }
                        },
                        {
                            "featureType": "arterial",
                            "elementType": "geometry.fill",
                            "stylers": {
                                "color": "#000000"
                            }
                        },
                        {
                            "featureType": "arterial",
                            "elementType": "geometry.stroke",
                            "stylers": {
                                "color": "#0b3d51"
                            }
                        },
                        {
                            "featureType": "local",
                            "elementType": "geometry",
                            "stylers": {
                                "color": "#000000"
                            }
                        },
                        {
                            "featureType": "land",
                            "elementType": "all",
                            "stylers": {
                                "color": "#08304b"
                            }
                        },
                        {
                            "featureType": "railway",
                            "elementType": "geometry.fill",
                            "stylers": {
                                "color": "#000000"
                            }
                        },
                        {
                            "featureType": "railway",
                            "elementType": "geometry.stroke",
                            "stylers": {
                                "color": "#08304b"
                            }
                        },
                        {
                            "featureType": "subway",
                            "elementType": "geometry",
                            "stylers": {
                                "lightness": -70
                            }
                        },
                        {
                            "featureType": "building",
                            "elementType": "geometry.fill",
                            "stylers": {
                                "color": "#000000"
                            }
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.text.fill",
                            "stylers": {
                                "color": "#857f7f"
                            }
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.text.stroke",
                            "stylers": {
                                "color": "#000000"
                            }
                        },
                        {
                            "featureType": "building",
                            "elementType": "geometry",
                            "stylers": {
                                "color": "#022338"
                            }
                        },
                        {
                            "featureType": "green",
                            "elementType": "geometry",
                            "stylers": {
                                "color": "#062032"
                            }
                        },
                        {
                            "featureType": "boundary",
                            "elementType": "all",
                            "stylers": {
                                "color": "#1e1c1c"
                            }
                        },
                        {
                            "featureType": "manmade",
                            "elementType": "geometry",
                            "stylers": {
                                "color": "#022338"
                            }
                        },
                        {
                            "featureType": "poi",
                            "elementType": "all",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.icon",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.text.fill",
                            "stylers": {
                                "color": "#2da0c6",
                                "visibility": "on"
                            }
                        }
                    ]
                }
            }
        };

        this.myChart.setOption(option);

    }

    render() {
        return (
            <div id="map"/>
        );
    }
}

export default Map;