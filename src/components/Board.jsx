import React from 'react';
import Row from './Row';
import '../styles/Board.styles.css';
import axios from 'axios';
import WinningCombination from './WinningCombination';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const TOTAL_NUMBER_OF_ATTEMPTS = 10;
const SCORE_MULTIPLIER = 10;
const AMOUNT_NUMBERS_TO_GUESS = 4;

class Board extends React.Component {
	constructor() {
		super();
		this.initialState = {
			winningCombination: [],
			winningCombinationLookup: {},
			gameState: {
				currentRowIndex: 0,
				userWon: false,
				remainingGuesses: TOTAL_NUMBER_OF_ATTEMPTS,
				score: 0
			},
			isModalWindowOpen: false
		};
		this.state = this.initialState;
	}

	componentDidMount() {
		this.fetchWinningCombination();
	}

	async fetchWinningCombination() {
		const response = await axios.get('https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new');

		const winningCombination = this.parseCombination(response.data);

		this.setState({ winningCombination });
	}

	/**
	 * API returns a text with each value on new line.
	 * This function creates an array from that text.
	 * @param {*} plainText
	 */
	parseCombination(plainText) {
		return plainText.split('\n').filter(el => el.trim());
	}

	/**
	 * Creates lookup hash table from the combination passed in.
	 * @param {*} combination
	 */
	getCombinationLookup(combination) {
		const lookUp = {};
		for (let i = 0; i < combination.length; i++) {
			const digit = combination[i];
			if (lookUp[digit]) {
				lookUp[digit]++;
			} else {
				lookUp[digit] = 1;
			}
		}
		return lookUp;
	}

	handleSubmit(userCombination, index) {
		const winningCombinationLookup = this.getCombinationLookup(this.state.winningCombination);

		// Filter out the values that user has entered in the correc place
		const filteredUserCombination = userCombination.filter((val, index) => {
			const hasDigitInPlace = val === this.state.winningCombination[index];
			if (hasDigitInPlace) {
				winningCombinationLookup[val]--;
				return false;
			}
			return true;
		});

		// calculate count of correct values in correct place
		const inPlaceDigitsCount = userCombination.length - filteredUserCombination.length;

		// Filter out values that are not in winning combination.
		const notInPlaceValues = filteredUserCombination.filter(val => {
			if (winningCombinationLookup[val] > 0) {
				winningCombinationLookup[val]--;
				return true;
			}
			return false;
		});

		const notInPlaceDigitsCount = notInPlaceValues.length;
		const userWon = inPlaceDigitsCount === AMOUNT_NUMBERS_TO_GUESS;
		const gameOver = index === TOTAL_NUMBER_OF_ATTEMPTS - 1;
		const score = gameOver && !userWon ? 0 : this.state.gameState.remainingGuesses * SCORE_MULTIPLIER;
		/**
		 * Set game state for the row where we clicked 'Submit'.
		 * We identify which row, by looking at the index passed in
		 */
		this.setState({
			gameState: {
				...this.state.gameState,
				currentRowIndex: this.state.gameState.currentRowIndex + 1,
				userWon: userWon,
				gameOver: gameOver,
				[index]: {
					inPlaceDigitsCount,
					notInPlaceDigitsCount
				},
				remainingGuesses: TOTAL_NUMBER_OF_ATTEMPTS - (index + 1),
				score: score
			},
			isModalWindowOpen: userWon || gameOver
		});
	}

	closeModal() {
		this.setState({
			isModalWindowOpen: false
		});
	}

	render() {
		/*
		 * Only current row should be enabled.
		 * Current row is stored on state and updated every time we click 'Submit'.
		 * All rows should be disabled if user wins.
		 */
		const shoulDisableRow = index => this.state.gameState.currentRowIndex !== index || this.state.gameState.userWon;

		// If winning combinaion is not loaded yet, show Loading bar.
		if (this.state.winningCombination.length === 0) {
			return (
				<div className='board-loading-bar'>
					<CircularProgress />
				</div>
			);
		}

		return (
			<div>
				<div className='board-header-container'>
					<div className='board-header'>
						<WinningCombination
							showWinningCombinaion={this.state.gameState.userWon || this.state.gameState.gameOver}
							combination={this.state.winningCombination}
						/>
						<div className='board-header-reset-game-button'>
							<Button variant='contained' color='secondary' onClick={() => this.props.resetGame()}>
								Reset
							</Button>
						</div>
					</div>
					<div className='board-header-remaining-guesses'>Remaining Guesses: {this.state.gameState.remainingGuesses}</div>
				</div>

				{new Array(TOTAL_NUMBER_OF_ATTEMPTS).fill().map((el, index) => {
					return (
						<Row
							rowState={this.state.gameState[index]}
							rowIsDisabled={shoulDisableRow(index)}
							handleSubmit={userCombination => this.handleSubmit(userCombination, index)}
						/>
					);
				})}
				<Modal open={this.state.isModalWindowOpen} className='modal-window'>
					<Paper className='modal-window-content' elevation={3}>
						<div className='modal-window-content-header-container'>
							<h2 className='modal-window-content-header'>{this.state.gameState.userWon ? 'Congratulations! You won!' : 'Game Over'}</h2>

							<div className='modal-window-content-header-close-button'>
								<IconButton size='small' onClick={() => this.closeModal()}>
									<CloseIcon fontSize='inherit' />
								</IconButton>
							</div>
						</div>
						<div className='modal-window-content-icon'>
							{this.state.gameState.userWon ? (
								<SentimentSatisfiedAltIcon fontSize='large' />
							) : (
								<SentimentVeryDissatisfiedIcon fontSize='large' />
							)}
						</div>
						<div className='modal-window-content-body'>Your score: {this.state.gameState.score}</div>
						<div className='modal-window-content-button'>
							<Button variant='contained' color='primary' onClick={() => this.props.resetGame()}>
								Play Again
							</Button>
						</div>
					</Paper>
				</Modal>
			</div>
		);
	}
}

export default Board;
