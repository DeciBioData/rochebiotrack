import { FETCH_DATA, UPDATE_DATA } from '../actions/types'

const initialState = {
	companies: [],
	processedCompanies: [],
	onLoad: false
}

export default function(state = initialState, action) {
	switch(action.type) {
		case FETCH_DATA:
			return {
				...state,
				companies: action.payload,
				processedCompanies: action.payload,
				onLoad: true
			}
			break
		case UPDATE_DATA:
			return {
				...state,
				processedCompanies: action.payload
			}
			break
		default:
			return state
			break
	}
}