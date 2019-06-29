var sound = {
  soundCount: 0,
  init: function () {
  },
  count: function () {
    return this.soundCount;
  },
  increaseCount: function () {
    this.soundCount++;
  },
  prepare: function () {
    var playerWrapper = document.querySelector('#player');
    if (!playerWrapper) {
        playerWrapper = document.createElement('div');
        playerWrapper.id = 'player';
        document.body.append(playerWrapper);
    }
    var player = document.createElement('div');
    player.id = 'player-' + this.count();
    playerWrapper.append(player);
  },
  cleanup: function () {
    var playerWrapper = document.querySelector('#player');
    var player = document.querySelector('#player-' + this.count());
    playerWrapper.removeChild(player);
    this.increaseCount();
  },
  pause: function () {
    player.pauseVideo();
  },
  play: function () {
    player.playVideo();
  }
};
