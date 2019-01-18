import React, { Component } from "react"
import { connect } from "react-redux"
import { changeRankWeights } from "../../../actions/filterActions"

class RankCalculatorInput extends Component {

	constructor(props) {
		super(props)
		this.state = {
			value: props.value
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ value: nextProps.value })
	}
	
	setValue(e) {
		this.setState({ value: e.target.value })
		this.props.changeRankWeights(this.props.type, e.target.value)
	}

	render() {
		return (
			<div className="form-group">
		 		<label>{this.props.name}</label>
		 		<input type="number" min="0" max="5" value={this.state.value} className="calculatorInput" onChange={this.setValue.bind(this)}/>
		 		<input type="range" min="0" max="5" value={this.state.value} className="slider form-control" onChange={this.setValue.bind(this)}/>
			</div>
		)
	}
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { changeRankWeights })(RankCalculatorInput)