import React, { Component } from 'react'
import { connect } from "react-redux"
import { updateData, sortData } from "../../../actions/dataActions"

import RankCalculatorInput from "./RankCalculatorInput"

class RankCalculator extends Component {

	recalculatedWeight() {
		this.props.sortData(this.props.companies, this.props.rankWeights)
		this.props.updateData(this.props.companies, this.props.filters)
	}

	render() {
		const { rankWeights } = this.props
		return(
			<div className="calculator-slider">
				<hr />
			 	<span>Company Metrics</span>
			 	<form>
			 		<RankCalculatorInput name="Time Since Founding:" type="timeSinceFounding" value={rankWeights.timeSinceFounding}/>
			 		<RankCalculatorInput name="Team Rank:" type="teamRank" value={rankWeights.teamRank}/>
			 		<RankCalculatorInput name="Employee Count:" type="employeeCount" value={rankWeights.employeeCount}/>
			 		<RankCalculatorInput name="Publication Count:" type="publicationCount" value={rankWeights.publicationCount}/>
				</form>					
			 	<span>Funding Metrics</span>
			 	<hr />
				<form>
					<RankCalculatorInput name="Total Funding Amount:" type="totalFunding" value={rankWeights.totalFunding}/>
					<RankCalculatorInput name="Time since last Funding:" type="timeSinceLastFunding" value={rankWeights.timeSinceLastFunding}/>
					<RankCalculatorInput name="Valuation:" type="valuation" value={rankWeights.valuation}/>
					<RankCalculatorInput name="Investor Count:" type="investorCount" value={rankWeights.investorCount}/>
				</form>
				<button className="buttons info-buttons" type="button" onClick={this.recalculatedWeight.bind(this)}>Submit</button>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	companies: state.data.processedCompanies,
	rankWeights: state.filter.rankWeights,
	filters: state.filter.filters
})

export default connect(mapStateToProps, { updateData, sortData })(RankCalculator)


