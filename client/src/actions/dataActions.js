import { FETCH_DATA, UPDATE_DATA, FETCH_COMPANY, GET_SIZE } from './types'

const apiPath = 'https://api.crunchbase.com/v3.1/organizations'
const apiKey = `${process.env.REACT_APP_CRUNCHBASE_API_KEY}`

export const fetchData = (page) => dispatch => {
    fetch(`/api/fetch_companies/${page}`, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }).then(response => response.json())
    .then(companies => {
      dispatch({
        type: FETCH_DATA,
        payload: companies
      })
    })
}

export const updateData = (filters) => dispatch => {
    fetch('/api/update_companies', {
      method: 'POST',
      body: JSON.stringify(filters),
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }).then(response => response.json())
    .then((result) => { 
        dispatch({
            type: UPDATE_DATA,
            payload: result
        })
    })
}

export const getSize = () => dispatch => {
  fetch('/api/get_companies_size',{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }).then(response => response.json())
    .then((result) => {
      dispatch({
        type: GET_SIZE,
        payload: result.size
      })
    })
}

export const sortData = (rankWeights) => dispatch => {
  fetch('/api/sort_companies', {
    method: 'POST',
    body: JSON.stringify(rankWeights),
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
  }).then(response => response.json())
  .then(result => console.log())
}

export const fetchCompany = (id) => dispatch => {
  console.log(apiKey)
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
        const lastFunding = funding.length === 0 ? 'None' : funding[0].properties.announced_on ? funding[0].properties.announced_on.split('-')[0] : 'None'
        const reportedValuation = funding.length === 0 ? 'None' : funding[0].properties.pre_money_valuation_usd ? funding[0].properties.pre_money_valuation_usd : 'None'

        const list = categoriesList.map((category) => {
            let list = category.properties.category_groups
            let mySet = new Set(list)
            let array = Array.from(mySet)
            return array
        })

        const categories = []
        list.forEach((elm) => {
          categories.push(...elm)
        })

        let companyInfo = {
            id, name, imageURL, description, foundedOn, employeeCount, totalFunding, websites,
            location: location ? `${location.region}, ${location.country}` : '', news, funding, 
            teams, categories: [...new Set(categories)], lastFunding, reportedValuation            
        }

        dispatch({
          type: FETCH_COMPANY,
          payload: companyInfo,
          meta: {
            mixpanel: {
              event: 'Click Company',
              props: {
                id: companyInfo.id,
                name: companyInfo.name
              }
            }
          }
       })    
    })
}
























