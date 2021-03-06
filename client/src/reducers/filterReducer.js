/* eslint-disable */
import { 
	FILTER_NAME, FILTER_DESCRIPTION, FILTER_DROPDOWNOPTIONS, CLEAR_ALL,
	CLEAR_DROPDOWNOPTIONS, CLEAR_SLIDERS, FILL_COLUMN, FILTER_SLIDERS, CHANGE_RANK_WEIGHTS
} from '../actions/types'

const initialState = {
	filters: {
	    name: "",
	    description: "",
	    employeeCount: [],
	    category: [],
	    country: [],
	    status: [],
	    region: [],
	    totalFunding: [0, 6000000000],
	    rounds: [0, 30],
	    reportedValuation: [0, 150000000000],
	    yearFounded: [2000, 2018],
	    publicationCount: [0, 5000]
	},
  columns: [
    "Rank","Company Name", "Country","Founded","Last Funding",
    "Employee Count", "Rounds", "Total Funding"
  ],
  rankWeights: {
    totalFunding: 3,
    timeSinceLastFunding: 0,
    timeSinceFounding:3,
    valuation: 0,
    investorCount: 3,
    teamRank: 2,
    employeeCount: 0,
    publicationCount: 0
  }
}

export default function(state = initialState, action) {
	switch(action.type) {

		case FILTER_NAME:
			state.filters.name = action.payload
			return {
				...state,
				filters: state.filters
			}
			break

		case FILTER_DESCRIPTION:
			state.filters.description = action.payload
			return {
				...state,
				filters: state.filters
			}
			break

		case FILTER_DROPDOWNOPTIONS:
			switch(action.payload.type) {
				case 'column':
				    let typeIndex = state.columns.indexOf(action.payload.item)
				    if(typeIndex === -1) state.columns.push(action.payload.item)
				    else {
				      state.columns.splice(typeIndex, 1)
				    }
				    return {
				    	...state,
				    	columns: state.columns
				    }
					break
				default:
				    typeIndex = state.filters[action.payload.type].indexOf(action.payload.item)
				    if(typeIndex === -1) state.filters[action.payload.type].push(action.payload.item)
				    else {
				      state.filters[action.payload.type].splice(typeIndex, 1)
				    }
					return {
						...state,
						filters: state.filters
					}
					break
			}
			break

		case CLEAR_DROPDOWNOPTIONS:
			switch(action.payload) {
				case 'column':
			    return {
			    	...state,
			    	columns: ["Rank","Company Name", "Country","Founded","Last Funding","Employee Count", "Rounds", "Total Funding"]
			    }
					break
				default:
					state.filters[action.payload] = []
					return {
						...state,
						filters: state.filters
					}
					break
			}
			break

		case CLEAR_SLIDERS:
			let defaultRange = {
			    totalFunding: [0, 6000000000],
			    rounds: [0, 30],
			    reportedValuation: [0, 150000000000],
			    yearFounded: [2000, 2018],
			    publicationCount: [0, 5000]				
			}			
			state.filters[action.payload] = defaultRange[action.payload]
			return {
				...state,
				filters: state.filters
			}
			break

		case CLEAR_ALL:
			let { filters } = state
			filters.employeeCount = []
			filters.category = []
			filters.status = []
			filters.country = []
			filters.region = []
			filters.totalFunding = [0, 6000000000]
			filters.rounds = [0, 30]
			filters.reportedValuation = [0, 150000000000]
			filters.yearFounded = [2000, 2018]
			filters.publicationCount = [0, 5000]
			return {
				...state,
				filters: state.filters
			}
			break

		case FILL_COLUMN:
			return {
				...state,
				columns: [
			        "(All)", "Rank","Company Name","Description","Founded","Employee Count","Last Funding","Category","Country",
			        "Region","Status","Rounds","Total Funding","Reported Valuation","Publication Count","Investor Count", "Rank Score"
		    	]
			}
			break

		case FILTER_SLIDERS:
			switch(action.payload.type) {
				case "TotalFunding":
					state.filters.totalFunding = action.payload.newRange
					break
				case "Rounds":
					state.filters.rounds = action.payload.newRange
					break
				case "ReportedValuation":
					state.filters.reportedValuation = action.payload.newRange
					break
				case "YearFounded":
					state.filters.yearFounded = action.payload.newRange
					break
				case "Publication":
					state.filters.publicationCount = action.payload.newRange
					break
				default: break
			}
			return {
				...state,
				filters: state.filters
			}
			break

		case CHANGE_RANK_WEIGHTS:
			state.rankWeights[action.payload.type] = action.payload.value
			return {
				...state,
				rankWeights: state.rankWeights
			}
			break

		default:
			return state
			break
	}
}