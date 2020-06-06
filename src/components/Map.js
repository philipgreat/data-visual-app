import React, {Component} from 'react';
import axios from 'axios';
import http from 'http';
import https from 'https';
import echarts from 'echarts';
import 'echarts/extension/bmap/bmap';

class Map extends Component {
	constructor(props) {
        super(props);
		this.interval=1000;
		this.data=[];
        this.axios = axios.create({
            timeout: 100000,
            httpAgent: new http.Agent({keepAlive: true}),
            httpsAgent: new https.Agent({keepAlive: true})
        });
    }
	componentDidUpdate() {
		//alert(this.data );
        if (!this.data) {
            return;
        }
        const locations = this.data.filter(item => item.longitude && item.longitude !== null);
        if (!locations || locations.length === 0) {
            return;
        }
		
		
        this.myChart.setOption({
            bmap: {
                center: this.calculateMapCenter(this.data),
                zoom: this.calculateMapZoom(this.data)
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
                    type: 'effectScatter',
                    coordinateSystem: 'bmap',
                    data: this.convertData(this.data),
                    symbolSize: function (value) {
                        return 10+Math.log10(value[2]);
                    },
					showEffectOn: 'render',
					rippleEffect: {
						brushType: 'stroke',
						scale : 50
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
	fetchData() {
        this.axios.get(this.props.url).then(resp => {
            if (resp.status >= 200 && resp.status < 300) {
                this.data = resp.data;
            }
        }).catch(err => console.error(err));
		this.componentDidUpdate();
    }
	componentWillMount() {
        this.fetchData();
        this.interval = setInterval(() => this.fetchData(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval)
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
            value: [parseFloat(item.longitude), parseFloat(item.latitude), parseInt(item.value,10)]
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
        const option = {
            bmap: {
                center: this.calculateMapCenter(this.data),
                zoom: this.calculateMapZoom(this.data),
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