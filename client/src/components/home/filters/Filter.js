import React, { Component } from 'react'
import { connect } from "react-redux"
import { 
	filterName, filterDescription, filterDropdownOptions, clearDropdownOptions, fillColumn
} from "../../../actions/filterActions"
import { updateData } from "../../../actions/dataActions"
import { formatDollar } from "../../../actions/otherActions"

import FilterInstruction from "./FilterInstruction"
import DropdownOptions from "./DropdownOptions"
import Slider from "./Slider"
import RankCalculator from "./RankCalculator"

class Filter extends Component {

	constructor(props) {
		super(props)
		this.tableList = "(All),Rank,Company Name,Description,Founded,Employee Count,Last Funding,Category,Country,Region,Status,Rounds,Total Funding,Reported Valuation,Publication Count,Investor Count,Rank Score"
		this.categoryList = "(All),Health Care,Medical,Biotechnology,Medical Device,Pharmaceutical,Fitness,Information Technology,Wellness,Software,Manufacturing,Hospital,Health Diagnostics,Therapeutics,Life Science,Education,Personal Health,Consulting,Mobile,Internet,Biopharma,E-Commerce,Food and Beverage,Consumer,Apps,Art,Genetics,Artificial Intelligence,mHealth,Clinical Trials,Nutrition,Dental,Lifestyle,Analytics,Cannabis,Communities,Sports,Enterprise,Beauty,SaaS,Enterprise Software,Social,Agriculture,Venture Capital,Consumer Goods,Non Profit,Financial Services,Home Health Care,Insurance,Machine Learning,Employee Benefits,Veterinary,Big Data,iOS,Child Care,Mobile Apps,Electronics,Marketing,Hardware,Internet of Things,Neuroscience,Wearables,Retail,Security,Finance,Service Industry,Human Resources,Biometrics,Energy,Psychology,Dietary Supplements,Information Services,Advertising,Fashion,Elder Care,Chemical,Association,Training,Robotics,Social Media,Industrial,Real Estate,Cosmetics,Developer Platform,Computer,Marketplace,FinTech,Hospitality,Government,Alternative Medicine,Organic,Professional Services,Consumer Electronics,Food Processing,News,Video,Pet,Product Design,Bioinformatics,Electronic Health Record (EHR),Cosmetic Surgery,Innovation Management,Rehabilitation,Cloud Computing,Commercial,Nanotechnology,Diabetes,Men's,B2B,Health Insurance,Residential,Delivery,Organic Food,Nursing and Residential Care,Telecommunications,Travel,Sensor,Product Research,Search Engine,Women's,EdTech,Online Portals,Funerals,Emergency Medicine,Predictive Analytics,Market Research,Children,Virtual Reality,Recruiting,Printing,Eyewear,Automotive,Blockchain,Payments,Digital Media,Transportation,Publishing,Assistive Technology,Parenting,3D Technology,3D Printing,Music,Customer Service,Water,AgTech,Nutraceutical,Social Network,Web Development,Collaboration,Renewable Energy,Logistics,CleanTech,Cyber Security,Management Consulting,Infrastructure,Content,Supply Chain Management,Real Time,Wholesale,Business Development,Social Entrepreneurship,Assisted Living,Messaging,Shopping,Augmented Reality,Elderly,Legal,Farming,Business Intelligence,Public Safety,Developer Tools,Android,Wireless,SEM,Computer Vision,Sustainability,Events,Billing,Aerospace,Advanced Materials,Media and Entertainment,Identity Management,Incubators,Public Relations,Family,Test and Measurement,Employment,Risk Management,Retail Technology,Universities,Charity,Fertility,Animal Feed,Staffing Agency,Natural Language Processing,Small and Medium Businesses,Baby,Outsourcing,Local,E-Learning,Data Visualization,Restaurants,Mining,Digital Marketing,Sales,Clean Energy,Data Integration,Quantified Self,Cloud Data Services,Natural Resources,Construction,CRM,Image Recognition,Subscription Service,Tourism,Food Delivery,Home Services,Location Based Services,Smart Home,Advice,Gaming,Brand Marketing,Management Information Systems,Semiconductor,Banking,Database,GreenTech,Angel Investment,Personalization,Impact Investing,Environmental Consulting,Gamification,Sporting Goods,Social Impact,Leisure,Mobile Devices,Higher Education,Oil and Gas,Software Engineering,Project Management,Web Apps,Scheduling,InsurTech,E-Commerce Platforms,Web Design,Developer APIs,Industrial Automation,Network Security,Communications Infrastructure,Crowdfunding,Mobile Payments,Water Purification,Data Mining,Packaging Services,Document Management,Intellectual Property,Outpatient Care,Environmental Engineering,Cycling,National Security,Information and Communications Technology (ICT),Solar,Compliance,Personal Development,Email,Blogging Platforms,Fuel,Speech Recognition,Consumer Software,Private Social Networking,Recreation,Human Computer Interaction,Career Planning,Cryptocurrency,Mechanical Engineering,Enterprise Applications,Waste Management,Marketing Automation,Laser,Cooking,Intelligent Systems,Web Hosting,Recycling,Snack Food,Corporate Training,Industrial Engineering,Productivity Tools,Quality Assurance,Humanitarian,Personal Finance,Navigation,Textiles,Audio,Asset Management,Knowledge Management,Video Streaming,Open Source,Law Enforcement,BC,Chemical Engineering,Industrial Manufacturing,Plastics and Rubber Manufacturing,Professional Networking,Video Games,Biofuel,Advertising Platforms,Architecture,Business Information Systems,Energy Efficiency,Drones,Point of Sale,Web Browsers,Accounting,Crowdsourcing,Commercial Real Estate,Facilities Support Services,Lending,Photography,Retirement,Life Insurance,PaaS,Sharing Economy,Social Media Marketing,Digital Entertainment,Consumer Research,Machinery Manufacturing,Privacy,Simulation,Aquaculture,Delivery Service,Furniture,Gift,Politics,Real Estate Investment,Smart Building,Autonomous Vehicles,First Aid,Lighting,Lead Generation,Home Improvement,Optical Communication,SEO,Coupons,Gift Card,Grocery,Tobacco,RFID,Technical Support,IT Management,Social Assistance,Tutoring,Cloud Infrastructure,Home Decor,Fast-Moving Consumer Goods,Adult,Product Search,Product Management,Price Comparison,Wealth Management,Semantic Web,Content Discovery,Emerging Markets,Broadcasting,Loyalty Programs,Coffee,Physical Security,Mobile Advertising,Event Management,Local Business,Fraud Detection,Hydroponics,Religion,Primary Education,Semantic Search,Peer to Peer,Wine And Spirits,Virtual Assistant,Skill Assessment,STEM Education,GovTech,Email Marketing,IT Infrastructure,Home and Garden,Toys,SMS,Data Center,Energy Management,Dating,Fruit,Hotel,Military,Video Conferencing,Tea,Reputation,Communication Hardware,Green Consumer Goods,CAD,Language Learning,Livestock,Outdoors,Translation Service,Sales Automation,Underserved Children,UX Design,Consumer Applications,Biomass Energy,Collaborative Consumption,Data Storage,Digital Signage,eSports,Cloud Management,File Sharing,Journalism,Facility Management,Funding Platform,Office Administration,Social Media Management,Property Insurance,Ediscovery,Continuing Education,Credit,Coworking,Homeland Security,Content Marketing,Pollution Control,Jewelry,Procurement,Home Renovation,Video Chat,Space Travel,Text Analytics,Recipes,Electrical Distribution,Call Center,Enterprise Resource Planning (ERP),Cloud Security,Bitcoin,Facial Recognition,Property Management,Virtualization,Marine Technology,Task Management,Consumer Lending,Direct Sales,Energy Storage,Contact Management,DSP,Film,Intrusion Detection,Mining Technology,Motion Capture,Trading Platform,Shipping,Power Grid,Musical Instruments,Graphic Design,Embedded Software,Personal Branding,Classifieds,CivicTech,Stock Exchanges,Wedding,Q&A,Usability Testing,Performing Arts,Shoes,Young Adults,Unified Communications,Google,Charter Schools,Building Material,Ad Network,Sex Tech,Direct Marketing,Embedded Systems,Geospatial,Adventure Travel,Sex Industry,Google Glass,Guides,Animation,Fleet Management,Landscaping,Hedge Funds,Multi-level Marketing,Ethereum,Social News,Rental,Transaction Processing,Travel Agency,NFC,Ride Sharing,Secondary Education,Teenagers,Virtual Workforce,App Discovery,Building Maintenance,Affiliate Marketing,Farmers Market,GPS,Industrial Design,Creative Agency,Application Performance Management,Auto Insurance,Nuclear,Craft Beer,Auctions,EBooks,Mineral,Consumer Reviews,Business Travel,Interior Design,Franchise,Mechanical Design,VoIP,Music Education,Meeting Software,Network Hardware,TV,Lingerie,Horticulture,Travel Accommodations,Lead Management,Precious Metals,Video on Demand,Swimming,Legal Tech,Smart Cities,Visual Search,Quantum Computing,Virtual Currency,Social Recruiting,Concerts,Event Promotion,Content Creators,Ad Targeting,Brewing,Data Center Automation,DIY,Air Transportation,Podcast,Content Delivery Network,Handmade,Made to Order,Flowers,Photo Sharing,Social CRM,Indoor Positioning,Online Auctions,Mapping Services,Public Transportation,Online Forums,Housekeeping Service,Vocational Education,Property Development,Online Games,Satellite Communication,Ticketing,Serious Games,Vertical Search,Battery,Corrections Facilities,Equestrian,Alumni,E-Signature,Freight Service,Bakery,Gambling,Credit Cards,Green Building,Field Support,Edutainment,Browser Extensions,App Marketing,Reservations,Tennis,Janitorial Service,Warehousing,Operating Systems,Sponsorship,Museums and Historical Sites,Railroad,Prediction Markets,Millennials,Local Advertising,Nightlife,Homeless Shelter,Collectibles,Cloud Storage,Content Syndication,Financial Exchanges,Commercial Insurance,Catering,Document Preparation,Archiving Service,ISP,Sailing,Marine Transportation,Electric Vehicle,Rental Property,Theatre,Boating,Vending and Concessions,Drone Management,Freelance,Fantasy Sports,Music Streaming,IaaS,Generation Z,Virtual Goods,Paper Manufacturing,Racing,Resorts,Linux,Nightclubs,QR Codes,Wood Processing,Group Buying,College Recruiting,Micro Lending,Video Editing,Wind Energy,Social Bookmarking,Independent Music,Social Media Advertising,Virtual World,Basketball,GPU,Field-Programmable Gate Array (FPGA),Darknet,Casual Games,Debt Collections,Civil Engineering,Facebook,Collection Agency,Cause Marketing,Comics,Car Sharing,Confectionery,Cricket,Freemium,Generation Y,Fossil Fuels,Local Shopping,Extermination Service,Internet Radio,Hunting,Leasing,Commercial Lending,Celebrity,Contests,Food Trucks,Virtual Desktop,Seafood,Film Production,SNS,Soccer,Reading Apps,Parks,Music Venues,Parking,Social Shopping,Tour Operator,Flash Storage,Video Advertising,Forestry,Presentations,Laundry and Dry-cleaning,Same Day Delivery,Private Cloud,Golf,PC Games,Photo Editing,Hockey,Recreational Vehicles,TV Production,Table Tennis,Volley Ball,Water Transportation,Music Label"
		this.countryList= "(All),United States of America,Canada,United Kingdom,India,Netherlands,Spain,Israel,Germany,Ireland,Belize,Australia,China,Italy,Lithuania,Portugal,Turkey,Belgium,Switzerland,France,Bulgaria,Poland,Austria,Sweden,Finland,Singapore,Sudan,Korea (Republic of),Mexico,Malaysia,South Africa,Japan,Latvia,Luxembourg,Colombia,Greece,Uruguay,United Arab Emirates,Brazil,Hong Kong,Myanmar,Slovakia,Saudi Arabia,Chile,Hungary,Iceland,Russian Federation,Norway,Algeria,Slovenia,Argentina,Croatia,Ghana,New Zealand,Bangladesh,Taiwan,Indonesia,Rwanda,Czechia,Thailand,Viet Nam,Ukraine,Bermuda,Trinidad and Tobago,Jordan,Kazakhstan,Kenya,Lebanon,Kuwait,Estonia,Nigeria,Morocco,Cyprus,Iran (Islamic Republic of),Costa Rica,Uganda,Pakistan,Philippines,Qatar,Seychelles,Egypt,Panama,Nepal,Jamaica,Côte d'Ivoire,Zambia,Botswana,Mauritius,Peru,Angola,Tunisia,Malta,Ethiopia,Liechtenstein,Namibia,El Salvador,Sri Lanka,Puerto Rico,Ecuador,Cayman Islands,Cameroon,Belarus,Yemen,Senegal,Bolivia (Plurinational State of),Georgia,Gibraltar,Venezuela (Bolivarian Republic of),Paraguay,Armenia,Macedonia (the former Yugoslav Republic of),Saint Kitts and Nevis,Lesotho,Jersey,Honduras,Oman,Barbados,Grenada,Serbia,Cuba,Congo (Democratic Republic of the),Albania,Isle of Man,Togo,Zimbabwe,Cambodia,Bahrain,Afghanistan,Burkina Faso,Guatemala,Andorra,Azerbaijan,Madagascar,Denmark,Other/NA"
		this.statusList= "(All),operating,acquired,ipo,closed,Other/NA"
		this.regionList= "(All),Northern America,Northern Europe,Western Europe,Southern Asia,Eastern Asia,Southern Europe,Western Asia,Australia and New Zealand,Latin America and the Caribbean,Eastern Europe,South-eastern Asia,Sub-Saharan Africa,Northern Africa,Central Asia,Others/NA"
		this.tableList = "(All),Rank,Company Name,Description,Founded,Employee Count,Last Funding,Category,Country,Region,Status,Rounds,Total Funding,Reported Valuation,Publication Count,Investor Count,Rank Score"
		this.employeeCountList = [
			'(All)', '1 to 10', '11 to 50', '51 to 100', '101 to 250', 
			'251 to 500', '501 to 1000', '1001 to 5000', '5001 to 10000',
			'10000+', 'unknown'
		]
	}

