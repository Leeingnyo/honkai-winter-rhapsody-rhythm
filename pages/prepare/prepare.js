class Prepare {
  constructor() {
    this.el = el('#prepare.screen',
      this.backButton = el('button.honkai-button.honkai-button--skew.honkai-button--top-left-button', el('div', '< 뒤로')),
      el('main',
        this.selectedCharacterName = el('h3'),
        this.selectedCharacterMessage = el('p')
      ),
      this.startButton = el('button.start-button.honkai-button', '탐색 임무 진행'),
      this.popup = el('.popup', { style: { display: 'none' } },
        this.popup = el('.popup-title', '알림'),
        el('.popup-contents',
          this.popupMessage = el('.popup-message'),
          this.popupButton = el('button.popup-button.honkai-button', '확인')
        )
      )
    );

    this.backButton.onclick = () => {
      effect.play('clickButton');
      view.update('select');
    };
    this.startButton.onclick = () => {
      effect.play('start');
      if (!this.song.videoId) {
        this.popupMessage.textContent = '노래 영상을 찾지 못했어...';
        this.popup.style.display = 'block';
        return;
      }
      if (!(this.song.notes && this.song.notes.length)) {
        this.popupMessage.textContent = '아직 노래가 구현되지 않았어!';
        this.popup.style.display = 'block';
        return;
      }

      bgm.stop();
      view.update('loading', this.song);
    };
    this.popupButton.onclick = () => {
      effect.play('clickButton');
      this.popup.style.display = 'none';
    };
  }

  update(song) {
    this.song = song;

    this.selectedCharacterName.textContent = song.characterName;
    this.selectedCharacterMessage.textContent = song.message;
  }
}
