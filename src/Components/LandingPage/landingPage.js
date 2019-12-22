import React from 'react';
import { Link } from 'react-router-dom';
import './landingPage.css';

const LandingPage = () => {
	return (
		<div className="landingPage">
			<img
				className="landing-img"
				src="http://shared.frenys.com/assets/1023908/6154530.jpg"
				alt="cute cat and dog"
			/>
			<h1> Welcome to Petful Adoption Center! </h1>
			<h2> Some Useful Information </h2>
			<p> Petful adopts dogs and cats to prospective families on a first come, first served basis.</p>
			<p> In the event that it is your turn to adopt, you have a choice of whichever dog or cat (or</p>
			<p> possibly both) has been waiting the longest to be adopted. </p>
			<p> If you are interested in adopting, please feel free to register on the following page. </p>
			<Link to="/allPets">
				<button>Continue</button>
			</Link>
		</div>
	);
};

export default LandingPage;
