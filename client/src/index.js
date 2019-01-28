import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import { BrowserRouter as Router } from "react-router-dom"
import mixpanel from 'mixpanel-browser'
import MixpanelProvider from 'react-mixpanel'
import store from './store'

mixpanel.init("5cd1e9c5cab74249feb5b30ad4f3fdd4");

ReactDOM.render(
	<MixpanelProvider mixpanel={mixpanel}>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</MixpanelProvider>
	, document.getElementById('root'))