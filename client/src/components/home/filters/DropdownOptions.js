import React, { Component } from "react"

class DropdownOptions extends Component {
	constructor(props) {
		super(props)
		this.name = props.name
		this.type = props.type
		this.list = props.list
	}

	searchItem(e) {
	    const matchPrefix = (prefix, str) => {
	      prefix = prefix.toLowerCase()
	      str = str.toLowerCase()

	      if(prefix.length > str.length) return false
	      for(let i = 0; i < prefix.length; i++) {
	        if(prefix[i] !== str[i]) return false
	      }
	      return true
	    }

	    let tag = e.target.value
	    let items = document.getElementsByClassName(`${this.type}-items`)
		for(let i = 0; i < items.length; i++) {
			let value = items[i].getElementsByClassName(`${this.type}Checkbox`)[0].value
			if(tag !== "" && !matchPrefix(tag, value)) {
				items[i].style.display = "none"
			}else {
				items[i].style.display = ""
			}
		}
	}

	handleItem(type) {
		if(type === '(All)') { 
			if(this.type !== 'column') this.clearItem()
			else {
				let inputs = document.querySelectorAll('.columnCheckbox')
				if(!inputs[0].checked) { 
					this.clearItem()
					const defaultList = ["Rank","Company Name", "Country","Founded","Last Funding","Employee Count", "Rounds", "Total Funding"]
					inputs.forEach((input) => {
						if(defaultList.indexOf(input.value) !== -1) input.checked = true
					})
				}
				else this.props.fillColumn()
			}
		}
		else this.props.handleDropdownOptions(this.type, type)  
		this.props.updateData()	
	}

	clearItem() {
	    let inputs = document.querySelectorAll(`.${this.type}Checkbox`)
	    for (let i = 0; i < inputs.length; i++) {
	      inputs[i].checked = false;
	    }
	    this.props.clearDropdownOptions(this.type)
	    this.props.updateData()    
	}

	render() {
		return (
			<div className="btn-group">
			  <button type="button" className="buttons info-buttons dropdown-toggle dropdown-buttons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			    Select {this.name}
			  </button>
			  <div className="dropdown-menu">
			  	<input className="tagSearchInput" type="text" placeholder={`Search ${this.name}...`} onChange={this.searchItem.bind(this)} />
				{
					this.list.map((item, index) => {
						return (
							<div className={`form-check dropdown-item ${this.type}-items`} key={index}>
							  <input className={`form-check-input ${this.type}Checkbox`} type="checkbox" value={item} id={`${this.type}-${item}`} onChange={this.handleItem.bind(this, item)}/>
							  <label className="form-check-label" htmlFor={item}>
							   	{item}
							  </label>
							</div>								
						)
					})
				}
			  </div>
			</div>
		)
	}
}

export default DropdownOptions