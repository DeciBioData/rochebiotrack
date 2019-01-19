/* eslint-disable */
import React from 'react'

const Heading = ({companyInfo}) => {
	const formatDollar = (num) => {
		num = parseInt(num)
		if(isNaN(num)) return "(None)"
		if(num >= 1000000000) return `$${Math.round(num / 1000000000)}B`
		else if(num >= 1000000) return `$${Math.round(num / 1000000)}M`
		else if(num >= 1000) return `$${Math.round(num / 1000)}K`
		return `$${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
	}

	const { 
		id, name, imageURL, description, foundedOn, employeeCount, totalFunding, websites, funding, categories, lastFunding, reportedValuation
	} = companyInfo
	return (
		<div>
		  	<p>
		  		<strong>
			  	Founded on: {foundedOn} | Last Funding: {lastFunding} | Employee Count: {employeeCount} | Total Funding: {formatDollar(parseInt(totalFunding))} | 
			  	Reported Valuation: {formatDollar(parseInt(reportedValuation))}
			  	</strong>
		  	</p>
		</div>
	)	
}

export default Heading