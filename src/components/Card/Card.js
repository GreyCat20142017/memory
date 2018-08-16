import React, {Component} from 'react'
import './style.css'

const ENTER_KEYCODE = 13;

class  Card extends Component {
	onClickHandler(e) {
		e.preventDefault();
		this.props.onCardClick(this.props.data.id);
	}

	onKeyDownHandler(e) {
		if (e.keyCode === ENTER_KEYCODE) {
			// e.preventDefault();
			this.props.onCardClick(this.props.data.id);
		}
	}

	render() {
		const STAGES = [ 'closed', 'open', 'invisible'];
		const {code, value, suit, color, stage, backcolor} = this.props.data;
		const layoutClass = 'card card--' + STAGES[stage] + ' card--' + color +' card--' + backcolor;

		return (
			<div className={layoutClass} data-code={code} data-suit={String.fromCharCode(suit)} tabIndex='0'
				onClick={this.onClickHandler.bind(this)} onKeyDown={this.onKeyDownHandler.bind(this)}>

				<p className='card__content' data-value={value} data-suit={String.fromCharCode(suit)}></p>
			</div>)
		}
	}

	export default Card
