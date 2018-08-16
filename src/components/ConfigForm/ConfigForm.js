import React from 'react'
import './style.css'

class ConfigForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cardsAmount: this.props.cardsAmount, sound: this.props.sound, layoutDelay: this.props.layoutDelay, coloredBack: this.props.coloredBack};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.handleCardsAmountChange = this.handleCardsAmountChange.bind(this);

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
    const {sound, coloredBack, cardsAmount, layoutDelay} = this.state
    this.props.onCloseConfig({sound, coloredBack, cardsAmount, layoutDelay});
  }


  handleClose(e) {
    e.preventDefault();
    this.props.onCloseConfig(null);
  }

  render() {
    const {sound, coloredBack, cardsAmount, layoutDelay} = this.state
    return (
      <form className='form' onSubmit={this.handleSubmit}>
       <h2>Настройка*</h2>
       <p>Звук: {this.props.speakerVoiceSupport}</p>
        <p className='form__option option'>
            <input className='option__control option__control--checkbox visually-hidden' type='checkbox'
                   id='id-check-2' name='sound' title='Звук'  checked={sound} onChange={this.handleCheckboxChange}/>
            <label className='option__label' htmlFor='id-check-2'>Звук</label>
        </p>

        <ul className='form__options form__options--bordered form__options--radio'>
          <li className='form__option option'>
            <input className='option__control option__control--radio visually-hidden' type='radio' id='id-radio-1' name='cardsAmount' title='колода из 36 карт'
            value='0' onChange={this.handleCardsAmountChange}  checked = {cardsAmount === 0}/>
            <label className='option__label' htmlFor='id-radio-1'>36 карт</label>
          </li>
          <li className='form__option option'>
            <input className='option__control option__control--radio visually-hidden' type='radio' id='id-radio-2' name='cardsAmount' title=' колода из 52 карт'
            value='1' onChange={this.handleCardsAmountChange}  checked = {cardsAmount === 1}/>
            <label  className='option__label' htmlFor='id-radio-2'>52 карты</label>
          </li>
        </ul>


        <p className='form__option option'>
          <input  className='option__control option__control--checkbox visually-hidden' type='checkbox' id='id-check-3'
           onChange={this.handleCheckboxChange} name='coloredBack' title='Подкрашивать карты' checked={coloredBack}/>
          <label className='option__label' htmlFor='id-check-3'>Цветные карты</label>
        </p>

        <div className='form__field field field--required'>
          <label className='field__label' htmlFor='id-layoutDelay'>Пауза для запоминания раскладки, миллисекунды:</label>
          <input className='field__input field__input--small' type='text' pattern='\b[0-9]{4}'  maxLength='4' id='id-layoutDelay' name='layoutDelay'
                 placeholder='5000' title='Число милисекунд, от 1000 до 9999.' value={layoutDelay} onChange={this.handleInputChange} required/>
        </div>


        <div className='game__buttons game__buttons--form'>
          <button className='game__btn game__btn--small' type='submit'>Сохранить</button>
          <button className='game__btn game__btn--small' type='button' onClick={this.handleClose}>Отмена</button>
          <p>*Новые параметры вступят в силу после перезапуска игры</p>
        </div>

      </form>
    );
  }
}

export default ConfigForm
