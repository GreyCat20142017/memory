import React, {Component} from 'react'
import Card from './Card/Card.js'
import ConfigForm from './ConfigForm/ConfigForm.js'
import Mult from './Mult/Mult.js'
import SpeakerVoice from './SpeakerVoice'

import {VARIANTS, AMOUNT_PAIRS, SCORE_MULTIPLIER, CLICK_DELAY, CONGRATULATION_SCORE, ERROR_SOUNDS, OK_SOUNDS, FINAL_MESSAGE, START_MESSAGE, CONFIG} from './global.js'
import {numstr, randomFromArray, generateArr} from './common.js'

import './Game.css'


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

		this.setState({items: generateArr(AMOUNT_PAIRS, VARIANTS[CONFIG.cardsAmount], 1), score: 0, reverseList: [], openPairs: 0, status: 'waiting', currentScreen: 'Game'});
		setTimeout(this.revertStage.bind(this), CONFIG.layoutDelay);
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

				this.bormo.speak(ok ? randomFromArray(OK_SOUNDS)[this.bormo.speaker.lang] : randomFromArray(ERROR_SOUNDS)[this.bormo.speaker.lang]);

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
			case 'stopped' : 	return '' + VARIANTS[CONFIG.cardsAmount] + ' ' + (CONFIG.coloredBack ? 'цветн' : 'обычн') +
												numstr(VARIANTS[CONFIG.cardsAmount], ['ая карта','ые карты','ых карт']) +	'.  Звук ' + (CONFIG.sound ? 'включен': 'отключен');
			case 'finished' :  return (score >= CONGRATULATION_SCORE? 'Примите поздравления!' : 'Игра окончена.') + ' Итоговый счет: ' + score;
			default: return '';
		}
	}

	closeConfig(returnValues) {
		if (returnValues) {
			CONFIG.sound = returnValues.sound;
			CONFIG.coloredBack = returnValues.coloredBack;
			CONFIG.layoutDelay = returnValues.layoutDelay;
			CONFIG.cardsAmount = returnValues.cardsAmount;
			this.bormo.mute(!CONFIG.sound);
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
									<ConfigForm speakerVoiceSupport = {this.bormo.getVoiceSupport()} sound = {CONFIG.sound} coloredBack = {CONFIG.coloredBack}
															cardsAmount = {CONFIG.cardsAmount} layoutDelay = {CONFIG.layoutDelay}
															onCloseConfig = {this.closeConfig}/>
								</div>
				</div>)
		}
	}
}

export default Game
