class Main {
  constructor() {
    this.el = el('#main.screen',
      el('h2', '붕괴 3rd 윈터 랩소디 리듬 게임'),
      el('p', '모바일에서는 시작하기 전에 전체화면을 눌러 전체화면으로 만드는 것을 권장합니다. 효과음 소리가 작아서 배경음도 작게 설정했습니다. 디바이스 볼륨에 주의해주세요.'),
      el('p', '키설명', el('br'), 'S(기계) 스페이스바(생물) L(이능)'),
      this.toFullscreenButton = el('button.winter-button.fullscreen-button', '전체화면'),
      this.toSelect = el('button.winter-button.start-button', '시작하기'),
      this.muteButton = el('button.winter-button.mute-button', '배경음 끄기'),
      el('p', '모바일에서는 렉이 심할 수 있습니다. PC 권장. 언젠가 최적화 하겠습니다.'),
      el('p', '몇 가지는 노래 영상을 찾지 못 하였고, 몇 가지는 노트를 다 만들지 못 했습니다. ',
          '캐릭터에 맞는 노래 영상이 유튜브에 올라와있다면 알려주세요. ',
          '그리고 공략캐릭터가 다른 경우가 있을텐데 그것도 알려주시면 감사하겠습니다.'),
      el('small', ' v1.1.0', ' (2019-07-01)', { style: { position: 'absolute', right: '6%', bottom: '5%' } }),
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
