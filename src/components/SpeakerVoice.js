class SpeakerVoice  {
	constructor(muteValue) {
		this.supportSound = 'speechSynthesis' in window;
		this.speaker = null;
		this.speakerMuted = muteValue;
		this.setSpeaker = this.setSpeaker.bind(this);
		this.mute = this.mute.bind(this);
	}

  setSpeaker() {
		if (this.supportSound && this.speaker === null) {
			const voiceList = window.speechSynthesis.getVoices();
			const firstRus = voiceList.find((item) => item.lang === 'ru-RU');
			const ssu = new SpeechSynthesisUtterance('');
			const voice = firstRus ?  firstRus : voiceList[0];
			ssu.voice = voice;
			ssu.volume = 1;
    	ssu.rate = 1.2;
    	ssu.pitch = 0;
			const language = voice.lang; //firstRus ? 'ru-RU' : 'en-US';
			this.speaker = { 'ssu': ssu, 'voice': ssu.voice, 'lang': language};
		}
	}

	mute(muteValue)	{
		this.speakerMuted = muteValue;
	}

	speak(text) {
		if (this.supportSound && this.speaker && !this.speakerMuted) {
			let {ssu, voice} = this.speaker;

			ssu.text = text;
			if (window.navigator.userAgent.indexOf("Firefox") >= 0) {
				ssu = new SpeechSynthesisUtterance(text);
				ssu.voice = voice;
		 	};
		 	window.speechSynthesis.speak(ssu);
		 }
		}

	getVoiceSupport() {return 'Ваш браузер ' + (this.supportSound ? '' : ' НЕ ') + ' поддерживает синтез речи';}

	}

	export default SpeakerVoice
