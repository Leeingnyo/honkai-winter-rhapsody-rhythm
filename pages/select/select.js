class SelectCharacterOption {
  constructor() {
    this.el = el('li.select-character-list-item',
      this.character = el('.select-character',
        this.characterImage = el('div.select-character-image'),
        this.characterName = el('div.select-character-name')
      )
    );

    this.character.onclick = () => {
      effect.play('clickButton');
      view.update('prepare', this.song);
    };
  }

  update(song) {
    this.characterName.textContent = song.characterName;
    this.characterImage.style.backgroundImage = 'url(./resources/head/' + song.characterId + '.png)';

    this.song = song;
  }
}

class Select {
  constructor() {
    this.el = el('#select.screen',
      this.backButton = el('button.back-button.winter-button', '뒤로'),
      el('.select-green'),
      el('.select-book',
        el('.select-book-left',
          el('h2', '단계 선택'),
          el('p', '공략할 캐릭터를 선택해주세요'),
        ),
        el('.select-book-right',
          this.characterList = list('ul.select-character-list', SelectCharacterOption, 'name')
        )
      )
    );

    this.backButton.onclick = () => {
      effect.play('clickButton');
      view.update('main');
    }
  }

  update() {
    this.characterList.update(songs);
  }
}