	componentDidMount() {
		this.props.columns.forEach((col) => {
			document.getElementById(`column-${col}`).checked = true
		})
	}

	updateData() {
		this.props.updateData(this.props.companies, this.props.filters)
	}

	handleSearchName(e) { 
		this.props.filterName(e.target.value)
		this.updateData()
	}

	handleSearchDescription(e) {
		this.props.filterDescription(e.target.value)
		this.updateData()
	}

	handleDropdownOptions(type, item) {
		this.props.filterDropdownOptions(type, item)
	}

	clearDropdownOptions(type) {
		this.props.clearDropdownOptions(type)
	}

	fillColumn() {
	    let inputs = document.querySelectorAll('.columnCheckbox')
	    for (let i = 0; i < inputs.length; i++) {
	      inputs[i].checked = true;
	    }
		this.props.fillColumn()
	}

	render() {
		const { processedCompanies, filters } = this.props
		return (
			<div className="side-nav with-shadow-light">
				<div className="company-count">
					<h6><strong>{processedCompanies.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong> results</h6>
				</div>
				<div className="mr-auto company-search">
					<FilterInstruction name="Organization Name" type="Organization" content="Search for the exact name of the company or organization"/>
					<input className="form-control mr-sm-2 search-companyInput" type="search" placeholder="Search Companies.." aria-label="Search" onChange={this.handleSearchName.bind(this)}/>
			  	</div>
				<div className="mr-auto company-search">
					<FilterInstruction name="Company Description" type="Description" content="Filter down companies by words mentioned in their short description"/>
					<input className="form-control mr-sm-2 search-companyInput" type="search" placeholder="Search Description.." aria-label="Search" onChange={this.handleSearchDescription.bind(this)}/>
			  	</div>
				<div className="category-filter">
					<FilterInstruction name="Display Columns" type="Column" content="Select columns to display and export in the data table"/>
					<DropdownOptions 
						name="Columns" type="column" list={this.tableList.split(',')} updateData={this.updateData.bind(this)} fillColumn={this.fillColumn.bind(this)}
						handleDropdownOptions={this.handleDropdownOptions.bind(this)} clearDropdownOptions={this.clearDropdownOptions.bind(this)}/>
				</div>
				<div className="category-filter">
					<FilterInstruction name="Category Tags" type="Tags" content="Filter down companies by selecting one or more category tags. Use the search bar to look up relevant tags"/>
					<DropdownOptions 
						name="Tags" type="category" list={this.categoryList.split(',')} updateData={this.updateData.bind(this)}
						handleDropdownOptions={this.handleDropdownOptions.bind(this)} clearDropdownOptions={this.clearDropdownOptions.bind(this)}/>
				</div>
				<div className="category-filter">
					<FilterInstruction name="Company Status" type="Status" content='Filter down companies by selecting their status. These are mutually exclusive categories, i.e an operating company will not have an "ipo" or and "acquired" tag'/>
					<DropdownOptions 
						name="Status" type="status" list={this.statusList.split(',')} updateData={this.updateData.bind(this)}
						handleDropdownOptions={this.handleDropdownOptions.bind(this)} clearDropdownOptions={this.clearDropdownOptions.bind(this)}/>
				</div>
				<div className="category-filter">
					<FilterInstruction name="Region" type="Region" content='Filter down companies by region'/>
					<DropdownOptions 
						name="Region" type="region" list={this.regionList.split(',')} updateData={this.updateData.bind(this)}
						handleDropdownOptions={this.handleDropdownOptions.bind(this)} clearDropdownOptions={this.clearDropdownOptions.bind(this)}/>
				</div>
				<div className="category-filter">
					<FilterInstruction name="Country" type="Country" content='Filter down companies by country'/>
					<DropdownOptions 
						name="Country" type="country" list={this.countryList.split(',')} updateData={this.updateData.bind(this)}
						handleDropdownOptions={this.handleDropdownOptions.bind(this)} clearDropdownOptions={this.clearDropdownOptions.bind(this)}/>
				</div>
				<div className="category-filter">
					<FilterInstruction name="Employee Count" type="Employee" content='Filter down companies by employee count'/>
					<DropdownOptions 
						name="Counts" type="employeeCount" list={this.employeeCountList} updateData={this.updateData.bind(this)}
						handleDropdownOptions={this.handleDropdownOptions.bind(this)} clearDropdownOptions={this.clearDropdownOptions.bind(this)}/>
				</div>

				<div className="filter-slider">
					<FilterInstruction name="Total Funding" type="TotalFunding" result={`( ${formatDollar(filters.totalFunding[0])} - ${formatDollar(filters.totalFunding[1])} )`}
						content='Filter down companies by selecting their minimum and maximum funding ($USD)'/>
					<Slider type="TotalFunding" value={filters.totalFunding} range={{min: 0, max: 6000000000}}/>
				</div>
				<div className="filter-slider">
					<FilterInstruction name="Rounds" type="Rounds" result={`( ${Math.round(filters.rounds[0])} - ${Math.round(filters.rounds[1])} )`}
						content='Filter down companies by selecting their minimum and maximum count of funding rounds'/>
					<Slider type="Rounds" value={filters.rounds} range={{min: 0, max: 30}}/>
				</div>
				<div className="filter-slider">
					<FilterInstruction name="Reported Valuation" type="ReportedValuation" result={`( ${formatDollar(filters.reportedValuation[0])} - ${formatDollar(filters.reportedValuation[1])} )`}
						content='Filter down companies by selecting their minimum and maximum valuation ($USD)'/>
					<Slider type="ReportedValuation" value={filters.reportedValuation} range={{min: 0, max: 150000000000}}/>
				</div>
				<div className="filter-slider">
					<FilterInstruction name="Year Founded" type="YearFounded" 
						result={`( ${filters.yearFounded[0] == 0 ? filters.yearFounded[1] == 2000 ? 0 : 2000 : filters.yearFounded[0]} - ${filters.yearFounded[1]} )`}
						content='Filter down companies by selecting their minimum and maximum founding year'/>
					<Slider type="YearFounded" value={filters.yearFounded} range={{min: 2000, max: 2018}}/>
				</div>
				<div className="filter-slider">
					<FilterInstruction name="Publication Count" type="Publication" result={`( ${Math.round(filters.publicationCount[0])} - ${Math.round(filters.publicationCount[1])} )`}
						content='Filter down companies by selecting their minimum and maximum publication count'/>
					<Slider type="Publication" value={filters.publicationCount} range={{min: 0, max: 5000}}/>
				</div>

				<div className="rank-calculator">
					<FilterInstruction name="Ranking Weights Calculator" type="RankWeight" 
						content={
							<ul>
								<li><b><u>Comapany Metrics</u></b></li>
								<li> <b> -Time Since Founding</b>: More recently founded companies are given a higher score</li>
								<li> <b> -Team Rank</b>: Aggregate score of team member ratings - higher score implies demonstrated achievements 
								launching and sustaining companies</li>
								<li> <b> -Employee Count</b>: Larger companies are given a higher score</li>
								<li> <b> -Publication Count (beta)</b>: Companies with higher count of publications are given a higher score</li>
								<br></br>

								<li><b><u>Funding Metrics</u></b></li>
								<li> <b> -Total Funding Amount</b>: Companies with higher total funding ($USD) are given a higher score</li>
								<li> <b> -Time since last Funding</b>: Companies with more recent funding rounds are given a higher score</li>
								<li> <b> -Valuation </b>: Companies with higher total reported valuation ($USD) are given a higher score</li>
								<li> <b> -Investor Amount</b>: Companies with higher total investor count are given a higher score</li>
							</ul>
						}
					/>
					<button className="buttons info-buttons rankCalculatorButton" type="button" data-toggle="collapse" data-target="#rank-calculator">
						Adjust Ranking Weights &#9660;
					</button>
					<div className="collapse" id="rank-calculator">
				        <p className="modal-header-text text-secondary">[0] represents de-activating a particular metric</p>
				       	<p className="modal-header-text text-secondary">[5] represents maximum weight for a metric</p>   
				        <RankCalculator />
			        </div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	companies: state.data.companies,
	processedCompanies: state.data.processedCompanies,
	columns: state.filter.columns,
	filters: state.filter.filters
})

export default connect(mapStateToProps, { 
	filterName, filterDescription, filterDropdownOptions, clearDropdownOptions, fillColumn, updateData 
})(Filter)