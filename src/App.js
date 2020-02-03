import React from 'react';
import Board from './components/Board';
import './App.css';
import { Button } from '@material-ui/core';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			gameStarted: false
		};
	}

	startGame() {
		this.setState({
			gameStarted: true
		});
	}

	resetGame() {
		this.setState({
			gameStarted: false
		});
	}

	render() {
		return (
			<div className='app'>
				{this.state.gameStarted ? (
					<Board resetGame={() => this.resetGame()} />
				) : (
					<div className='app-container'>
						<div className='app-container-header'>Welcome to Mastermind game!</div>

						<Button variant='contained' color='primary' onClick={() => this.startGame()}>
							Start
						</Button>
					</div>
				)}
			</div>
		);
	}
}

export default App;
