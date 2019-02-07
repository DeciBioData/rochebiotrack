import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchData, getSize } from '../../actions/dataActions'

import Table from './table/Table'
import Filter from './filters/Filter'
import TableInfo from './table_info/TableInfo'
import Pagination from './pagination/Pagination'
import LoadingSpinner from '../others/LoadingSpinner'

class Layout extends Component {
	componentDidMount() {
		this.props.getSize()
		this.props.fetchData(this.props.currentPage)
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.currentPage !== nextProps.currentPage) {
			this.props.getSize()
			this.props.fetchData(nextProps.currentPage)	
		}
	}

	render() {
		if(this.props.onLoad) return <div className="spinner"><LoadingSpinner/></div>
		return (
			<div>
				<div className="container-fluid row main">
					<div className="col-md-3">
						<div className="side-section">
							<Filter size={this.props.companySize}/>
						</div>
					</div>
					<div className="col-md-9">
						<div className="data-table">
							<TableInfo />
							<Table companies={this.props.companies}/>
							<Pagination size={this.props.companySize}/>
						</div>
					</div>
				</div>
			</div>
		)		
	}
}

const mapStateToProps = state => ({
	companies: state.data.companies,
	companySize: state.data.companySize,
	columns: state.filter.columns,
	currentPage: state.pagination.currentPage,
	onLoad: state.data.onLoad
})

export default connect(mapStateToProps, { fetchData, getSize })(Layout)