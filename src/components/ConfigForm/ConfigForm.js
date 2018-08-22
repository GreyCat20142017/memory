import React from 'react'
import ReactDOM from 'react-dom';
import './ConfigForm.css'

import {INITIAL_CONFIG, ESC_KEYCODE} from '../global.js'

class ConfigForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cardsAmount: this.props.cardsAmount, sound: this.props.sound, layoutDelay: this.props.layoutDelay,
                  coloredBack: this.props.coloredBack, saveConfig: this.props.saveConfig};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDefault = this.handleDefault.bind(this);
    this.handleCardsAmountChange = this.handleCardsAmountChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleOut = this.handleOut.bind(this);
    this.setFocus = this.setFocus.bind(this);
  }

  componentDidMount() {
    this.setFocus('#id-check-1');
  }

  handleOut(e) {
    if (e.currentTarget.className === 'config' && e.target.className === 'config' ) {
     this.setFocus('#id-closeButton');
   }
 }

  handleCardsAmountChange(e) {
    this.setState({cardsAmount: parseInt(e.target.value, 10)});
  }

  handleInputChange(e) {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  handleCheckboxChange(e) {
    const {name, checked} = e.target;
    this.setState({[name]: checked});
  }

  handleSubmit(e) {
    e.preventDefault();
    const {sound, coloredBack, cardsAmount, layoutDelay, saveConfig} = this.state;
    this.props.onCloseConfig({sound, coloredBack, cardsAmount, layoutDelay, saveConfig});
  }

  handleClose(e) {
    e.preventDefault();
    this.props.onCloseConfig(null);
  }

  handleDefault(e) {
   e.preventDefault();
   this.setState({cardsAmount: INITIAL_CONFIG.cardsAmount, sound: INITIAL_CONFIG.sound, layoutDelay: INITIAL_CONFIG.layoutDelay,
                  coloredBack: INITIAL_CONFIG.coloredBack, saveConfig: INITIAL_CONFIG.saveConfig});
  }

  handleKeyDown(e) {
     if (e.keyCode === ESC_KEYCODE) {
      this.props.onCloseConfig(null);
    }
  }

  setFocus(elementID) {
    const thisDOM = ReactDOM.findDOMNode(this);
    const elem = thisDOM.querySelector(elementID);
    if (elem) {
      elem.focus();
    }
  }


  render() {
    const {sound, coloredBack, cardsAmount, layoutDelay, saveConfig} = this.state;
    return (
      <div className = 'config' onKeyDown={this.handleOut}  onClick={this.handleOut}>
        <div className = 'config__wrapper'>
          <form className='config__form form' onSubmit={this.handleSubmit} onKeyDown={this.handleKeyDown} tabIndex='-1'>
           <h2>Настройка*</h2>
           <p>Звук: {this.props.speakerVoiceSupport.message}</p>
            <p className='form__option option'>
                <input className='option__control option__control--checkbox visually-hidden' type='checkbox'
                       id='id-check-1' name='sound' title='Звук'  checked={sound} onChange={this.handleCheckboxChange} disabled={!this.props.speakerVoiceSupport.state}/>
                <label className='option__label' htmlFor='id-check-1'>Звук</label>
            </p>
            <p className='form__option option'>
              <input  className='option__control option__control--checkbox visually-hidden' type='checkbox' id='id-check-2'
               onChange={this.handleCheckboxChange} name='coloredBack' title='Подкрашивать карты' checked={coloredBack}/>
              <label className='option__label' htmlFor='id-check-2'>Цветные карты</label>
            </p>

            <ul className='form__options form__options--bordered form__options--radio'>
              <li className='form__option option'>
                <input className='option__control option__control--radio visually-hidden' type='radio' id='id-radio-1' name='cardsAmount' title='колода из 36 карт'
                value='0' onChange={this.handleCardsAmountChange}  checked = {cardsAmount === 0}/>
                <label className='option__label' htmlFor='id-radio-1'>36 карт</label>
              </li>
              <li className='form__option option'>
                <input className='option__control option__control--radio visually-hidden' type='radio' id='id-radio-2' name='cardsAmount' title='колода из 52 карт'
                value='1' onChange={this.handleCardsAmountChange}  checked = {cardsAmount === 1}/>
                <label  className='option__label' htmlFor='id-radio-2'>52 карты</label>
              </li>
            </ul>

            <div className='form__field field field--required'>
              <label className='field__label' htmlFor='id-layoutDelay'>Пауза для запоминания раскладки, миллисекунды:</label>
              <input className='field__input field__input--small' type='text' pattern='\b[0-9]{4}'  maxLength='4' id='id-layoutDelay' name='layoutDelay'
                     placeholder='5000' title='Число милисекунд, от 1000 до 9999' value={layoutDelay} onChange={this.handleInputChange} required/>
            </div>

            <p className='form__option option'>
              <input  className='option__control option__control--checkbox visually-hidden' type='checkbox' id='id-check-3'
               onChange={this.handleCheckboxChange} name='saveConfig' title='Сохранять параметры игры при выходе' checked={saveConfig} disabled/>
              <label className='option__label option__label--small' htmlFor='id-check-4'>Сохранять параметры при выходе из игры</label>
            </p>

            <div className='game__buttons game__buttons--form'>
              <button className='game__btn game__btn--small game__btn--config' type='submit'
                      id='id-submitButton' title='Сохранить текущие параметры и закрыть форму'>Сохранить</button>
              <button className='game__btn game__btn--small game__btn--config' type='button' onClick={this.handleClose}
                      id='id-closeButton' title='Закрыть форму без сохранения параметров'>Отмена</button>
              <button className='game__btn game__btn--small game__btn--config' type='button' onClick={this.handleDefault}
                      id='id-defaultButton' title='Восстановить параметры по умолчанию без закрытия формы'>&#8635;</button>
              <p className='game__info'>*Новые параметры вступят в силу после перезапуска игры</p>
            </div>

          </form>
        </div>
      </div>
    )
  }
}

export default ConfigForm
