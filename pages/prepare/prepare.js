class Prepare {
  constructor() {
    this.el = el('#prepare.screen',
      this.backButton = el('button.honkai-button.honkai-button--skew.honkai-button--top-left-button', el('div', '< 뒤로')),
      el('main',
        this.selectedCharacterName = el('h3'),
        this.selectedCharacterMessage = el('p')
      ),
      this.startButton = el('button.start-button.honkai-button', '탐색 임무 진행')
    );

    this.backButton.onclick = () => {
      effect.play('clickButton');
      view.update('select');
    };
    this.startButton.onclick = () => {
      bgm.stop();
      effect.play('start');
      if (!this.song.videoId) {
        alert('노래 영상을 찾지 못 했어...');
        return;
      }
      if (!(this.song.notes && this.song.notes.length)) {
        alert('아직 노래가 구현되지 않았어!');
        return;
      }

      view.update('loading', this.song);
    };
  }

  update(song) {
    this.song = song;

    this.selectedCharacterName.textContent = song.characterName;
    this.selectedCharacterMessage.textContent = song.message;
  }
}
