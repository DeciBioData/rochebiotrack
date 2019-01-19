/* eslint-disable */
import { FETCH_DATA, UPDATE_DATA, SORT_DATA, FETCH_COMPANY } from '../actions/types'

const initialState = {
	companies: [],
	processedCompanies: [],
	companyInfo: {},
	onLoad: true
}

export default function(state = initialState, action) {
	switch(action.type) {
		case FETCH_DATA:
			return {
				...state,
				companies: action.payload,
				processedCompanies: action.payload,
				onLoad: false
			}
			break
		case UPDATE_DATA:
			return {
				...state,
				processedCompanies: action.payload
			}
			break
		case SORT_DATA:
			return {
				...state,
				companies: action.payload
			}
			break
		case FETCH_COMPANY:
			return {
				...state,
				companyInfo: action.payload
			}
		default:
			return state
			break
	}
}