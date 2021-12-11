import React from 'react'
import CanvasJSReact from './canvasjs.react';
var Component = React.Component;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var API_KEY = '7d70b182bb96459c8773ba8e776b09a1';
const DAY_CHECK = 10; // Show data from every x days
 
var dataPoints =[];
class Chart2 extends Component {
 
	render() {	
		const options = {
			theme: this.props.mode ? "light2" : "dark1",
			title: {
				text: "US COVID Vaccinations Completed Ratio"
			},
			axisY: {
				title: "Vaccinations Completed Ratio",
                maximum: 1,
			},
			data: [{
				type: "area",
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "0.00",
				dataPoints: dataPoints
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options} 
				 onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
	
	componentDidMount(){
		var chart = this.chart;
		fetch(`https://api.covidactnow.org/v2/country/US.timeseries.json?apiKey=${API_KEY}`)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			data = data.metricsTimeseries
			for (var i = data.length - 1; i > 0; i -= DAY_CHECK) {
                if (data[i].vaccinationsCompletedRatio) {
                    dataPoints.push({
                        x: new Date(data[i].date),
                        y: data[i].vaccinationsCompletedRatio
                    });
                }
			}
			chart.render();
		});
	}
}
export default Chart2;
 