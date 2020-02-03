import React from 'react';
import '../styles/FeedbackBox.styles.css';
import Tooltip from '@material-ui/core/Tooltip';

const MAX_AMOUNT_OF_ELEMENTS = 4;
const GREEN_DOT_EXPLANATION = `Green dot - correct number at correct spot.`;
const BLUE_DOT_EXPLANATION = `Blue dot - correct number at incorrect spot.`;
const WHITE_DOT_EXPLANATION = `White dot - inccorect number.`;

class FeedbackBox extends React.Component {
	render() {
		const inPlaceDigits = new Array(this.props.inPlaceDigits).fill().map(() => {
			return (
				<Tooltip placement='right' title={GREEN_DOT_EXPLANATION}>
					<div className='feedback-box-element-in-place'></div>
				</Tooltip>
			);
		});
		const notInPlaceDigits = new Array(this.props.notInPlaceDigits).fill().map(() => {
			return (
				<Tooltip placement='right' title={BLUE_DOT_EXPLANATION}>
					<div className='feedback-box-element-not-in-place'></div>
				</Tooltip>
			);
		});
		const feedbackBoxesAmount = this.props.inPlaceDigits + this.props.notInPlaceDigits;

		const restFeedbackElements = new Array(MAX_AMOUNT_OF_ELEMENTS - feedbackBoxesAmount).fill().map(() => {
			return (
				<Tooltip placement='right' title={WHITE_DOT_EXPLANATION}>
					<div className='feedback-box-element'></div>
				</Tooltip>
			);
		});
		const allBoxes = inPlaceDigits.concat(notInPlaceDigits).concat(restFeedbackElements);
		return (
			<div className='feedback-box-container'>
				<div>
					{allBoxes[0]}
					{allBoxes[1]}
				</div>
				<div>
					{allBoxes[2]}
					{allBoxes[3]}
				</div>
			</div>
		);
	}
}

export default FeedbackBox;
