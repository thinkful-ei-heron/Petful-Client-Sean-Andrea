import React, { Component } from 'react';
import { Queue, adoptionQueue } from './Queue';
import './adoptionPage.css';

class AdoptionPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			wantsToRegister: false,
			firstName: '',
			lastName: '',
			registered: false,
			namesDatabase: [],
			numberInLine: '',
			Q: ''
		};
	}

	componentDidMount() {
		function changeList() {}

		setInterval(changeList);
	}

	addToQ = (name) => {
		adoptionQueue.enqueue(name);
	};

	clickHandler = (e) => {
		this.setState({ wantsToRegister: true });
	};

	submitHandler = (e) => {
		let fullName = this.state.firstName + ' ' + this.state.lastName;
		let added = this.state.namesDatabase.concat(fullName);
		this.setState({
			wantsToRegister: false,
			namesDatabase: added,
			registered: true
		});
		this.addToQ(fullName);
		console.log(fullName);
	};

	handleFirstName = (e) => {
		e.preventDefault();
		this.setState({ firstName: e.target.value });
	};

	handleLastName = (e) => {
		e.preventDefault();
		this.setState({ lastName: e.target.value });
	};

	render() {
		return (
			<div className="adoptionPage">
				<div className="adoption">
					<h1> Welcome to Petful Adoption Center! </h1>
					<h2> Adoption Page </h2>
					<div className="dog">
						<h3>Dogs</h3>
					</div>
					<div className="cat">
						<h3>Cats</h3>
					</div>
					<button type="button" onClick={this.clickHandler}>
						Register
					</button>
				</div>
				{this.state.wantsToRegister === true ? (
					<div className="registration">
						<form className="registration-form">
							<p>
								Please enter your first name:{' '}
								<input
									type="text"
									placeholder="First Name"
									name="firstName"
									onChange={this.handleFirstName}
								/>
							</p>
							<p>
								Please enter your last name:{' '}
								<input
									type="text"
									placeholder="Last Name"
									name="lastName"
									onChange={this.handleLastName}
								/>
							</p>
							<button type="button" onClick={this.submitHandler}>
								Register For Adoption!
							</button>
						</form>
					</div>
				) : null}
				{this.state.registered ? (
					<div className="registeredUser">
						<h4>
							Thank you for your interest, {this.state.firstName} {this.state.lastName}! You are currently
							number {adoptionQueue.size()} in line
						</h4>
					</div>
				) : null}
			</div>
		);
	}
}

export default AdoptionPage;
