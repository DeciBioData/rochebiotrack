import { ADD_COLUMN, DEL_COLUMN } from '../actions/types'

const initialState = {
	filters: {},
  columns: [
    "Rank","Company Name", "Country","Founded","Last Funding",
    "Employee Count", "Rounds", "Total Funding"
  ]
}

export default function(state = initialState, action) {
	switch(action.type) {
		case ADD_COLUMN:
			break
		case DEL_COLUMN:
			break
		default:
			return state
			break
	}
}