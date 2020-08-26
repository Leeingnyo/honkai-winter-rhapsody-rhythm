class View {
  constructor() {
    this.router = router('#view', {
      main: Main,
      select: Select,
      prepare: Prepare,
      loading: Loading,
      game: Game,
      end: End
    });
    this.el = this.router.el;
  }

  update(screen, params) {
    this.router.update(screen, params);
  }
}
