import { FETCH_DATA } from './types'

import companies from '../companies.json'

export const fetchData = () => dispatch => {
	// fetch('http://localhost:5000/api', {
 //      headers : { 
 //        'Content-Type': 'application/json',
 //        'Accept': 'application/json'
 //       }
 //    })
	// 	.then(response => response.json())
	// 	.then(companies => dispatch({
	// 		type: FETCH_DATA,
	// 		payload: companies
	// 	}))

	let companyData = companies.map((dataSet, index) => ({
		name: dataSet["Company Name"],
		description: dataSet["short_description"],
		yearOfFound: dataSet["Year of Founded"],
		employeeCount: dataSet["Employee Count"],
		yearOfLastFund: dataSet["Year of Last Funding"],
		categories: dataSet["Category List"],
		country: dataSet["country"],
		region: dataSet["region"],
		status: dataSet["status"],
		rank: dataSet["Rank"],
		rounds: dataSet["Rounds"],
		totalFunding: dataSet["Total Funding"],
		reportedValuation: dataSet["Reported Valuation"],
		publicationCount: dataSet["Publication Count"],
		investorCount: dataSet["Investor Count"],
		teamRank: dataSet["Avg- Team Rank"],
		totalFundingPercentile: dataSet["Total Funding- Percentile"],
		timeSinceLastFundingPercentile: dataSet["Time since Last Funding - Percentile"],
		timeSinceFoundingPercentile: dataSet["Time since Founding - Percentile"],
		valuationPercentile: dataSet["Valuation- Percentile"],
		investorCountPercentile: dataSet["Investor Count - Percentile"],
		teamRankPercentile: dataSet["Avg- Team Rank - Percentile"],
		employeeCountPercentile: dataSet["Avg- Employee Count - Percentile"],
		publicationCountPercentile: dataSet["Publication Count- Percentile"],
		uuid: dataSet["UUID"]
	})) || []
	
	dispatch({
		type: FETCH_DATA,
		payload: companyData
	})
}