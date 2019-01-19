/* eslint-disable */
import React, { Component } from 'react'

class People extends Component {

	constructor(props) {
		super(props)
		this.apiPath = 'https://api.crunchbase.com/v3.1/people'
    	this.apiKey = '50a32d84dbc41c930267958491d132c4'
    	this.state = {
    		linkedin: null
    	}
	}

	async componentDidMount() {
		const response = await fetch(`${this.apiPath}/${this.props.uuid}?user_key=${this.apiKey}`)
		const json = await response.json()
		const data = json.data
		const relationships = data.relationships
		const websites = relationships.websites.items

		for(let i = 0; i < websites.length; i++) {
			let website = websites[i]
			let type = website.properties.website_type
			let url = website.properties.url
			if(type == 'linkedin') {
				this.setState({ linkedin: url })
			}
		}
	}

	render() {
		const url = this.state.linkedin
		const name = this.props.name

		if(url) return(<a href={url} target="_blank">{name}</a>)
		else return name
	}
}

export default People