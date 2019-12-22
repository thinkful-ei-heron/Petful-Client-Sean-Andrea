import React from 'react';
import { adoptionQueue, namesArray } from '../../Queue';
import DogsList from '../DogsList/DogList';
import CatsList from '../CatsList/CatList';
import UserList from '../UserList/UserList';
import './adoptionPage.css';

class AdoptionPage extends React.Component {
	state = {
		userQ: null,
		positionInQ: null,
		loadingCat: true,
		loadingDog: true,
		loadingUser: true
		// id: null
	};

	componentDidMount() {
		this.setState;
	}

	render() {
		return (
			<div className="adoptionPage">
				<div className="adoption">
					<header>
						<h1> Welcome to Petful Adoption Center! </h1>
						<h2> Adoption Page </h2>
					</header>
					<div className="pet-list">
						<div className="dog">
							<h3>Dogs</h3>
							<DogsList />
							<br />

							<div className="cat">
								<h3>Cats</h3>
								<CatsList />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AdoptionPage;
