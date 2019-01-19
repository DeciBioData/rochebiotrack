import React from 'react'

import Table from './table/Table'
import Filter from './filters/Filter'
import TableInfo from './table_info/TableInfo'
import Pagination from './pagination/Pagination'

const Layout = () => {
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
						<Table />
						<Pagination />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Layout