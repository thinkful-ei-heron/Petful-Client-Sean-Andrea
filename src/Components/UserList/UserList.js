import React from 'react';

export class UserList extends React.Component {
	render() {
		const users = [];
		const { positionInO } = this.props;
		if (this.props.userQ) {
			this.props.userQ.forEach((user, index) => {
				users.push(<li key={index}>{user.name}</li>);
			});
			return (
				<div className="user-list">
					<h2>People waiting to adopt</h2>
					<ul>Next in line: {users}</ul>
					<br />
					<p className="userPositionInQ">
						{positionInQ === 0 ? (
							"It's your turn to adopt!"
						) : positionInO !== null ? (
							`Your ${position + 1} in the Queue`
						) : (
							''
						)}
					</p>
				</div>
			);
		}
	}
}

export default UserList;
