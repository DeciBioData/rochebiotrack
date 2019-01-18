import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDollar, exportExcel } from '../../../actions/otherActions'
import { clearSliders, clearDropdownOptions, clearAll } from '../../../actions/filterActions'

class TableInfo extends Component {

	constructor(props) {
		super(props)
		this.state = {
			employeeCount: props.filters.employeeCount.length == 0 ? null : props.filters.employeeCount,
			category: props.filters.category.length == 0 ? null : props.filters.category,
			country: props.filters.country.length == 0 ? null : props.filters.country,
			status: props.filters.status.length == 0 ? null : props.filters.status,
			region: props.filters.region.length == 0 ? null : props.filters.region,
			totalFunding: props.filters.totalFunding[0] == 0 && props.filters.totalFunding[1] == 6000000000 ? null : props.filters.totalFunding,
			rounds: props.filters.rounds[0] == 0 && props.filters.rounds[1] == 30 ? null : props.filters.rounds,
			reportedValuation: props.filters.reportedValuation[0] == 0 && props.filters.reportedValuation[1] == 150000000000 ? null : props.filters.reportedValuation,
			yearFounded: props.filters.yearFounded[0] == 2000 && props.filters.yearFounded[1] == 2018 || props.filters.yearFounded[0] == 0 && props.filters.yearFounded[1] == 2018 ? null : props.filters.yearFounded,
			publicationCount: props.filters.publicationCount[0] == 0 && props.filters.publicationCount[1] == 5000 ? null : props.filters.publicationCount
		}
	}

	componentWillReceiveProps(nextProps) {
		const { filters } = nextProps
		this.setState({
			employeeCount: filters.employeeCount.length == 0 ? null : filters.employeeCount,
			category: filters.category.length == 0 ? null : filters.category,
			country: filters.country.length == 0 ? null : filters.country,
			status: filters.status.length == 0 ? null : filters.status,
			region: filters.region.length == 0 ? null : filters.region,
			totalFunding: filters.totalFunding[0] == 0 && filters.totalFunding[1] == 6000000000 ? null : filters.totalFunding,
			rounds: filters.rounds[0] == 0 && filters.rounds[1] == 30 ? null : filters.rounds,
			reportedValuation: filters.reportedValuation[0] == 0 && filters.reportedValuation[1] == 150000000000 ? null : filters.reportedValuation,
			yearFounded: filters.yearFounded[0] == 2000 && filters.yearFounded[1] == 2018 || filters.yearFounded[0] == 0 && filters.yearFounded[1] == 2018 ? null : filters.yearFounded,
			publicationCount:filters.publicationCount[0] == 0 && filters.publicationCount[1] == 5000 ? null : filters.publicationCount
		})
	}

	clearFilters(name, type, content) {
		const dropdownList = ["Employee Count", "Category", "Country", "Status", "Region"]
		const sliderList = ["Total Funding", "Rounds", "Reported Valuation", "Year Founded", "Publication"]

		if(dropdownList.indexOf(name) != -1) {
			this.props.clearDropdownOptions(type, content)
			document.getElementById(`${type}-${content}`).checked = false
		}
		else {
			this.props.clearSliders(type)
		}
	}

	clearAllFilter() {
		let inputs = document.querySelectorAll('input[type=checkbox]')
		for (let i = 0; i < inputs.length; i++) {
			inputs[i].checked = false;
		}
		this.props.clearAll()
	}

	exportExcel(data, col) {
		exportExcel(data, col)
	}

	render() {
		const { employeeCount, category, country, status, region, totalFunding, rounds, reportedValuation, yearFounded, publicationCount } = this.props.filters
		const showItems = []

		if(employeeCount.length != 0) {
			employeeCount.forEach((data) => {
				showItems.push({ name: "Employee Count", type:"employeeCount" ,content: data })
			})
		}
		if(category.length != 0) {
			category.forEach((data) => {
				showItems.push({ name: "Category", type:"category" ,content: data })
			})
		}

		if(country.length != 0) {
			country.forEach((data) => {
				showItems.push({ name: "Country", type:"country" ,content: data })
			})
		}

		if(status.length != 0) {
			status.forEach((data) => {
				showItems.push({ name: "Status", type:"status" ,content: data })
			})
		}

		if(region.length != 0) {
			region.forEach((data) => {
				showItems.push({ name: "Region", type:"region" ,content: data })
			})
		}

		if(totalFunding[0] != 0 || totalFunding[1] != 6000000000) showItems.push({ name: "Total Funding", type:"totalFunding", content: `${formatDollar(parseInt(totalFunding[0]))} - ${formatDollar(parseInt(totalFunding[1]))}`})
		if(rounds[0] != 0 || rounds[1] != 30) showItems.push({ name: "Rounds", type: "rounds", content: `${parseInt(rounds[0])} - ${parseInt(rounds[1])}`})
		if(reportedValuation[0] != 0 || reportedValuation[1] != 150000000000) showItems.push({ name: "Reported Valuation", type: "reportedValuation", content: `${formatDollar(parseInt(reportedValuation[0]))} - ${formatDollar(parseInt(reportedValuation[1]))}`})
		if(!(yearFounded[0] == 2000 && yearFounded[1] == 2018 || yearFounded[0] == 0 && yearFounded[1] == 2018)) showItems.push({ name: "Year Founded", type: "yearFounded", content: `${parseInt(yearFounded[0])} - ${parseInt(yearFounded[1])}`})
		if(publicationCount[0] != 0 || publicationCount[1] != 5000) showItems.push({ name: "Publication Count", type: "publicationCount", content: `${parseInt(publicationCount[0])} - ${parseInt(publicationCount[1])}`})

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
					{ showItems.length == 0 ? '' : 
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
	companies: state.data.processedCompanies,
	filters: state.filter.filters
})

export default connect(mapStateToProps, { clearSliders, clearDropdownOptions, clearAll })(TableInfo)

