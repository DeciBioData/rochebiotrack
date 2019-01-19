import React, { Component } from "react"
import { connect } from "react-redux"
import { formatDollar } from "../../../actions/otherActions"

class Table extends Component {
	render() {
		const table = new Set(this.props.columns)

		let sortedData = this.props.companies.slice()
		sortedData.forEach((data, index) => data.rank = index + 1)

		let endEntry = this.props.currentPage * this.props.numberOfShowPerPage
  		let startEntry = endEntry - this.props.numberOfShowPerPage
  		let partialData = sortedData.slice(startEntry, endEntry)
			
		return(
			<div className="table-responsive">
				<table className="table table-sm" id="tableData">
				  	<thead className="table-heading">
					    <tr>
					    	{table.has('Rank') ? (<th className="text-left">Rank</th>) : null}
					    	{table.has('Company Name') ? (<th className= "text-left">Company Name</th>) : null}
							{table.has('Country') ? <th className="text-left">Country</th> : null}
					      	{table.has('Founded') ? <th className="text-left">Founded</th> : null}
							{table.has('Last Funding') ? <th className="text-left">Last Funding</th> : null}
					      	{table.has('Employee Count') ? <th className= "text-left">Employee Count</th> : null}
					    	{table.has('Rounds') ? <th className="text-left">Rounds</th> : null}
					    	{table.has('Total Funding') ? <th className="text-left">Total Funding</th> : null}
					    	{table.has('Reported Valuation') ? <th className="text-left">Reported Valuation</th> : null} 

					    	{table.has('Category') ? <th className="text-left">Category</th> : null}
							{table.has('Region') ? <th className="text-left">Region</th> : null}
					      	{table.has('Status') ? <th className="text-left">Status</th> : null}
							{table.has('Publication Count') ? <th className="text-left">Publication Count</th> : null}
					      	{table.has('Investor Count') ? <th className="text-left">Investor Count</th> : null}
					      	{table.has('Description') ? <th className="text-left">Description</th> : null}
					    	{table.has('Rank Score') ? <th className="text-left">Rank Score</th> : null}
					    </tr>
				    </thead>
				    <tbody>
				    	{
				    		partialData.map((data, index) => {
				    			return (
							    	<tr key={index}>
							    		{table.has("Rank") ? <th className="text-left">{data.rank}</th> : null}
							    		{table.has('Company Name') ? <td className="text-left"><a href={`/company/${data.uuid}`} target="_blank" rel="noopener noreferrer" className="companyName">{data.name}</a></td> : null}
										{table.has('Country') ? <td className="text-left">{data.country}</td> : null}
							    		{table.has('Founded') ? <td className="text-left">{data.yearOfFound == null ? 'unknown' : data.yearOfFound}</td> : null}
							    		
							    		{table.has('Last Funding') ? <td className="text-left">{data.yearOfLastFund == null ? 'unknown' : data.yearOfLastFund}</td> : null}
							    		{table.has('Employee Count') ? <td className="text-left">{data.employeeCount}</td> : null}
										{table.has('Rounds') ? <td className="text-left">{data.rounds}</td> : null}
							    		{table.has('Total Funding') ? <td className="text-left">{formatDollar(data.totalFunding)}</td> : null}
							    		{table.has('Reported Valuation') ? <td className="text-left">{formatDollar(data.reportedValuation)}</td> : null}
								    	
								    	{table.has('Category') ? <td className="text-left">{data.categories}</td> : null}
										{table.has('Region') ? <td className="text-left">{data.region}</td> : null}
								      	{table.has('Status') ? <td className="text-left">{data.status}</td> : null}
										{table.has('Publication Count') ? <td className="text-left">{data.publicationCount}</td> : null}
								      	{table.has('Investor Count') ? <td className="text-left">{data.investorCount}</td> : null}
								      	{table.has('Description') ? <td className="text-left">{data.description}</td> : null}
								    	{table.has('Rank Score') ? <td className="text-left">{(data.score).toFixed(2)}</td> : null}
							    	</tr>
				    			)
				    		})
				    	}
					</tbody>
				</table>
			</div>
		)
	}
} 

const mapStateToProps = state => ({
	columns: state.filter.columns,
	numberOfShowPerPage: state.pagination.numberOfShowPerPage,
	currentPage: state.pagination.currentPage,
	lastPage: state.pagination.lastPage
})

export default connect(mapStateToProps)(Table)

