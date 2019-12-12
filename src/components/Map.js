import React, {Component} from 'react';
import echarts from 'echarts';
import 'echarts/extension/bmap/bmap';

class Map extends Component {
	constructor(props) {
        super(props);
		this.state = {
            data: [],
            selected: false
        }
    }
	componentDidUpdate() {
        if (!this.props.data) {
            return;
        }
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
        if (!this.props.data) {
            return;
        }
        const locations = this.props.data.filter(item => item.longitude && item.longitude !== null);
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
                        return 10+Math.log10(value[2]);
                    },
                    label: {
                        normal: {
                            formatter: '{b}: {@[2]}',
                            position: 'right',
                            show: true
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
	

    convertData = function (data) {
		//alert(data);
        if (!data) {
            return [];
        }
        var res = [];
		//alert(data);
        data.forEach(item => res.push({
            name: item.locationName,
			//value: [102.188043, 38.520089, 4]
            value: [parseFloat(item.longitude), parseFloat(item.latitude), parseInt(item.value,0)]
        }));
		//alert(res);
        return res;
    };

    calculateMapZoom(data) {
       
            return 5;
        
    }

    calculateMapCenter(data) {
        
        return [104.114129, 37.550339];
        
        
    }

    

    componentDidMount() {
        this.myChart = echarts.init(document.getElementById('map'));
        

    }

    render() {
        return (
            <div id="map"/>
        );
    }
}

export default Map;