/* eslint-disable */
import React from 'react'
import People from './People'

const Team = ({companyInfo}) => {
	return (
		<div>
			<div className="description-header">
				<span className="customize-h3">Company Team</span>
			</div>
			{
				companyInfo.teams.length == 0 ? <p className="description-body">(No content)</p> :
				(
					<table className="table">
					  <thead className="table-heading">
					    <tr>
					      <th scope="col" className="text-left">Name</th>
					      <th scope="col" className="text-left">Primary Affliiation Title</th>
					      <th scope="col" className="text-right">People Rank</th>
					    </tr>
					  </thead>
					  <tbody>
					  	{
					  		companyInfo.teams.map((team, index) => {
					  			let relationships = team.relationships
					  			let properties = team.properties

					  			let uuid = relationships.person.uuid
					  			let firstName = relationships.person.properties.first_name
					  			let lastName = relationships.person.properties.last_name
					  			let name = `${firstName} ${lastName}`
					  			let title = properties.title
					  			let rank = (relationships.person.properties.rank).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
					  			return (
								    <tr key={index}>
								      <th scope="row" className="text-left"><People name={name} uuid={uuid}/></th>
								      <td className="text-left">{title}</td>
								      <td className="text-right">{rank}</td>
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

export default Team