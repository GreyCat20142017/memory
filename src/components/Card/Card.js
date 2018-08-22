import React, {Component} from 'react'
import './Card.css'

import {ENTER_KEYCODE} from '../global.js'

class  Card extends Component {
  ClickHandler(e) {
    e.preventDefault();
    this.props.handleCardClick(this.props.data.id);
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.renderOnly.length === 0) ? true : (nextProps.renderOnly.join().indexOf(nextProps.data.id) >= 0);
  }

  KeyDownHandler(e) {
    if (e.keyCode === ENTER_KEYCODE) {
      this.props.handleCardClick(this.props.data.id);
    }
  }

  render() {
    const STAGES = [ 'closed', 'open', 'invisible'];
    const {code, value, suit, color, stage, backcolor} = this.props.data;
    const layoutClass = 'card card--' + STAGES[stage] + ' card--' + color +' card--' + backcolor;

    return (
      <div className={layoutClass} data-code={code} data-suit={String.fromCharCode(suit)} tabIndex='0'
          onClick={this.ClickHandler.bind(this)} onKeyDown={this.KeyDownHandler.bind(this)}>
      <p className='card__content' data-value={value} data-suit={String.fromCharCode(suit)}></p>
      </div>)
  }
}

export default Card
