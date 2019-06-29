class Prepare {
  constructor() {
    this.el = el('#prepare.screen',
      this.backButton = el('button', '뒤로'),
      this.selectedCharacterName = el('p'),
      this.startButton = el('button', '탐색 임무 진행')
    );

    this.backButton.onclick = () => {
      view.update('select');
    };
    this.startButton.onclick = () => {
      view.update('loading', this.song);
    };
  }

  update(song) {
    this.song = song;

    this.selectedCharacterName.textContent = song.characterName;
  }
}
