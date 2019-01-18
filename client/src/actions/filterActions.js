import { 
	FILTER_NAME, FILTER_DESCRIPTION, FILTER_DROPDOWNOPTIONS, CLEAR_DROPDOWNOPTIONS,
 	FILL_COLUMN
} from './types'

export const filterName = (name) => dispatch => {
	dispatch({
		type: FILTER_NAME,
		payload: name
	})
}

export const filterDescription = (description) => dispatch => {
	dispatch({
		type: FILTER_DESCRIPTION,
		payload: description
	})
}

export const filterDropdownOptions = (type, item) => dispatch => {
	dispatch({
		type: FILTER_DROPDOWNOPTIONS,
		payload: {
			type,
			item
		}
	})
}

export const clearDropdownOptions = (type) => dispatch => {
	dispatch({
		type: CLEAR_DROPDOWNOPTIONS,
		payload: type
	})
}

export const fillColumn = () => dispatch => {
	dispatch({
		type: FILL_COLUMN,
		payload: null
	})
}
