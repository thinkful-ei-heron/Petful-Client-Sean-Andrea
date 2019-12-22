import React from 'react';

const JoinQ = (props) => {
	return (
		<form className="JoinQ" onSubmit={(e) => props.onSubmit(e)}>
			<label>
				My Name is
				<input type="text" placeholder="John Travolta" name="name" required />
				<button type="submit">Join</button>
			</label>
		</form>
	);
};
export default JoinQ;
