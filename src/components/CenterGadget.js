import React, {Component} from 'react';

class CenterGadget extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="center" style={{height:"100px"}}>
				
                <div className="content">
				<table style={{width:"100%", textAlign:"center"}}>
					<tr style={{height:"60px",fontSize:"40px"}}>
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
                <div className="sub-title" style={{fontSize:"25px"}} >{this.props.data?this.props.data.title:""}统计</div>
            </div>
        );
    }
}

export default CenterGadget;