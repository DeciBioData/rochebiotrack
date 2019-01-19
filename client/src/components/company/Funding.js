/* eslint-disable */
import React from 'react'
import { formatDollar } from '../../actions/otherActions'

const Funding = ({companyInfo}) => {
	return (
		<div>
			<div className="description-header">
				<span className="customize-h3">Company Funding</span>
			</div>
			{
				companyInfo.funding.length == 0 ? <p className="description-body">(No content)</p> :
				(
					<table className="table">
					  <thead className="table-heading">
					    <tr>
					      <th scope="col">Year</th>
					      <th scope="col">Investment Type</th>
					      <th scope="col">Investors</th>
					      <th scope="col">Funding</th>
					    </tr>
					  </thead>
					  <tbody>
					  	{
					  		companyInfo.funding.map((fund, index) => {
					  			let year = fund.properties.announced_on.split('-')[0]
					  			let type = `${fund.properties.funding_type}`
					  			let money = fund.properties.money_raised_usd ? formatDollar(parseInt(fund.properties.money_raised_usd)) : '$0'
					  			let investments = fund.relationships ? fund.relationships.investments : [] //this is an array

					  			let investors = investments.map((investment) => {
					  				return investment.relationships.investors.properties.name
					  			})

					  			let investor = investors.length == 0 ? 'Unknown' : investors.join(", ")
					  			
					  			return(
								    <tr key={index}>
								      <td>{year}</td>
								      <td>{type}</td>
								      <td>{investor}</td>
								      <td>{money}</td>
								    </tr>
					  			)
					  		})
					  	}
					  	<tr>
					  		<td colSpan="3">Grand Total</td>
					  		<td>{formatDollar(parseInt(companyInfo.totalFunding))}</td>
					  	</tr>
					  </tbody>
					</table>
				)
			}
		</div>
	)
}

export default Funding