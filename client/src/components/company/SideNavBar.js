/* eslint-disable */
import React from 'react'

const SideNavBar = ({companyInfo}) => {
	return (
		<div>
			<div className="side-nav with-shadow-light">
				<div className="company-count row">
					<h6 className="col-md-6 col-6 col-sm-6"><strong>{ companyInfo.name }</strong></h6>
					<div className="col-md-6 col-6 col-sm-6">{companyInfo.imageURL ? <img className="img-fluid rounded company-img" src={companyInfo.imageURL}/> : ''}</div>
				</div>
				<div className="company-search row">
				  	<div className="col-md-6 col-6 col-sm-6"><h6><strong>{companyInfo.location}</strong></h6></div>
				  	<div className="col-md-6 col-6 col-sm-6">
				  	{
				  		companyInfo.websites.map((website, index) => {
				  			let webInfo = website.properties
				  			let icon = webInfo.website_name.toLowerCase() == 'homepage' ? 'fa fa-share-alt' : `fa fa-${(webInfo.website_name).toLowerCase()}-square`
				  			return (
				  				<a key={index} href={webInfo.url} className="webLink" target="_blank">
				  					<i className={icon}></i>
				  				</a>
				  			)
				  		})
				  	}
				  	</div>					
				</div>
				<hr />
				<div className="sideMenu">
					<h6><strong>Company Details</strong></h6>		
				</div>
				<div className="list-group">
				  <a href={`/company/${companyInfo.id}`} className="list-group-item list-group-item-action border-0">Overview</a>
				  <a href={`/company/${companyInfo.id}/funding`} className="list-group-item list-group-item-action border-0">Funding</a>
				  <a href={`/company/${companyInfo.id}/team`} className="list-group-item list-group-item-action border-0">Team</a>
				  <a href={`/company/${companyInfo.id}/publication`} className="list-group-item list-group-item-action border-0">Publications</a>
				</div>
			</div>
		</div>
	)
}

export default SideNavBar