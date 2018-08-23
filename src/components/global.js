export const INITIAL_CONFIG = {
  cardsAmount: 0,
  layoutDelay: 5000,
  coloredBack: true,
  sound: (window.navigator.userAgent.indexOf("Chrome") >= 0) ? true : false,
  saveConfig: false
};

export const ENTER_KEYCODE = 13;
export const ESC_KEYCODE = 27;

export const VARIANTS = [36, 52];

export const SCORE_MULTIPLIER = 42;
export const CLICK_DELAY = 700;
export const CONGRATULATION_SCORE = 1000;

export const AMOUNT_PAIRS = 9;

export const ERROR_SOUNDS = [{'ru': 'Ай', 'en': 'Not correct'}, {'ru': 'Ой', 'en': 'False'}, {'ru': 'Ошибочка', 'en': 'Mistake'},
											{'ru': 'Ну нет', 'en': 'No'}, {'ru': 'Мимо', 'en': 'Not right'},
											{'ru': 'Это промах', 'en': 'Oh, no!'}, {'ru': 'Ох', 'en': 'Misstep'}, {'ru': 'Несовпадение', 'en': 'Error'}];

export const OK_SOUNDS = [{'ru': 'Это правильно', 'en': 'Correct'}, {'ru': 'Попадание', 'en': 'Hit'}, {'ru': 'Ура', 'en': 'Hurrah!'},
											{'ru': 'Да', 'en': 'Yes'}, {'ru': 'Точно', 'en': 'Exactly'},  {'ru': 'Хорошо', 'en': 'OK'},
											{'ru': 'Есть', 'en': 'Right'}, {'ru': 'Класс', 'en': 'Truly'}];

export const FINAL_MESSAGE = [{'ru': 'Это здорово!', 'en': 'Great!'},
											{'ru': 'Нормально, но нужно расти над собой...', 'en': 'It is normal, but you need to grow above yourself ...'}];

export const START_MESSAGE = {'ru': 'Игра начинается, когда карты лежат рубашками вверх', 'en': 'The game will start when the cards turn over'};


export const CONFIG = Object.assign({}, INITIAL_CONFIG);
