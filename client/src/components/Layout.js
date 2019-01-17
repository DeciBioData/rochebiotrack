import React from 'react'

import Table from './home/table/Table'
import Pagination from './home/pagination/Pagination'
import Header from './home/header/Header'
import Footer from './home/footer/Footer'

const Layout = () => {
	return (
		<div>
			<Header />
			<div className="data-table">
				<Table />
				<Pagination />
			</div>
			<Footer />
		</div>
	)
}

export default Layout