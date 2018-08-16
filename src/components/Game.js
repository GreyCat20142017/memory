import React, {Component} from 'react'
import Card from './Card/Card.js'
import ConfigForm from './ConfigForm/ConfigForm.js'
import Mult from './Mult/Mult.js'
import SpeakerVoice from './SpeakerVoice'

import './Game.css'

const VARIANTS = [36, 52];

const AMOUNT_PAIRS = 9;
let cardsAmount = 0;
let layoutDelay = 1000;
let coloredBack = true;
let sound = true;

const SCORE_MULTIPLIER = 42;
const CLICK_DELAY = 700;
const CONGRATULATION_SCORE = 1000;


const ERROR_SOUNDS = [{'ru-RU': 'Ай', 'en-US': 'Not correct'}, {'ru-RU': 'Ой', 'en-US': 'False'}, {'ru-RU': 'Ошибочка', 'en-US': 'Mistake'},
											{'ru-RU': 'Ну нет', 'en-US': 'No'}, {'ru-RU': 'Мимо', 'en-US': 'Not right'},
											{'ru-RU': 'Это промах', 'en-US': 'Oh, no!'}, {'ru-RU': 'Ох', 'en-US': 'Misstep'}];

const OK_SOUNDS = [{'ru-RU': 'Это правильно', 'en-US': 'Correct'}, {'ru-RU': 'Попадание', 'en-US': 'Hit'}, {'ru-RU': 'Ура', 'en-US': 'Hurrah!'},
											{'ru-RU': 'Да', 'en-US': 'Yes'}, {'ru-RU': 'Точно', 'en-US': 'Exactly'},
											{'ru-RU': 'Есть', 'en-US': 'Right'}, {'ru-RU': 'Класс', 'en-US': 'Truly'}];

const FINAL_MESSAGE = [{'ru-RU': 'Это здорово!', 'en-US': 'it`s great'},
											{'ru-RU': 'Нормально, но нужно расти над собой...', 'en-US': 'It`s normal, but you need to grow above yourself ...'}];

const START_MESSAGE = {'ru-RU': 'Игра начнется, когда карты перевернутся', 'en-US': 'The game will start when the cards turn over'};

const _generateArr =  function(AMOUNT_PAIRS, amountTotal, stage) {
	let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9' ,'10', 'J', 'Q', 'K'];
	const SUITS =  ['9824': 'spades', '9827': 'clubs', '9830': 'diams', '9829': 'hearts'];

	const amountInSuit = parseInt(amountTotal / 4, 10);
	if (amountTotal === Math.min(...VARIANTS))  {
		values.splice(1, 4);
	}

	const _reSortArr = function (arr) {
		var array = arr.slice();
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}

	const arr=[];
	for (let i = 0; i < amountTotal; i++) {
		arr.push(i);
	}

	const newArr =_reSortArr(arr).slice( 0, AMOUNT_PAIRS).map(function(item, ind) {return {backcolor: (coloredBack ? ind+1: 0), code: item}});
	const items = _reSortArr([...newArr,...newArr]);
	return items.map(function({code, backcolor}, ind) {const data = {id: ind, code: code, stage: stage, suit: SUITS[Math.floor(code / amountInSuit)],
		value: values[code % amountInSuit], color: (code < amountTotal / 2) ? 'black' : 'red', backcolor: backcolor};  return data});
};

const _random = function (min, max) {
	var rand = min - 0.5 + Math.random() * (max - min + 1);
	rand = Math.round(rand);
	return rand;
};

const _randomFromArray = function (arr) {
	return arr[_random(1, arr.length) - 1];
};

const _numstr = (numSource, textForms)  => {
	numSource = Math.abs(numSource) % 100;
	let numTmp = numSource % 10;
	if (numSource > 10 && numSource < 20) { return textForms[2]; }
	if (numTmp > 1 && numTmp < 5) { return textForms[1]; }
	if (numTmp === 1) { return textForms[0]; }
	return textForms[2];
}

class  Game extends Component {
	constructor(props) {
		super(props);
		this.state = {items: new Array(AMOUNT_PAIRS * 2), score: 0, reverseList: [], openPairs: 0, status: 'stopped', currentScreen: 'Game'};
		this.start = this.start.bind(this);
		this.config = this.config.bind(this);
		this.closeConfig = this.closeConfig.bind(this);
		this.onCardClick = this.onCardClick.bind(this);
		this.bormo = new SpeakerVoice();
	}

	componentDidMount() {
		if (this.bormo.supportSound) {
			// eslint-disable-next-line
			const speechSynthesisFeatureFixing = window.speechSynthesis.getVoices();
		}
	}

	revertStage() {
		const items = this.state.items;
		for (let i=0; i < items.length; i++) {
			items[i].stage = (items[i].stage === 0) ? 1: 0;
		};
		this.setState({items: items, status: 'started'});
	}


