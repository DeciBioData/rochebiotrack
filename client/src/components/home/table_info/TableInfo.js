import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDollar, exportExcel } from '../../../actions/otherActions'
import { clearSliders, filterDropdownOptions, clearAll } from '../../../actions/filterActions'
import { updateData } from "../../../actions/dataActions"

class TableInfo extends Component {

	constructor(props) {
		super(props)
		this.state = {
			employeeCount: props.filters.employeeCount.length === 0 ? null : props.filters.employeeCount,
			category: props.filters.category.length === 0 ? null : props.filters.category,
			country: props.filters.country.length === 0 ? null : props.filters.country,
			status: props.filters.status.length === 0 ? null : props.filters.status,
			region: props.filters.region.length === 0 ? null : props.filters.region,
			totalFunding: props.filters.totalFunding[0] === 0 && props.filters.totalFunding[1] === 6000000000 ? null : props.filters.totalFunding,
			rounds: props.filters.rounds[0] === 0 && props.filters.rounds[1] === 30 ? null : props.filters.rounds,
			reportedValuation: props.filters.reportedValuation[0] === 0 && props.filters.reportedValuation[1] === 150000000000 ? null : props.filters.reportedValuation,
			yearFounded: (props.filters.yearFounded[0] === 2000 && props.filters.yearFounded[1] === 2018) || (props.filters.yearFounded[0] === 0 && props.filters.yearFounded[1] === 2018) ? null : props.filters.yearFounded,
			publicationCount: props.filters.publicationCount[0] === 0 && props.filters.publicationCount[1] === 5000 ? null : props.filters.publicationCount
		}
	}

	componentWillReceiveProps(nextProps) {
		const { filters } = nextProps
		this.setState({
			employeeCount: filters.employeeCount.length === 0 ? null : filters.employeeCount,
			category: filters.category.length === 0 ? null : filters.category,
			country: filters.country.length === 0 ? null : filters.country,
			status: filters.status.length === 0 ? null : filters.status,
			region: filters.region.length === 0 ? null : filters.region,
			totalFunding: filters.totalFunding[0] === 0 && filters.totalFunding[1] === 6000000000 ? null : filters.totalFunding,
			rounds: filters.rounds[0] === 0 && filters.rounds[1] === 30 ? null : filters.rounds,
			reportedValuation: filters.reportedValuation[0] === 0 && filters.reportedValuation[1] === 150000000000 ? null : filters.reportedValuation,
			yearFounded: (filters.yearFounded[0] === 2000 && filters.yearFounded[1] === 2018) || (filters.yearFounded[0] === 0 && filters.yearFounded[1] === 2018) ? null : filters.yearFounded,
			publicationCount: filters.publicationCount[0] === 0 && filters.publicationCount[1] === 5000 ? null : filters.publicationCount
		})
	}

	clearFilters(name, type, content) {
		const dropdownList = ["Employee Count", "Category", "Country", "Status", "Region"]
		const sliderList = ["Total Funding", "Rounds", "Reported Valuation", "Year Founded", "Publication"]

		if(dropdownList.indexOf(name) !== -1) {
			this.props.filterDropdownOptions(type, content)
			document.getElementById(`${type}-${content}`).checked = false
		}
		else if(sliderList.indexOf(name) !== -1){
			this.props.clearSliders(type)
		}
		this.props.updateData(this.props.filters)
	}

	clearAllFilter() {
		let inputs = document.querySelectorAll('input[type=checkbox]')
		for (let i = 0; i < inputs.length; i++) {
			inputs[i].checked = false;
		}
		let columns = document.querySelectorAll('.columnCheckbox')
		const defaultList = ["Rank","Company Name", "Country","Founded","Last Funding","Employee Count", "Rounds", "Total Funding"]
		columns.forEach((input) => {
			if(defaultList.indexOf(input.value) !== -1) input.checked = true
		})
		this.props.clearAll()
		this.props.updateData(this.props.filters)
	}

	exportExcel(data, col) {
		exportExcel(data, col)
	}

	render() {
		const { employeeCount, category, country, status, region, totalFunding, rounds, reportedValuation, yearFounded, publicationCount } = this.state
		const showItems = []

		if(employeeCount) {
			employeeCount.forEach((data) => {
				showItems.push({ name: "Employee Count", type:"employeeCount" ,content: data })
			})
		}
		if(category) {
			category.forEach((data) => {
				showItems.push({ name: "Category", type:"category" ,content: data })
			})
		}

		if(country) {
			country.forEach((data) => {
				showItems.push({ name: "Country", type:"country" ,content: data })
			})
		}

		if(status) {
			status.forEach((data) => {
				showItems.push({ name: "Status", type:"status" ,content: data })
			})
		}

		if(region) {
			region.forEach((data) => {
				showItems.push({ name: "Region", type:"region" ,content: data })
			})
		}

		if(totalFunding) showItems.push({ name: "Total Funding", type:"totalFunding", content: `${formatDollar(parseInt(totalFunding[0]))} - ${formatDollar(parseInt(totalFunding[1]))}`})
		if(rounds) showItems.push({ name: "Rounds", type: "rounds", content: `${parseInt(rounds[0])} - ${parseInt(rounds[1])}`})
		if(reportedValuation) showItems.push({ name: "Reported Valuation", type: "reportedValuation", content: `${formatDollar(parseInt(reportedValuation[0]))} - ${formatDollar(parseInt(reportedValuation[1]))}`})
		if(yearFounded) showItems.push({ name: "Year Founded", type: "yearFounded", content: `${parseInt(yearFounded[0])} - ${parseInt(yearFounded[1])}`})
		if(publicationCount) showItems.push({ name: "Publication Count", type: "publicationCount", content: `${parseInt(publicationCount[0])} - ${parseInt(publicationCount[1])}`})

		return(
			<div className="tags-section">
				<ul className="tags-list">
					{
						showItems.map((item, index) => {
							return (
								<li key={index} className="filterTags">
									<span className="badge badge-light">
									  	{item.name}: {item.content}
									  	<button type="button" className="btn btn-sm btn-light" onClick={this.clearFilters.bind(this, item.name, item.type, item.content)}>
								    		<span className="text-dark"><span aria-hidden="true">&times;</span></span>
								  		</button>
									</span>
								</li>
							)
						})
					}
					{ showItems.length === 0 ? '' : 
						<li className="filterTags">
							<button className="buttons info-buttons" onClick={this.clearAllFilter.bind(this)}>CLEAR ALL</button> 
						</li>
					}
					<li className="filterTags export-button"><button className="buttons success-buttons my-2 my-sm-0" onClick={this.exportExcel.bind(this, this.props.companies, this.props.columns)}>Export Table</button></li>
				</ul>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	companies: state.data.companies,
	columns: state.filter.columns,
	filters: state.filter.filters
})

export default connect(mapStateToProps, { clearSliders, filterDropdownOptions, clearAll, updateData })(TableInfo)

