/* eslint-disable */
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { withAuth } from '@okta/okta-react'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react'

import Home from './components/home/Home'
import Footer from './components/footer/Footer'
import Company from './components/company/Company'
import Login from './components/auth/Login'
import NoMatch from './components/others/NotFoundPage'

import store from './store'

const onAuthRequired = ({history}) => {
	history.push('/login')
}

const config = {
  issuer: 'https://dev-693935.oktapreview.com/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oaix7y2meD0osjvh0h7',
  onAuthRequired: onAuthRequired
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      	<div>
			<Router>
				<div>
			        <Security issuer={config.issuer}
			                  client_id={config.client_id}
			                  redirect_uri={config.redirect_uri}
			                  onAuthRequired={config.onAuthRequired}
			        >
			        	<Switch>
					    	<SecureRoute exact={true} path='/' component={Home}/>
					    	<SecureRoute path='/company/:id' component={Company}/>
					    	<Route exact={true} path="/login" render={() => <Login baseUrl='https://dev-693935.oktapreview.com'/>}/>
							<Route path='/implicit/callback' component={ImplicitCallback}/>
							<Route component={NoMatch} />
						</Switch>
					</Security>
				</div>
			</Router>
			<Footer/>
		</div>
      </Provider>
    )
  }
}

export default App
