import React, { Component } from 'react';
import './CongratsPage.css';

export class CongratsPage extends Component {
	clickHandler = (e) => {
		console.log('Ive been clicked!');
		this.props.changePage('AdoptionPage');
	};
	render() {
		return (
			<div className="congrats-page">
				<h2>Congratulations your adoption was successful!</h2>
				<img src="https://wallpaperaccess.com/full/1122730.jpg" alt="cat and dog hugging" />

				<h3> If you would like to adopt again, please rejoin the queue </h3>
				<button className="congrats-btn" type="button" onClick={this.clickHandler}>
					Adopt More!
				</button>
			</div>
		);
	}
}

export default CongratsPage;
