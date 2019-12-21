import React from 'react';
import './App.css';
import LandingPage from './landingPage.js';
import AdoptionPage from './adoptionPage';
import CongratsPage from './CongratsPage';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 'LandingPage'
		};
	}

	updateCurrentPage(page) {
		this.setState({ currentPage: page });
	}

	render() {
		switch (this.state.currentPage) {
			case 'LandingPage':
				return (
					<div className="App">
						<LandingPage changePage={(page) => this.updateCurrentPage(page)} />
					</div>
				);
			case 'AdoptionPage':
				return (
					<div className="App">
						<AdoptionPage changePage={(page) => this.updateCurrentPage(page)} />
					</div>
				);
			case 'CongratsPage':
				return (
					<div className="App">
						<CongratsPage changePage={(page) => this.updateCurrentPage(page)} />
					</div>
				);
		}
	}
}

export default App;
