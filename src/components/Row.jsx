import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FeedbackBox from './FeedbackBox';
import '../styles/Row.styles.css';

class Row extends React.Component {
	constructor() {
		super();
		this.state = {
			isValid: true
		};
	}

	handleSubmit(event) {
		/**
		 * As a default behaviour submit rerenders page
		 * preventDefault will prevent this behaviour
		 */
		event.preventDefault();
		const formData = new FormData(event.target);

		const userCombination = formData.getAll('input');

		const isValid = this.validateInputs(userCombination);
		this.setState({ isValid });
		if (isValid) {
			this.props.handleSubmit(userCombination);
		}
	}

	validateInputs(inputsArray) {
		let isValid = true;
		inputsArray.forEach(input => {
			if (!input || isNaN(input) || Number(input) < 0 || Number(input) > 7) {
				isValid = false;
			}
		});
		return isValid;
	}

	render() {
		return (
			<div>
				<form className='row-form' noValidate autoComplete='off' onSubmit={e => this.handleSubmit(e)}>
					<div className='row-form-fields-container'>
						{new Array(4).fill().map(() => {
							return (
								<div className='row-form-text-field'>
									<TextField
										disabled={this.props.rowIsDisabled}
										name='input'
										required
										variant='outlined'
										InputProps={{ inputProps: { min: 0, max: 7 } }}
									/>
								</div>
							);
						})}

						<div className='row-form-button-container'>
							{this.props.rowState ? (
								<FeedbackBox
									inPlaceDigits={this.props.rowState.inPlaceDigitsCount}
									notInPlaceDigits={this.props.rowState.notInPlaceDigitsCount}
								/>
							) : (
								<Button disabled={this.props.rowIsDisabled} type='submit' variant='contained' color='primary'>
									Check
								</Button>
							)}
						</div>
					</div>
					{!this.state.isValid && <div className='row-form-validation'>You can only use numbers from 0 to 7</div>}
				</form>
			</div>
		);
	}
}

export default Row;
