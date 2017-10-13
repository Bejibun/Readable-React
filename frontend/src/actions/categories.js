import API from 'src/api/api'
import * as ACTIONS from 'src/actions/types'

export function getCategories() {
	return dispatch =>
	API
	.get(`/categories`)
	.then(res => res.data)
	.then (
		data => dispatch(gotCategories(data.categories)),
		error => console.error(error)
	)
}

function gotCategories(data) {
	return {type: ACTIONS.TYPES_CATEGORIES_GOT,data}
}