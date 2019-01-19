/* eslint-disable */
import React, { Component } from 'react'

class Publication extends Component {

	constructor(props) {
		super(props)
		this.apiPath = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${props.companyInfo.name}%5BAffiliation%5D&retmode=json&api_key=89b2d3b33f952c1c79bc234c0831e475c408`
		this.state = {
			count: 0,
			publication: []
		}
	}

	async componentDidMount() {
		const publicationSet = await fetch(this.apiPath)
		const publicationData = await publicationSet.json()

		const count = publicationData.esearchresult.count
		const publicationId = publicationData.esearchresult.idlist

		Promise.all(publicationId.slice(0,5).map((id) => fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${id}&retmode=json&api_key=89b2d3b33f952c1c79bc234c0831e475c408`)))
			.then(responses => Promise.all(responses.map(res => res.json())))
			.then(publication => {
				this.setState({ count, publication })								
			})
	}

	render() {
		return (
			<div>
				<div className="description-header">
					<span className="customize-h3">Company Publication</span>
				</div>
				<div className="description-body">
					<p>Total Count: {this.state.count}</p>
				</div>
				<hr />
				<span className="customize-h3">Latest Publications</span>
				{
					this.state.publication.length == 0 ? <p className="description-body">(No content)</p> :
					(
						<table className="table">
						  <thead className="table-heading">
						    <tr>
						      <th scope="col" className="text-right">Date</th>
						      <th scope="col" className="text-right">PMID</th>
						      <th scope="col" className="text-left">Title</th>
						    </tr>
						  </thead>
						  <tbody>
						  	{
						  		this.state.publication.map((data, index) => {
						  			let result = data.result
						  			let key = result.uids[0]
						  			let date = result[key].pubdate
						  			let title = result[key].title
						  			
						  			return (
									    <tr key={index}>
									      <th scope="row" className="text-right">{date}</th>
									      <td className="text-right"><a href={`https://www.ncbi.nlm.nih.gov/pubmed/${key}`} target="_blank">{key}</a></td>
									      <td className="text-left">{title}</td>
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
}

export default Publication