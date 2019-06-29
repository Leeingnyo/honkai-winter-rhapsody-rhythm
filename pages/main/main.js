class Main {
  constructor() {
    this.el = el('#main.screen',
      el('h2', '붕괴 3rd 윈터 랩소디 리듬 게임'),
      el('p', '모바일에서는 시작하기 전에 전체화면을 눌러 전체화면으로 만드는 것을 권장합니다.'),
      this.toFullscreenButton = el('button', '전체화면'),
      this.toSelect = el('button', '시작하기')
    );

    this.toFullscreenButton.onclick = () => {
      requestFullscreen('#wrapper');
    };
    this.toSelect.onclick = () => {
      view.update('select');
    }
  }
}
