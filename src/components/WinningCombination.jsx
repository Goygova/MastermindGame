import React from 'react';
import '../styles/WinningCombination.styles.css';

class WinningCombination extends React.Component {
	render() {
		return (
			<div className='winning-combinaion-container'>
				{this.props.combination.map(val => {
					return <div className='winning-combinaion-item'> {this.props.showWinningCombinaion ? val : 'X'} </div>;
				})}
			</div>
		);
	}
}

export default WinningCombination;
