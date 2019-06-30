class Main {
  constructor() {
    this.el = el('#main.screen',
      el('h2', '붕괴 3rd 윈터 랩소디 리듬 게임'),
      el('p', '모바일에서는 시작하기 전에 전체화면을 눌러 전체화면으로 만드는 것을 권장합니다. 효과음 소리가 작아서 배경음도 작게 설정했습니다. 디바이스 볼륨에 주의해주세요.'),
      el('p', '키설명', el('br'), 'S(기계) 스페이스바(생물) L(이능)'),
      this.toFullscreenButton = el('button.winter-button.fullscreen-button', '전체화면'),
      this.toSelect = el('button.winter-button.start-button', '시작하기'),
      this.muteButton = el('button.winter-button.mute-button', '배경음 끄기')
    );

    this.toFullscreenButton.onclick = () => {
      effect.play('clickButton');
      if (mainBgm.getPlayerState() !== 1) {
        bgm.play();
      }
      requestFullscreen('#wrapper');
    };
    this.toSelect.onclick = () => {
      effect.play('clickButton');
      view.update('select');
    }

    this.muteButton.onclick = () => {
      effect.play('clickButton');
      if (mainBgm.isMuted()) {
        mainBgm.unMute();
        this.muteButton.textContent = '배경음 끄기';
      } else {
        mainBgm.mute();
        this.muteButton.textContent = '배경음 켜기';
      }
    };
  }
}
