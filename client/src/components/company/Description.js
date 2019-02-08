/* eslint-disable */
import React from 'react'
import Heading from './Heading'

const Description = ({companyInfo}) => {
	return (
		<div>
			<div className="description-header">
				<span className="customize-h3">Company Overview</span>
				<Heading companyInfo={companyInfo}/>
				<div className="categoryTags-section">
					<ul className="tags-list">
					{
						companyInfo.categories.map((category, index) => {
							return (
								<li key={index} className="filterTags">
									<span className="badge badge-light">{category}</span>
								</li>
							)
						})
					}
					</ul>
				</div>
			</div>
			<div className="description-body">
				<p>{companyInfo.description ? companyInfo.description : <span>(No Company Overview)</span>}</p>
			</div>
			<hr />
			<span className="customize-h3">Latest Updates</span>
			{
				companyInfo.news.length == 0 ? <p className="description-body">(No News)</p> :
				(
					<table className="table">
					  <thead className="table-heading">
					    <tr>
					      <th scope="col" className="text-right">Date</th>
					      <th scope="col" className="text-left">Title</th>
					    </tr>
					  </thead>
					  <tbody>
					  	{
					  		companyInfo.news.map((news, index) => {
					  			let date = news.properties.posted_on
					  			let title = news.properties.title
					  			let link = news.properties.url
					  			
					  			return(
								    <tr key={index}>
								      <td className="text-right">{date}</td>
								      <td className="text-left"><a href={link} target="_blank">{title}</a></td>
								    </tr>
					  			)
					  		})
					  	}
					  </tbody>
					</table>
				)
			}
		</div>
	)
}

export default Description