import React from 'react';
import { adoptionQueue, namesArray } from './Queue';
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
			currentPet: '',
			currentNewOwner: '',
			turnToAdopt:false
		};
	}

	clickHandler = () => {
		this.setState({ wantsToRegister: true });
	};

	handleFirstName = (e) => {
		this.setState({ firstName: e.target.value });
	};

	handleLastName = (e) => {
		this.setState({ lastName: e.target.value });
	};

	submitHandler = (e) => {
		e.preventDefault();
		let fullName = this.state.firstName + ' ' + this.state.lastName;
		adoptionQueue.enqueue(fullName);
		this.setState({
			wantsToRegister: false,
			registered: true,
			numberInLine: adoptionQueue.size()
		});
		console.log(fullName);
		console.log(adoptionQueue.display());
	};

	message = () => {
		if(this.state.currentNewOwner && !this.state.turnToAdopt){
			return `Congratulations to ${this.state.currentNewOwner} and their new pet ${this.state.currentPet}`;
		}
	};

	addToQ = (name) => {
		adoptionQueue.enqueue(name);
	};
	adoptCat = (event) => {
		console.log(event.target.id)
		PetfulApi.adoptCat().then((res) => {
			// window.alert('Congrats, you adopted a cat!');
			let { catQ } = this.state;
			let newPet = catQ.shift();
			catQ.push(newPet)
			this.setState({ catQ: catQ });
			this.props.changePage('CongratsPage');
		});
	};
	adoptDog = (event) => {
		console.log(event.target.id)
		PetfulApi.adoptDog().then((res) => {
			// window.alert('Congrats, you adopted a dog!');
			let { dogQ } = this.state;
			let newPet = dogQ.shift();
			dogQ.push(newPet)
			this.setState({ dogQ: dogQ });
			this.props.changePage('CongratsPage');
		});
	};

	componentDidMount() {
		PetfulApi.getAllCats().then((cat) => this.setState({ catQ: cat })).catch({ error: 'An Error has Occurred' });
		PetfulApi.getAllDogs().then((dog) => this.setState({ dogQ: dog })).catch({ error: 'An Error has Occurred' });

		const changeList = () => {
			let temp = adoptionQueue.dequeue();
			let temp2 = namesArray.pop();
			let rand = Math.floor(Math.random()*2);
			let isTurn = false;
			let newPet = ''
			adoptionQueue.enqueue(temp2);
			namesArray.push(temp);
		    if(!this.state.turnToAdopt){
			if(rand == 1){
				PetfulApi.adoptDog().then((res) => {
					if(this.state.numberInLine === 1){
						isTurn = true
					}
					let { dogQ } = this.state;
					newPet = dogQ.shift();
					dogQ.push(newPet)
					// dogQ.enqueue(newPet)
					this.setState({ dogQ: dogQ,
					currentNewOwner:temp,
					currentPet: newPet.name,
					numberInLine: this.state.registered ? this.state.numberInLine - 1 : '',
					turnToAdopt:isTurn });
				})
			} else {
				PetfulApi.adoptCat().then((res) => {
					if(this.state.numberInLine === 1){
						isTurn = true
					}
					let { catQ } = this.state;
					newPet = catQ.shift();
					catQ.push(newPet)
					this.setState({ catQ: catQ,
					currentNewOwner:temp,
					currentPet: newPet.name,
					numberInLine: this.state.registered ? this.state.numberInLine - 1 : '',
				    turnToAdopt:isTurn });
			})
		  }
		};
	}

	this.interval = setInterval(changeList, 5000);
   }

	componentWillUnmount(){
		clearInterval(this.interval);
	}

	showButton(index){
		if(this.state.turnToAdopt && index === 0){
			return(
                <button type="button" disabled={!this.state.turnToAdopt} onClick={this.adoptDog} id={index}>
						Adopt
			    </button>		
			)
		} else {
			return(
			<div>
				<p> </p>
			</div>
			)
		}
	}

	showRegisterButton(){
		if(this.state.registered){
			return(
				<div className="registeredUser">
						<h4>
							Thank you for your interest, {this.state.firstName} {this.state.lastName}! You are currently
							number {this.state.numberInLine} in line
						</h4>
					</div>
			)
		} else {
			return(
				<button type="button" onClick={this.clickHandler} id='registerButton'>
						Register!
					</button>
			)
		}
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
					<div className="pet-list">
					<h3>Dogs</h3>
						<div className="dog">
							
							{this.state.dogQ.map((dog, index) => {
								return (
									<div className="dog-list" key={index}>
										<img
											className="pet-img"
											src={dog.imageURL}
											alt={dog.imageDescription}
										/>
										<ul>
											<li>Name: {dog.name}</li>
											<li>Age: {dog.age}</li>
											<li>Sex: {dog.sex}</li>
											<li>Breed: {dog.breed}</li>
											<li id='story'>Story: {dog.story}</li>
										</ul>
										{this.showButton(index)}
									</div>
								);
							})}
						</div>
						<h3>Cats</h3>
						<div className="cat">
							
							{this.state.catQ.map((cat, index) => {
								return (
									<div className="cat-list" key={index}>
										<img className="pet-img" src={cat.imageURL} alt={cat.imageDescription} />
										<ul>
											<li>Name: {cat.name}</li>
											<li>Age: {cat.age}</li>
											<li>Sex: {cat.sex}</li>
											<li>Breed: {cat.breed}</li>
											<li id='story'>Story: {cat.story}</li>
										</ul>
										{this.showButton(index)}
									</div>
								);
							})}
						</div>
						{this.showRegisterButton()}
					</div>
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
			</div>
		);
	}
}

export default AdoptionPage;
