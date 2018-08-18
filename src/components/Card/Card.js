import React, {Component} from 'react'
import './style.css'

import {ENTER_KEYCODE} from '../global.js'

class  Card extends Component {
	onClickHandler(e) {
		e.preventDefault();
		this.props.onCardClick(this.props.data.id);
	}

	shouldComponentUpdate(nextProps) {			
		return (nextProps.renderOnly.length === 0) ? true : (nextProps.renderOnly.join().indexOf(nextProps.data.id) >= 0);
	}

	onKeyDownHandler(e) {
		if (e.keyCode === ENTER_KEYCODE) {
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