	start() {
		if (this.state.status === 'waiting') { return;};

		if (this.bormo.supportSound && (this.bormo.speaker === null)) {
			this.bormo.setSpeaker();
			this.bormo.speak(START_MESSAGE[this.bormo.speaker.lang]);
		}

		this.setState({items: _generateArr(AMOUNT_PAIRS, VARIANTS[cardsAmount], 1), score: 0, reverseList: [], openPairs: 0, status: 'waiting', currentScreen: 'Game'});
		setTimeout(this.revertStage.bind(this), layoutDelay);
	}

	onCardClick(id) {

		let {items, score, reverseList, openPairs, status} = this.state;
		const idx = items.indexOf(items.filter(item => item.id === id)[0]);
		if ( (( status === 'started') && (items[idx]['stage'] === 1)) || (status === 'waiting') ) {return;};
		if (status === 'started') {
			items[idx]['stage'] = (items[idx]['stage']) === 0 ? 1: 0;
			if (items[idx]['stage'] === 1) {
				reverseList.push(idx);
			}

			this.setState({items: items})

			if (reverseList.length === 2) {
				const ok = items[reverseList[0]]['code'] === items[reverseList[1]]['code'];

				this.bormo.speak(ok ? _randomFromArray(OK_SOUNDS)[this.bormo.speaker.lang] : _randomFromArray(ERROR_SOUNDS)[this.bormo.speaker.lang]);

				this.setState({status: 'waiting'});
				setTimeout( f => {

					let sign = (ok) ? 1: (-1);

					items[reverseList[0]]['stage'] += sign;
					items[reverseList[1]]['stage'] += sign;

					score +=  SCORE_MULTIPLIER * sign * ((ok) ? (AMOUNT_PAIRS - openPairs): openPairs);
					openPairs = (ok) ? (openPairs + 1): openPairs;

					if (openPairs === AMOUNT_PAIRS) {
						this.bormo.speak(score >= CONGRATULATION_SCORE ? FINAL_MESSAGE[0][this.bormo.speaker.lang] : FINAL_MESSAGE[1][this.bormo.speaker.lang]);
					};

					reverseList = [];
					this.setState({items: items, score: score, reverseList: reverseList, openPairs: openPairs, status: (openPairs === AMOUNT_PAIRS) ? 'finished' : 'started'})
				}, CLICK_DELAY);
			};
		};
	}

	config() {
		 this.setState({currentScreen: 'Config'});
	}

	getStatusMessage() {
		const {status, score} = this.state;
		switch (status) {
			case 'started' : 	return 'Текущий счет: '+score;
			case 'waiting' : 	return 'Пауза...';
			case 'stopped' : 	return '' + VARIANTS[cardsAmount] + ' ' + (coloredBack ? 'цветн' : 'обычн') +
												_numstr(VARIANTS[cardsAmount], ['ая карта','ые карты','ых карт']) +	'.  Звук ' + (sound ? 'включен': 'отключен');
			case 'finished' :  return (score >= CONGRATULATION_SCORE? 'Примите поздравления!' : 'Игра окончена.') + ' Итоговый счет: ' + score;
			default: return '';
		}
	}

	closeConfig(returnValues) {
		if (returnValues) {
			sound = returnValues.sound;
			coloredBack = returnValues.coloredBack;
			layoutDelay = returnValues.layoutDelay;
			cardsAmount = returnValues.cardsAmount;
			this.bormo.mute(!sound);
		}
		this.setState({currentScreen: 'Game'});
	}

	render() {

		if (this.state.currentScreen === 'Game') {
			const {status, items} = this.state;
			const lis = items.map(function(item, ind) {
				return <li className='game__item' key = {ind}> <Card onCardClick = {this.onCardClick} data = {item}/></li>
			}, this);

			const buttonName = (status === 'stopped')? ' Начать игру': ((status === ' finished') ?  'Еще раз' : 'Перезапустить');
			const gameWrapperContent = (status === 'stopped' || status === 'finished') ?
				<Mult multTitle='Memory' multSubtitle='Игра по мотивам одного ТЗ'/> :
				<ul className='game__layout'>{lis}</ul>;

			return (<div className='game'>
				<div className='game__wrapper'>
					{gameWrapperContent}
				</div>
				<div className='game__controls'>
					<span className='game__score'> {this.getStatusMessage()}</span>
					<div className='game__buttons'>
						<button className='game__btn game__btn--start' type='button' onClick = {this.start} title='Начать или перезапусить игру'>{buttonName}</button>
						<button className='game__btn game__btn--config' type='button' onClick = {this.config} title='Настройка параметров игры'>&#9998;</button>
					</div>
				</div>

				</div>)
		}
		else { //currentScreen === ' Config'
			return (<div className='game'>
								<div className='game__wrapper game__wrapper--config'>
									<ConfigForm speakerVoiceSupport = {this.bormo.getVoiceSupport()} sound = {sound} coloredBack = {coloredBack}
															cardsAmount = {cardsAmount} layoutDelay = {layoutDelay}
															onCloseConfig = {this.closeConfig}/>
								</div>
				</div>)
		}
	}
}

export default Game
