import React, {Component} from 'react';

class CenterGadget extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="center">
				
                <div className="content">
				<table>
					<tr>
						<td>{this.props.data?this.props.data.data.halfHour.value:""}</td>
						<td>{this.props.data?this.props.data.data.day.value:""}</td>
						<td>{this.props.data?this.props.data.data.month.value:""}</td>
						<td>{this.props.data?this.props.data.data.year.value:""}</td>
					</tr>
					<tr>
						<td>{this.props.data?this.props.data.data.halfHour.title:""}</td>
						<td>{this.props.data?this.props.data.data.day.title:""}</td>
						<td>{this.props.data?this.props.data.data.month.title:""}</td>
						<td>{this.props.data?this.props.data.data.year.title:""}</td>
					</tr>
				</table>
				</div>
                <div className="sub-title">{this.props.data?this.props.data.title:""}</div>
            </div>
        );
    }
}

export default CenterGadget;