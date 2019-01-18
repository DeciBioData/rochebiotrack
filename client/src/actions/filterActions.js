import { 
	FILTER_NAME, FILTER_DESCRIPTION, FILTER_DROPDOWNOPTIONS, CLEAR_ALL,
	CLEAR_DROPDOWNOPTIONS, CLEAR_SLIDERS, FILL_COLUMN, FILTER_SLIDERS, CHANGE_RANK_WEIGHTS
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

export const clearSliders = (type) => dispatch => {
	dispatch({
		type: CLEAR_SLIDERS,
		payload: type
	})
}

export const clearAll = () => dispatch => {
	dispatch({
		type: CLEAR_ALL,
		payload: null
	})
}

export const fillColumn = () => dispatch => {
	dispatch({
		type: FILL_COLUMN,
		payload: null
	})
}

export const filterSliders = (type, newRange) => dispatch => {
	dispatch({
		type: FILTER_SLIDERS,
		payload: {
			type,
			newRange
		}
	})
}

export const changeRankWeights = (type, value) => dispatch => {
	dispatch({
		type: CHANGE_RANK_WEIGHTS,
		payload: {
			type,
			value
		}
	})
}


















