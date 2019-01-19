import React from 'react'

const Footer = () => {
	return (
		<nav className="footer navbar fixed-bottom navbar-expand-lg navbar-dark">
		  <a className="navbar-brand" href="#">
		    {/* <img src="/DeciBio_Logo.png" width="75" className="d-inline-block align-top logo-img" /> */}
		  </a>
		  <div>
		  	<div className="mr-auto align-items-right footer-text">
				<strong>Powered by <a href="https://www.decibio.com" target="_blank">DeciBio Analytics</a></strong> | Company data provided by <a href="http://www.crunchbase.com" target="_blank"> Crunchbase</a>
			</div>
		  </div>
		</nav>
	)
}

export default Footer