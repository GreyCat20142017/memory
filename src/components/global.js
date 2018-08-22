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

export const ERROR_SOUNDS = [{'ru-RU': 'Ай', 'en-US': 'Not correct'}, {'ru-RU': 'Ой', 'en-US': 'False'}, {'ru-RU': 'Ошибочка', 'en-US': 'Mistake'},
											{'ru-RU': 'Ну нет', 'en-US': 'No'}, {'ru-RU': 'Мимо', 'en-US': 'Not right'},
											{'ru-RU': 'Это промах', 'en-US': 'Oh, no!'}, {'ru-RU': 'Ох', 'en-US': 'Misstep'}];

export const OK_SOUNDS = [{'ru-RU': 'Это правильно', 'en-US': 'Correct'}, {'ru-RU': 'Попадание', 'en-US': 'Hit'}, {'ru-RU': 'Ура', 'en-US': 'Hurrah!'},
											{'ru-RU': 'Да', 'en-US': 'Yes'}, {'ru-RU': 'Точно', 'en-US': 'Exactly'},
											{'ru-RU': 'Есть', 'en-US': 'Right'}, {'ru-RU': 'Класс', 'en-US': 'Truly'}];

export const FINAL_MESSAGE = [{'ru-RU': 'Это здорово!', 'en-US': 'Great!'},
											{'ru-RU': 'Нормально, но нужно расти над собой...', 'en-US': 'It is normal, but you need to grow above yourself ...'}];

export const START_MESSAGE = {'ru-RU': 'Игра начинается, когда карты лежат рубашками вверх', 'en-US': 'The game will start when the cards turn over'};


export const CONFIG = Object.assign({}, INITIAL_CONFIG);
