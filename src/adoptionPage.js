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
			numberInLine: adoptionQueue.size()+1
		});
		console.log(fullName);
		console.log(adoptionQueue.display());
	};

	message = () => {
		if(this.state.currentNewOwner){
			return `Congratulations to ${this.state.currentNewOwner} and their new pet ${this.state.currentPet}`;
		}
	};

	addToQ = (name) => {
		adoptionQueue.enqueue(name);
	};
	adoptCat = () => {
		PetfulApi.adoptCat().then((res) => {
			// window.alert('Congrats, you adopted a cat!');
			let { catQ } = this.state;
			catQ.shift();
			this.setState({ catQ: catQ });
			this.props.changePage('CongratsPage');
		});
	};
	adoptDog = () => {
		PetfulApi.adoptDog().then((res) => {
			// window.alert('Congrats, you adopted a dog!');
			let { dogQ } = this.state;
			dogQ.shift();
			this.setState({ dogQ: dogQ });
			this.props.changePage('CongratsPage');
		});
	};

	componentDidMount() {
		//PetfulApi.enqueueCat('snuffles');
		//PetfulApi.enqueueDog('snuffles');
		PetfulApi.getAllCats().then((cat) => this.setState({ catQ: cat })).catch({ error: 'An Error has Occurred' });
		PetfulApi.getAllDogs().then((dog) => this.setState({ dogQ: dog })).catch({ error: 'An Error has Occurred' });
		//console.log(list)

		const changeList = () => {
			let temp = adoptionQueue.dequeue();
			let temp2 = namesArray.pop();
			let rand = Math.floor(Math.random()*2);
			let isTurn = false;
			let newPet = ''
			adoptionQueue.enqueue(temp2);
			namesArray.push(temp);
			
			console.log(rand)
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
			// this.setState({
			// 	currentNewOwner: temp,
			// 	currentPet: ''
			// });
			//adoptionQueue.enqueue(temp2);
			// namesArray.push(temp);
			// if(rand==1){
			// 	let dogs = [...this.state.dogQ]
			// 	dogs.push(newPet)
			// 	console.log('hello der')
			// 	this.setState({ dogQ : dogs })
			// } else if(rand ==0){
			// 	let cats = [...this.state.catQ]
			// 	cats.push(newPet)
			// 	console.log('hello der')
			// 	this.setState({ catQ : cats })
			// }
			// console.log(adoptionQueue.display());	
		};

		//if(this.state.registered){
				//this.setState({numberInLine : this.state.numberInLine - 1})
		//	}
	}

	this.interval = setInterval(changeList, 10000);
   }

	componentWillUnmount(){
		clearInterval(this.interval);
		//PetfulApi.getAllCats().then((cat) => this.setState({ catQ: cat })).catch({ error: 'An Error has Occurred' });
		//PetfulApi.getAllDogs().then((dog) => this.setState({ dogQ: dog })).catch({ error: 'An Error has Occurred' });
	}

	showButton(){
		if(this.state.turnToAdopt){
			return(
                <button type="button" disabled={!this.state.turnToAdopt} onClick={this.adoptDog}>
						Adopt
			    </button>		
			)
		} else {
			return(
			<div>
				<p> Please Adopt Me! </p>
			</div>
			)
		}
	}
	// componentDidUpdate(){
	// 	if(!this.state.catQ){
	// 	PetfulApi.getAllCats().then((cat) => this.setState({ catQ: cat })).catch({ error: 'An Error has Occurred' });
	// 	PetfulApi.getAllDogs().then((dog) => this.setState({ dogQ: dog })).catch({ error: 'An Error has Occurred' });
	// 	}
	// }

	// componentWillUnmount(){
	// 	PetfulApi.clearDogs()
	// }

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
						<div className="dog">
							<h3>Dogs</h3>
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
											<li>Story: {dog.story}</li>
										</ul>
										{this.showButton()}
										{/* <button type="button" disabled={!this.state.turnToAdopt} onClick={this.adoptDog}>
											Adopt
										</button> */}
									</div>
								);
							})}
						</div>

						<div className="cat">
							<h3>Cats</h3>
							{this.state.catQ.map((cat, index) => {
								return (
									<div className="cat-list" key={index}>
										<img className="pet-img" src={cat.imageURL} alt={cat.imageDescription} />
										<ul>
											<li>Name: {cat.name}</li>
											<li>Age: {cat.age}</li>
											<li>Sex: {cat.sex}</li>
											<li>Breed: {cat.breed}</li>
											<li>Story: {cat.story}</li>
										</ul>
										{this.showButton()}
										{/* <button type="button" disabled={!this.state.turnToAdopt} onClick={this.adoptCat}>
											Adopt
										</button> */}
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
							number {this.state.numberInLine} in line
						</h4>
					</div>
				) : null}
			</div>
		);
	}
}

export default AdoptionPage;
