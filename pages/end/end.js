class End {
  constructor() {
    this.el = el('#end.screen');
  }

  update() {
    bgm.play();
    view.update('select');
    sound.cleanup();
  }
}
