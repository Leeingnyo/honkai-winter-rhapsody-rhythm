class End {
  constructor() {
    this.el = el('#end.screen');
  }

  update() {
    view.update('select');
    sound.cleanup();
  }
}
