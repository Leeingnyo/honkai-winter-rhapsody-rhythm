class Main {
  constructor() {
    this.el = el('#main.screen',
      el('h2', '붕괴 3rd 윈터 랩소디 리듬 게임'),
      el('p', '모바일에서는 시작하기 전에 ', el('span', { style: { fontWeight: 'bold' } }, '전체화면을 눌러'),
          ' 전체화면으로 만드는 것을 권장합니다. 웬만하면 화면을 가로로 해주세요. 효과음 소리가 작아서 배경음도 작게 설정했습니다. ',
          '디바이스 볼륨에 주의해주세요. 문제가 생기면 그냥 새로고침 해주세요'),
      this.toFullscreenButton = el('button.winter-button.fullscreen-button', '전체화면'),
      this.toSelect = el('button.winter-button.start-button', '시작하기'),
      this.muteButton = el('button.winter-button.mute-button', '배경음 끄기'),
      el('p.message', ' 플레이할 노래는 유튜브 영상으로 가져오는데, ',
          '버퍼링일 때 게임이 멈추게 되어 플레이가 어려울 수 있으니 ',
          '가급적 통신 환경이 원할한 곳에서 해주시길 바립니다.'),
      el('p.message', '몇 가지는 노래 영상을 찾지 못 했고, 몇 가지는 노트를 다 만들지 못 했습니다. ',
          '캐릭터에 맞는 노래 영상이 유튜브에 올라와있다면 알려주세요.'),
      el('small', ' v1.1.8', ' (2020-10-06)', { style: { position: 'absolute', right: '6%', bottom: '5%' } }),
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
