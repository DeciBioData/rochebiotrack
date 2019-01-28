/* eslint-disable */
import React, { Component } from 'react'
import { Route, Switch, withRouter } from "react-router-dom"

import Home from './components/home/Home'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Company from './components/company/Company'
import auth0Client from './components/auth/Auth'
import Callback from './components/auth/Callback'
import LoadingSpinner from './components/others/LoadingSpinner'
import NoMatch from './components/others/NotFoundPage'

const SecureRoute = (props) => {
  const {component: Component, path, checkingSession} = props;
  return (
    <Route path={path} render={() => {
        if (checkingSession) return <div className="spinner"><LoadingSpinner /></div>
        if (!auth0Client.isAuthenticated()) {
          auth0Client.signIn();
          return <div></div>;
        }
        return <Component />
    }} />
  )
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({checkingSession:false})
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({checkingSession:false})
  }

  render() {
    return (
      	<div>
      		<Header/>
        	<Switch>
		    	<SecureRoute exact path='/' component={Home} checkingSession={this.state.checkingSession}/>
		    	<SecureRoute path='/company/:id' component={Company} checkingSession={this.state.checkingSession}/>
		    	<Route exact path='/callback' component={Callback}/>
				<Route component={NoMatch} />
			</Switch>
			<Footer/>
		</div>
    )
  }
}

export default withRouter(App)
