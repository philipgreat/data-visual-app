

function getDayOption(data, colors) {
	var option = {
		color: ['#ff464b', '#18dfff'],
		textStyle: {
			color: '#b0b0b0'
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
			data: ["today", "yesterday"],
			textStyle: {
				color: '#b0b0b0'
			},
			bottom: '5%'
		},
		title: {
			text: Locale.i18n(data.title, data.type, data.dataType, data.dataId)
		},
		xAxis: {
			data: data.data[0].items.map(item => {
				const time = item.name.slice(8);
				return time.substring(0, 2) + ":" + time.slice(2)
			})
		},
		series: [
			{
				name: "today",
				type: 'line',
				smooth: true,
				data: data.data[0].items.map(item => item.value)
			},
			{
				name: "yesterday",
				type: 'line',
				smooth: true,
				data: data.data[1].items.map(item => item.value)
			}
		]
	};
	return option;
}

function getYearOption(data, colors) {
	const thisYear = data.data[0].items
	if (!thisYear || thisYear.length < 12) {
		const length = thisYear ? thisYear.length : 0;
		for (let i = 0; i < 12 - length; i++) {
			thisYear.push({
				"name": "",
				"value": 0
			})
		}
	}
	var option = {
		textStyle: {
			color: '#b0b0b0'
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
			data: ["thisYear", "lastYear"],
			textStyle: {
				color: '#b0b0b0'
			},
			bottom: '5%'
		},
		color: colors,
		title: {
			text: Locale.i18n(data.title, data.type, data.dataType, data.dataId)
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
				data: data.data[0].items.map(item => {
					const date = item.name;
					if (!date) {
						return "";
					}
					return date.substring(0, 4) + "-" + date.slice(4)
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
				data: data.data[1].items.map(item => {
					const date = item.name;
					if (!date) {
						return "";
					}
					return date.substring(0, 4) + "-" + date.slice(4)
				})
			}
		],
		series: [
			{
				name: "lastYear",
				type: 'line',
				smooth: true,
				data: data.data[1].items.map(item => item.value),
				xAxisIndex: 1
			},
			{
				name: "thisYear",
				type: 'line',
				smooth: true,
				data: data.data[0].items.map(item => item.value)
			}
		]
	};
	return option;
}

function getMonthOption(data,colors) {
	const lastMonthData = data.data[1].items
	if (lastMonthData.length < 31) {
		for (let i = 0; i < 31 - lastMonthData.length; i++) {
			lastMonthData.push({
				"name": "",
				"value": 0
			})
		}
	}
	const thisMonthData = data.data[0].items
	if (!thisMonthData || thisMonthData.length < 31) {
		const length = thisMonthData ? thisMonthData.length : 0;
		for (let i = 0; i < 31 - length; i++) {
			thisMonthData.push({
				"name": "",
				"value": 0
			})
		}
	}
	var option = {
		textStyle: {
			color: '#b0b0b0'
		},
		title: {
			text: Locale.i18n(data.title, data.type, data.dataType, data.dataId)
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
				data: data.data[0].items.map(item => {
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
				data: data.data[1].items.map(item => {
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
				name: "lastMonth",
				type: 'line',
				smooth: true,
				data: data.data[1].items.map(item => item.value),
				xAxisIndex: 1
			},
			{
				name: "thisMonth",
				type: 'line',
				smooth: true,
				data: data.data[0].items.map(item => item.value)
			}
		],
		
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
			data: ["thisMonth", "lastMonth"],
			textStyle: {
				color: '#b0b0b0'
			},
			bottom: '5%'
		}
	};
	return option;
}

function getWeekOption(data, colors) {
	var option = {
		title: {
			text: Locale.i18n(data.title, data.type, data.dataType, data.dataId)
		},
		tooltip: {
			trigger: 'axis'
		},
		yAxis: {
			axisLine: {
				lineStyle: {
					color: '#777'
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
		xAxis: {
			data:[
				"monday", 
				"tuesday", 
				"wednesday", 
				"thurday", 
				"friday", 
				"satday", 
				"sunday"],
			type: 'category'
		},
		series: [
			{
				name: "thisWeek",
				type:'line',
				smooth: true,
				data: data.data[0].items.map(item=>item.value)
			},
			{
				name: "lastWeek",
				type:'line',
				smooth: true,
				data: data.data[1].items.map(item=>item.value)
			}
		],
		legend: {
			data:["thisWeek", "lastWeek"],
			textStyle: {
				color: '#b0b0b0'
			},
			bottom: '5%'
		}
	};
	return option;
}
function getPieOption(data, colors) {
	var option = {
		textStyle: {
			color: '#b0b0b0'
		},
		title: {
			
			text: Locale.i18n(data.title, data.type, data.dataType, data.dataId),
			left: 'center',
			top: 20
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
			data: data.items.map(item => item.name)
		},
		series: [
			{
				name: Locale.i18n(data.title, data.type, data.dataType, data.dataId),
				type: 'pie',
				radius: '50%',
				roseType: 'radius',
				center: ['50%', '50%'],
				data: data.items,
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	};
	return option;
}

function getBarOption(data, colors) {
	var option = {
		textStyle: {
			color: '#b0b0b0'
		},
		title: {
			text: Locale.i18n(data.title, data.type, data.dataType, data.dataId),
			textStyle: {
				color: '#ccc',
				fontSize: 13
			},
			left: 'center',
			top: 20
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
			data: data.items.sort((a, b) => a.value - b.value).map(item => item.name),
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
			name: Locale.i18n(data.title, data.type, data.dataType, data.dataId),
			data: data.items.sort((a, b) => a.value - b.value).map(item => item.value),
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
	};
	return option;
}