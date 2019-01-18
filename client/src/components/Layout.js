import React from 'react'

import Table from './home/table/Table'
import Filter from './home/filters/Filter'
import TableInfo from './home/table_info/TableInfo'
import Pagination from './home/pagination/Pagination'
import Header from './home/header/Header'
import Footer from './home/footer/Footer'

const Layout = () => {
	return (
		<div>
			<Header />
			<div className="container-fluid row main">
				<div className="col-md-3">
					<div className="side-section">
						<Filter />
					</div>
				</div>
				<div className="col-md-9">
					<div className="data-table">
						<TableInfo />
						<Table />
						<Pagination />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Layout