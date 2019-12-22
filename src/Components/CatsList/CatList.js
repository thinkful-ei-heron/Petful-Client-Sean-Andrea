import React from 'react';
import PetfulApi from '../../Services/petful-api-service';

export class CatList extends React.Component {
	state = {
		catQ: null,
		positionInQ: 0,
		loading: true
	};

	componentDidMount() {
		PetfulApi.getAllCats().then((cat) => this.setState({ catQ: cat, loading: false }));
	}
	nextCat = () => {
		this.setState({ positionInQ: this.state.positionInQ + 1 });
	};
	prevCat = () => {
		this.setState({ positionInQ: this.state.positionInQ - 1 });
	};

	adoptCat() {
		PetfulApi.adoptCat().then((res) => {
			let { catQ } = this.state;
			catQ.shift();
			this.setState({ catQ: catQ });
			this.props.resetPosition();
		});
	}
	render() {
		if (this.state.loading) return 'loading';
		const positionInQ = this.state;
		const cat = this.state.catQ[this.state.positionInQ];
		let adoptable = true;
		if (positionInQ !== 0) adoptable = false;
		if (this.props.position !== 0) adoptable = false;

		return (
			<div className="CatsQ">
				<img src={cat.imageURL} alt={cat.imageDescription} />
				<h3>{cat.name}</h3>
				<ul>
					<li>Sex: {cat.sex}</li>
					<li>Age: {cat.age}</li>
					<li>Breed: {cat.breed}</li>
					<li>Story: {cat.story}</li>
				</ul>
				<button
					onClick={this.adoptCat}
					className={adoptable ? '' : 'disabled'}
					disabled={adoptable ? false : true}
				>
					Adopt
				</button>
				<br />
				<button className="nav" onClick={this.prevCat} hidden={!positionInQ}>
					Previous
				</button>
				<button className="nav" onClick={this.nextCat} hidden={positionInQ === this.state.catQ.length - 1}>
					Next
				</button>
			</div>
		);
	}
}

export default CatList;
