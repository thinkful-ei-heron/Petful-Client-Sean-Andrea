import React, { Component } from 'react';
import { Queue, adoptionQueue, namesArray } from './Queue';
import PetfulApi from './Services/petful-api-service';
import './adoptionPage.css';

class AdoptionPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			wantsToRegister: false,
			firstName: '',
			lastName: '',
			registered: false,
			numberInLine: '',
			catQ: [],
			dogQ: [],
			currentPet:'',
			currentNewOwner:'Fred Kreuger'
		};
	}

	clickHandler=()=>{
		this.setState({wantsToRegister:true})
	}

	handleFirstName=(e)=>{
		this.setState({firstName: e.target.value})
	}

	handleLastName=(e)=>{
		this.setState({lastName: e.target.value})
	}

	submitHandler=(e)=>{
		e.preventDefault()
		let fullName = this.state.firstName + ' ' + this.state.lastName
		adoptionQueue.enqueue(fullName)
		this.setState({wantsToRegister:false,
						registered : true})
		console.log(fullName)
		console.log(adoptionQueue.display())
	}

	message=()=>{
		return (`Congratulations to ${this.state.currentNewOwner} and their new pet ${this.state.currentPet}`)
	}

	addToQ = (name) => {
		adoptionQueue.enqueue(name);
	};
	adoptCat = () => {
		PetfulApi.adoptCat().then((res) => {
			window.alert('Congrats, you adopted a cat!');
			let { catQ } = this.state;
			catQ.shift();
			this.setState({ catQ: catQ });
		});
	};
	adoptDog = () => {
		PetfulApi.adoptDog().then((res) => {
			window.alert('Congrats, you adopted a dog!');
			let { dogQ } = this.state;
			dogQ.shift();
			this.setState({ dogQ: dogQ });
		});
	};

	componentDidMount() {
		PetfulApi.enqueueCat('snuffles')
		PetfulApi.getAllCats().then((cat) => this.setState({ catQ: cat })).catch({ error: 'An Error has Occurred' });

		PetfulApi.getAllDogs().then((dog) => this.setState({ dogQ: dog })).catch({ error: 'An Error has Occurred' });
		//console.log(list)

		const changeList = () => {
			let temp = adoptionQueue.dequeue();
			let temp2 = namesArray.pop();
			this.setState({currentNewOwner: temp,
			                currentPet:'' })
			adoptionQueue.enqueue(temp2);
			namesArray.push(temp);
			console.log(adoptionQueue.display());
		};

		let j = setInterval(changeList, 10000);
	}

	render() {
		return (
			<div className="adoptionPage">
				<div className="adoption">
					<header>
					<h1> Welcome to Petful Adoption Center! </h1>
					<h2> Adoption Page </h2>
					{this.message()}
					</header>
					<div className="pet-list" >
						<div className="dog">
							<h3>Dogs</h3>
							{this.state.dogQ.map((dog, index) => {
								return (
									<div className="dog-list">
										<img className="pet-img" key={index} src={dog.imageURL} />
										<ul>
											<li key={index}>Name: {dog.name}</li>
											<li>Age: {dog.age}</li>
											<li>Sex: {dog.sex}</li>
											<li>Breed: {dog.breed}</li>
											<li>Story: {dog.story}</li>
										</ul>
										<button type="button" key={index} onClick={this.adoptDog}>
											Adopt
										</button>
									</div>
								);
							})}
						</div>

						<div className="cat">
							<h3>Cats</h3>
							{this.state.catQ.map((cat, index) => {
								return (
									<div className="cat-list" key={index}>
										<img className="pet-img" key={index} src={cat.imageURL} />
										<ul>
											<li key={index}>{cat.name}</li>
											<li>{cat.age}</li>
											<li>{cat.sex}</li>
											<li>{cat.breed}</li>
											<li>{cat.story}</li>
										</ul>
										<button type="button" onClick={this.adoptCat}>
											Adopt
										</button>
									</div>
								);
							})}
						</div>
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
