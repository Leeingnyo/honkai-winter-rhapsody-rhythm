class Loading {
  constructor() {
    this.backgroundImageUrl = loadingBackgrounds[Math.floor(Math.random() * loadingBackgrounds.length)];
    this.el = el('#loading.screen', el('.loading-message', 'LOADING...'));
    this.el.style.cssText = '--background-image-url: url(../.' + this.backgroundImageUrl + ')';
  }

  update(song) {
    this.song = song; // UI 에 비즈니스 로직이 잠식당한 모습이다

    var gameConfig = {
      song: copySong(this.song)
    };

    this.loading(gameConfig);
  }

  loading(gameConfig) {
    var clickSounds = el('audio');

    // request to sound manager for loading
    // request to image manager for loading
    const playerReady = () => {
      if (this.song.videoStart) {
        player.seekTo(this.song.videoStart);
      }
      Promise.all([... effect.loadingPromises, new Promise(resolve => {
        var background = document.createElement('img');
        background.onload = resolve;
        background.src = './resources/background-snow.png';
      }), new Promise(resolve => setTimeout(resolve, 1500))]).then(() => {
        view.update('game', gameConfig);
        player.setVolume(20);
        ui.game = view.router.view; // FIXME
      });
    }

    //////
    sound.prepare();
    var firstLoading = true;
    var buffering = false;
    
    var song = this.song;
    player = new YT.Player('player-' + sound.count(), {
      height: '360',
      width: '640',
      videoId: song.videoId,
      suggestedQuality: 'small',
      events: {
        onReady: playerReady,
        onStateChange: function (event) {
          debug(JSON.stringify(event.data))
          switch (event.data) {
            case -1: {
            } break;
            case 3: { // buffering
              if (firstLoading) {
              } else {
                buffering = true;
                game.waitForVideo = true;
                game.timer.deactivate();
              }
            } break;
            case 0: {
              game.over = true;
              view.update('end');
            } break;
            case 1: {
              if (firstLoading) {
                player.pauseVideo();
                game.timer.setTimeout(function () {
                  player.playVideo();
                }, game.song.preDelay - (game.timer.getTime() - playtime));
              } else {
                if (buffering) {
                  game.waitForVideo = false;
                  game.timer.activate();
                }
              }
            } break;
            case 2: {
              if (firstLoading) {
                firstLoading = false;
              }
            } break;
          }
        },
      },
    });
    //////
  }
}

function copySong(song) {
  return {
    preDelay: song.preDelay,
    bpm: song.bpm,
    notes: song.notes.map(function (note, index) {
      return {
        beat: note.beat,
        type: note.type,
        index
      };
    })
  };
}
