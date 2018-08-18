import {VARIANTS, CONFIG} from './global.js'

export const random = (min, max)  => {
	var rand = min - 0.5 + Math.random() * (max - min + 1);
	rand = Math.round(rand);
	return rand;
};

export const randomFromArray = (arr) => {
	return arr[random(1, arr.length) - 1];
};

export const numstr = (numSource, textForms)  => {
	numSource = Math.abs(numSource) % 100;
	let numTmp = numSource % 10;
	if (numSource > 10 && numSource < 20) { return textForms[2]; }
	if (numTmp > 1 && numTmp < 5) { return textForms[1]; }
	if (numTmp === 1) { return textForms[0]; }
	return textForms[2];
};


export const generateArr = (amountPairs, amountTotal, stage) => {
	let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9' ,'10', 'J', 'Q', 'K'];
	const SUITS =  ['9824': 'spades', '9827': 'clubs', '9830': 'diams', '9829': 'hearts'];

	const amountInSuit = parseInt(amountTotal / 4, 10);
	if (amountTotal === Math.min(...VARIANTS))  {
		values.splice(1, 4);
	}

	const _reSortArr = (arr) => {
		const array = arr.slice();
		for (var i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}

	const arr=[];
	for (let i = 0; i < amountTotal; i++) {
		arr.push(i);
	}

	const newArr =_reSortArr(arr).slice( 0, amountPairs).map(function(item, ind) {return {backcolor: (CONFIG.coloredBack ? ind+1: 0), code: item}});
	const items = _reSortArr([...newArr,...newArr]);
	return items.map(function({code, backcolor}, ind) {const data = {id: 'id-'+ind, code: code, stage: stage, suit: SUITS[Math.floor(code / amountInSuit)],
		value: values[code % amountInSuit], color: (code < amountTotal / 2) ? 'black' : 'red', backcolor: backcolor};  return data});
};
