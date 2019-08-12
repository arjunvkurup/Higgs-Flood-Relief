import React  from 'react';
import axios from 'axios';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import VolunteerRegistration from './components/volunteer/VolunteerRegistration';
import Rescueneeded from './components/rescuneeded/Rescueneeded';
import NewAnnouncment from './components/announcment/NewAnnouncment';
import Home from './components/home/Home';
import About from './components/home/About';
import './App.css';
import Signin from './components/auth/Signin';
import Admin from './components/admin/Admin';
import dashboard from './components/dashboard/dashboard';

function App(){
	return(
		<BrowserRouter>
			<div className="App">
				<Switch>
					<Route  exact path='/' component = {Home} />
					<Route  path='/volunteer' component = {VolunteerRegistration} />
					<Route  path='/rescue' component = {Rescueneeded} />
					<Route  path='/signin' component = {Signin} />
					<Route  path='/about' component = {About} />
					<Route 	path='/admin' component={Admin} />
					<Route  path='/newannouncement' component = {NewAnnouncment} />
					<Route 	path='/dashboard' component={dashboard} />

				</Switch>
			</div>
		</BrowserRouter>
	)
}

export default App;
