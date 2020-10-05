class End {
  constructor() {
    this.el = el('#end.screen',
      this.maxComboWrapper = el('.max-combo-wrapper',
        el('.max-combo-message', el('div', '최대 콤보 수')),
        el('.max-combo-text', this.maxComboText = text())
      ),
      this.click = el('.click-pad')
    );

    var next = () => {
      window.removeEventListener('keydown', next);
      effect.play('clickButton');
      bgm.play();
      view.update('select');
    };

    this.click.onclick = next;
    window.addEventListener('keydown', next);
  }

  update() {
    sound.cleanup();
    effect.play('clear');

    this.maxComboText.textContent = game.combo.maxCombo;
  }
}
