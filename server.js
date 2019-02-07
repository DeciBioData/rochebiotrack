const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const companies = require('./companies.json')

const app = express();

app.use(bodyParser.json({limit: '60mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '60mb', extended: true}));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

//fix XHTTP across origin header problem
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//helper functions
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

const matchPrefix = (prefix, str) => {
  if(!prefix.match(/^[a-zA-Z0-9\s]+$/)) return false
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

const returnPartialData = (processedCompanyData, page) => {
	let sortedData = processedCompanyData.slice()
	sortedData.forEach((data, index) => data.rank = index + 1)

	let endEntry = page * numberOfShowPerPage
	let startEntry = endEntry - numberOfShowPerPage
	returnData = sortedData.slice(startEntry, endEntry)
	return returnData
}

//global variables
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
let processedCompanyData = companyData

const numberOfShowPerPage = 50
let currentPage = 1
let returnData = processedCompanyData

// An api endpoint that returns a short list of items
app.get('/api/fetch_companies/:page', (req, res) => {
	currentPage = req.params.page
	res.json(returnPartialData(processedCompanyData, req.params.page))
})

app.get('/api/get_companies_size', (req, res) => {
	res.json({ size: processedCompanyData.length })
})

app.post('/api/update_companies', (req, res) => {
	let companies = companyData
	let filters = req.body

	let processedData = []
    for(let i = 0; i < companies.length; i++) {
      let data = companies[i]

      if(filters.yearFounded[0] === 2000) { filters.yearFounded[0] = 0 }
      if(filters.name !== "" && !matchPrefix(filters.name, data.name)) continue
      if(filters.description !== "" && !matchPrefix(filters.description, data.description)) continue
      if(filters.employeeCount.length !== 0 && filters.employeeCount.indexOf(data.employeeCount) === -1) continue
      if(filters.category.length !== 0 && !includeInArray(filters.category, data.categories.split(','))) continue
      if(filters.country.length !== 0 && !includeInArray(filters.country, data.country.split(','))) continue
      if(filters.status.length !== 0 && !includeInArray(filters.status, data.status.split(','))) continue
      if(filters.region.length !== 0 && !includeInArray(filters.region, data.region.split(','))) continue
      if(filters.totalFunding[0] > parseInt(data.totalFunding) || filters.totalFunding[1] < parseInt(data.totalFunding)) continue
      if(filters.rounds[0] > parseInt(data.rounds) || filters.rounds[1] < parseInt(data.rounds)) continue
      if(filters.reportedValuation[0] > parseInt(data.reportedValuation) || filters.reportedValuation[1] < parseInt(data.reportedValuation)) continue
      if(filters.yearFounded[0] > parseInt(data.yearOfFound) || filters.yearFounded[1] < parseInt(data.yearOfFound)) continue
      if(filters.publicationCount[0] > parseInt(data.publicationCount) || filters.publicationCount[1] < parseInt(data.publicationCount)) continue

      processedData.push(data)
    }
    processedCompanyData = processedData
    res.json({ companies: returnPartialData(processedCompanyData, currentPage), size: processedCompanyData.length })
})

app.post('/api/sort_companies', (req, res) => {
	let companies = companyData
	let rankWeights = req.body

	companies.sort((a, b) => getScore(b, rankWeights) - getScore(a, rankWeights))
    companies.forEach((company) => company.score = getScore(company, rankWeights))

    companyData = companies
    res.json({ message: "sort the companies"})
})


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);