import React from 'react';
import PetfulApi from '../../Services/petful-api-service';

export class DogList extends React.Component {
	state = {
		dogQ: null,
		positionInQ: 0,
		loading: true
	};

	componentDidMount() {
		PetfulApi.getAllDogs().then((dog) => this.setState({ dogQ: dog, loading: false }));
	}
	nextDog = () => {
		this.setState({ positionInQ: this.state.positionInQ + 1 });
	};
	prevDog = () => {
		this.setState({ positionInQ: this.state.positionInQ - 1 });
	};

	adoptDog() {
		PetfulApi.adoptDog().then((res) => {
			let { dogQ } = this.state;
			dogQ.shift();
			this.setState({ dogQ: dogQ });
			this.props.resetPosition();
		});
	}
	render() {
		if (this.state.loading) return 'loading';
		const positionInQ = this.state;
		const dog = this.state.dogQ[this.state.positionInQ];
		let adoptable = true;
		if (positionInQ !== 0) adoptable = false;
		if (this.props.position !== 0) adoptable = false;

		return (
			<div className="dogsQ">
				<img src={dog.imageURL} alt={dog.imageDescription} />
				<h3>{dog.name}</h3>
				<ul>
					<li>Sex: {dog.sex}</li>
					<li>Age: {dog.age}</li>
					<li>Breed: {dog.breed}</li>
					<li>Story: {dog.story}</li>
				</ul>
				<button
					onClick={this.adoptDog}
					className={adoptable ? '' : 'disabled'}
					disabled={adoptable ? false : true}
				>
					Adopt
				</button>
				<br />
				<button className="nav" onClick={this.prevDog} hidden={!positionInQ}>
					Previous
				</button>
				<button className="nav" onClick={this.nextDog} hidden={positionInQ === this.state.dogQ.length - 1}>
					Next
				</button>
			</div>
		);
	}
}

export default DogList;
