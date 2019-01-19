import { FETCH_DATA, UPDATE_DATA, SORT_DATA, FETCH_COMPANY } from './types'
import companies from '../companies.json'

const apiPath = 'https://api.crunchbase.com/v3.1/organizations'
const apiKey = '50a32d84dbc41c930267958491d132c4'

const getScore = (company, rankWeights = {
    totalFunding: 3,
    timeSinceLastFunding: 0,
    timeSinceFounding:3,
    valuation: 0,
    investorCount: 3,
    teamRank: 2,
    employeeCount: 0,
    publicationCount: 0
}) => {

    const { 
      totalFundingPercentile, timeSinceLastFundingPercentile, valuationPercentile, 
      investorCountPercentile, teamRankPercentile, employeeCountPercentile, publicationCountPercentile,
      timeSinceFoundingPercentile
    } = company

    const {
        totalFunding, timeSinceLastFunding, valuation,
        investorCount, teamRank, employeeCount, publicationCount, timeSinceFounding
    } = rankWeights

    let result = (totalFunding * parseFloat(totalFundingPercentile)) + (timeSinceLastFunding * parseFloat(timeSinceLastFundingPercentile)) +
            (valuation * parseFloat(valuationPercentile)) + (investorCount * parseFloat(investorCountPercentile)) + (teamRank * parseFloat(teamRankPercentile)) + 
            (employeeCount * parseFloat(employeeCountPercentile)) + (publicationCount * parseFloat(publicationCountPercentile)) +
            (timeSinceFounding * parseFloat(timeSinceFoundingPercentile))

    return result
}

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
	
    companyData.sort((a, b) => getScore(b) - getScore(a))
    companyData.forEach((company, index) => company.rank = index + 1)
    companyData.forEach((company) => company.score = getScore(company))

	dispatch({
		type: FETCH_DATA,
		payload: companyData
	})
}

export const updateData = (companies, filters) => dispatch => {

    const matchPrefix = (prefix, str) => {
      if(!prefix.match(/^[a-zA-Z]+$/) && !prefix.match(/^[0-9]+$/)) return false
      prefix = prefix.toLowerCase()
      str = str.toLowerCase()

      let search = prefix.split(" ")

      for (let i = 0, len = search.length; i < len; i++) {
        let regex = new RegExp(search[i], 'i')
        if (regex.test(str) === false) {
          return false
        }
      }

      return true
    }

    const includeInArray = (list1, list2) => {
      let set = new Set(list1)
      for(let i = 0; i < list2.length; i++) {
        if(set.has(list2[i])) return true
      }
      return false
    }

	let processedData = []
    for(let i = 0; i < companies.length; i++) {
      let data = companies[i]

      if(filters.yearFounded[0] == 2000) { filters.yearFounded[0] = 0 }
      if(filters.name != "" && !matchPrefix(filters.name, data.name)) continue
      if(filters.description != "" && !matchPrefix(filters.description, data.description)) continue
      if(filters.employeeCount.length != 0 && filters.employeeCount.indexOf(data.employeeCount) == -1) continue
      if(filters.category.length != 0 && !includeInArray(filters.category, data.categories.split(','))) continue
      if(filters.country.length != 0 && !includeInArray(filters.country, data.country.split(','))) continue
      if(filters.status.length != 0 && !includeInArray(filters.status, data.status.split(','))) continue
      if(filters.region.length != 0 && !includeInArray(filters.region, data.region.split(','))) continue
      if(filters.totalFunding[0] > parseInt(data.totalFunding) || filters.totalFunding[1] < parseInt(data.totalFunding)) continue
      if(filters.rounds[0] > parseInt(data.rounds) || filters.rounds[1] < parseInt(data.rounds)) continue
      if(filters.reportedValuation[0] > parseInt(data.reportedValuation) || filters.reportedValuation[1] < parseInt(data.reportedValuation)) continue
      if(filters.yearFounded[0] > parseInt(data.yearOfFound) || filters.yearFounded[1] < parseInt(data.yearOfFound)) continue
      if(filters.publicationCount[0] > parseInt(data.publicationCount) || filters.publicationCount[1] < parseInt(data.publicationCount)) continue

      processedData.push(data)
    }

	dispatch({
		type: UPDATE_DATA,
		payload: processedData
	})
}

export const sortData = (companies, rankWeights) => dispatch => {

    companies.sort((a, b) => getScore(b, rankWeights) - getScore(a, rankWeights))
    companies.forEach((company) => company.score = getScore(company, rankWeights))

    dispatch({
    	type: SORT_DATA,
    	payload: companies
    })
}

export const fetchCompany = (id) => dispatch => {
  fetch(`${apiPath}/${id}?user_key=${apiKey}`)
   .then(response => response.json())
   .then(dataSet => {
        const properties = dataSet.data.properties
        const relationships = dataSet.data.relationships

        const name = properties.name
        const imageURL = properties.profile_image_url
        const description = properties.description
        const foundedOn = properties.founded_on ? properties.founded_on.split('-')[0] : 'Unknown'
        const employeeCount = properties.num_employees_min && properties.num_employees_max ? `${properties.num_employees_min}-${properties.num_employees_max}` : 'Unknown'
        const totalFunding = properties.total_funding_usd

        const location = relationships.offices.item ? relationships.offices.item.properties : null
        const news = relationships.news.items
        const websites = relationships.websites.items
        const funding = relationships.funding_rounds.items
        const teams = relationships.featured_team.items
        const categoriesList = relationships.categories.items //inside the "category_group"
        const lastFunding = funding.length == 0 ? 'None' : funding[0].properties.announced_on ? funding[0].properties.announced_on.split('-')[0] : 'None'
        const reportedValuation = funding.length == 0 ? 'None' : funding[0].properties.pre_money_valuation_usd ? funding[0].properties.pre_money_valuation_usd : 'None'

        const categories = categoriesList.map((category) => {
            let list = category.properties.category_groups
            let mySet = new Set(list)
            let array = Array.from(mySet)
            return array
        })

        let companyInfo = {
            id, name, imageURL, description, foundedOn, employeeCount, totalFunding, websites,
            location: location ? `${location.region}, ${location.country}` : '', news, funding, 
            teams, categories, lastFunding, reportedValuation            
        }

        dispatch({
          type: FETCH_COMPANY,
          payload: companyInfo
       })    
    })
}
























