class SpeakerVoice  {
  constructor(muteValue) {
    this.supportSound = 'speechSynthesis' in window;
    this.supportRuEn = false;
    this.speaker = null;
    this.speakerMuted = muteValue;
    this.setSpeaker = this.setSpeaker.bind(this);
    this.mute = this.mute.bind(this);
  }

  setSpeaker() {
    if (this.supportSound && this.speaker === null) {
      const voiceList = window.speechSynthesis.getVoices();
      const firstRus = voiceList.find((item) => item.lang.slice(0, 2) === 'ru');
      const firstEng = voiceList.find((item) => item.lang.slice(0, 2) === 'en');
      const ssu = new SpeechSynthesisUtterance('');
      const voice = firstRus ?  firstRus : (firstEng ? firstEng : voiceList[0]);
      ssu.voice = voice;
      ssu.volume = 1;
      ssu.rate = 1.2;
      ssu.pitch = 1;
      const language = voice.lang.slice(0, 2);
      this.supportRuEn = (language === 'ru' || language ==='en');
      this.speaker = {'ssu': ssu, 'voice': ssu.voice, 'lang': language};
    }
  }

  mute(muteValue) {
    this.speakerMuted = muteValue;
  }

  speak(text) {
    if (this.supportSound &&  this.supportRuEn && this.speaker && !this.speakerMuted) {
      let {ssu, voice} = this.speaker;

      ssu.text = text;
      if (window.navigator.userAgent.indexOf("Firefox") >= 0) {
        ssu = new SpeechSynthesisUtterance(text);
        ssu.rate = 0.9;
        ssu.pitch = 1;
        ssu.voice = voice;
      };
      if (text) {
        window.speechSynthesis.speak(ssu);
      };
     }
    }

  getVoiceSupport() {return 'Ваш браузер ' + (this.supportSound ? '' : ' НЕ ') + ' поддерживает синтез речи'+
  (this.supportRuEn? '' : '. Синтез RU/EN недоступен');}

  }

  export default SpeakerVoice
