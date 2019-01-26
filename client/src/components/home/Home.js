import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../../actions/dataActions'

import Table from './table/Table'
import Filter from './filters/Filter'
import Header from '../header/Header'
import TableInfo from './table_info/TableInfo'
import Pagination from './pagination/Pagination'
import LoadingSpinner from '../others/LoadingSpinner'

class Layout extends Component {

	componentDidMount() {
		this.props.fetchData()
	}

	render() {
		if(this.props.onLoad) return <div className="spinner"><LoadingSpinner/></div>
		return (
			<div>
				<div className="container-fluid row main">
					<div className="col-md-3">
						<div className="side-section">
							<Filter />
						</div>
					</div>
					<div className="col-md-9">
						<div className="data-table">
							<TableInfo />
							<Table companies={this.props.companies}/>
							<Pagination />
						</div>
					</div>
				</div>
			</div>
		)		
	}
}

const mapStateToProps = state => ({
	companies: state.data.processedCompanies,
	onLoad: state.data.onLoad
})

export default connect(mapStateToProps, { fetchData })(Layout)