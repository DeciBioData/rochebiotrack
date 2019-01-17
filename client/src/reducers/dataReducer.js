import { FETCH_DATA } from '../actions/types'

const initialState = {
	companies: [],
	onLoad: false
}

export default function(state = initialState, action) {
	switch(action.type) {
		case FETCH_DATA:
			return {
				...state,
				companies: action.payload,
				onLoad: true
			}
			break
		default:
			return state
			break
	}
}