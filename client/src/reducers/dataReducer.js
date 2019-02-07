/* eslint-disable */
import { FETCH_DATA, UPDATE_DATA, SORT_DATA, FETCH_COMPANY, GET_SIZE } from '../actions/types'

const initialState = {
	companies: [],
	companySize: 0,
	companyInfo: {},
	onLoad: true
}

export default function(state = initialState, action) {
	switch(action.type) {
		case FETCH_DATA:
			return {
				...state,
				companies: action.payload,
				onLoad: false
			}
			break
		case UPDATE_DATA:
			return {
				...state,
				companies: action.payload.companies,
				companySize: action.payload.size
			}
			break
		case FETCH_COMPANY:
			return {
				...state,
				companyInfo: action.payload
			}
			break
		case GET_SIZE:
			return  {
				...state,
				companySize: action.payload
			}
		default:
			return state
			break
	}
}