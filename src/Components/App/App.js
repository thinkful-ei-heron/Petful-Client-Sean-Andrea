import React from 'react';
import { Route } from 'react-router-dom';

import LandingPage from '../LandingPage/landingPage';
import AdoptionPage from '../AdoptionPage/adoptionPage';
import CongratsPage from '../CongratsPage/CongratsPage';

import './App.css';

function App() {
	return (
		<div className="App">
			<Route exact path="/" component={LandingPage} />
			<Route exact path="/allPets" component={AdoptionPage} />
			<Route exact path="/adopted" component={CongratsPage} />
		</div>
	);
}

export default App;
