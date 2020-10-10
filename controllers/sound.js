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

var effect = {
  data: {},
  loadingPromises: [],
  init: function () {
    this.data.clickEffectCyan = document.createElement('audio');
    this.loadingPromises.push(new Promise(resolve => {
      this.data.clickEffectCyan.oncanplaythrough = () => {
        resolve();
      };
      setTimeout(resolve, 20000);
    }));
    this.data.clickEffectCyan.src = './resources/honkai-click-effect-cyan.mp3';

    this.data.clickEffectYellow = document.createElement('audio');
    this.loadingPromises.push(new Promise(resolve => {
      this.data.clickEffectYellow.oncanplaythrough = () => {
        resolve();
      };
      setTimeout(resolve, 20000);
    }));
    this.data.clickEffectYellow.src = './resources/honkai-click-effect-yellow.mp3';

    this.data.clickEffectMagenta = document.createElement('audio');
    this.loadingPromises.push(new Promise(resolve => {
      this.data.clickEffectMagenta.oncanplaythrough = () => {
        resolve();
      };
      setTimeout(resolve, 20000);
    }));
    this.data.clickEffectMagenta.src = './resources/honkai-click-effect-magenta.mp3';

    this.data.clickEffectGood = document.createElement('audio');
    this.loadingPromises.push(new Promise(resolve => {
      this.data.clickEffectGood.oncanplaythrough = () => {
        resolve();
      };
      setTimeout(resolve, 20000);
    }));
    this.data.clickEffectGood.src = './resources/honkai-click-effect-good.mp3';

    this.data.clickEffectMiss = document.createElement('audio');
    this.loadingPromises.push(new Promise(resolve => {
      this.data.clickEffectMiss.oncanplaythrough = () => {
        resolve();
      };
      setTimeout(resolve, 20000);
    }));
    this.data.clickEffectMiss.src = './resources/honkai-click-effect-miss.mp3';

    this.data.clickEffectVoid = document.createElement('audio');
    this.loadingPromises.push(new Promise(resolve => {
      this.data.clickEffectVoid.oncanplaythrough = () => {
        resolve();
      };
      setTimeout(resolve, 20000);
    }));
    this.data.clickEffectVoid.src = './resources/honkai-click-effect-void.mp3';

    // 시작 사운드
    this.data.start = document.createElement('audio');
    this.loadingPromises.push(new Promise(resolve => {
      this.data.start.oncanplaythrough = () => {
        resolve();
      };
      setTimeout(resolve, 20000);
    }));
    this.data.start.src = './resources/honkai-start.mp3';

    // 버튼 클릭
    this.data.clickButton = document.createElement('audio');
    this.loadingPromises.push(new Promise(resolve => {
      this.data.clickButton.oncanplaythrough = () => {
        resolve();
      };
      setTimeout(resolve, 20000);
    }));
    this.data.clickButton.src = './resources/honkai-click-button.mp3';

    // 맵 진입
    this.data.enterMap = document.createElement('audio');
    this.loadingPromises.push(new Promise(resolve => {
      this.data.enterMap.oncanplaythrough = () => {
        resolve();
      };
      setTimeout(resolve, 20000);
    }));
    this.data.enterMap.src = './resources/honkai-load_map.mp3';

    // 메뉴 열기
    this.data.pauseButton = document.createElement('audio');
    this.loadingPromises.push(new Promise(resolve => {
      this.data.pauseButton.oncanplaythrough = () => {
        resolve();
      };
      setTimeout(resolve, 20000);
    }));
    this.data.pauseButton.src = './resources/honkai-show-menu.mp3';

    // 클리어
    this.data.clear = document.createElement('audio');
    this.loadingPromises.push(new Promise(resolve => {
      this.data.clear.oncanplaythrough = () => {
        resolve();
      };
      setTimeout(resolve, 20000);
    }));
    this.data.clear.src = './resources/honkai-clear.mp3';
  },
  play: function (name) {
    this.data[name].currentTime = 0;
    this.data[name].play();
  }
};

effect.init();

var bgm = {
  bgmCount: 0,
  init: function () {
  },
  count: function () {
    return this.soundCount;
  },
  increaseCount: function () {
    this.soundCount++;
  },
  prepare: function () {
    var playerWrapper = document.querySelector('#main-bgm');
    if (!playerWrapper) {
        playerWrapper = document.createElement('div');
        playerWrapper.id = 'main-bgm';
        document.body.append(playerWrapper);
    }
    var player = document.createElement('div');
    player.id = 'main-bgm-' + this.count();
    playerWrapper.append(player);
  },
  cleanup: function () {
    var playerWrapper = document.querySelector('#main-bgm');
    var player = document.querySelector('#main-bgm-' + this.count());
    playerWrapper.removeChild(player);
    this.increaseCount();
  },
  pause: function () {
    mainBgm.pauseVideo();
  },
  play: function () {
    mainBgm.playVideo();
  },
  stop: function () {
    mainBgm.stopVideo();
  }
};

var mainBgm;
bgm.prepare();

var CancelablePromise = fn => {
  var cancel;
  var promise = new Promise((resolve, reject) => {
    cancel = reject;
    fn(resolve, reject);
  });
  return [promise, cancel];
}
var [wait, cancel] = CancelablePromise((resolve, reject) => setTimeout(resolve, 5000));
wait.then(_ => window.location.reload()).catch(_ => _);

function onYouTubeIframeAPIReady() {
  mainBgm = new YT.Player('main-bgm-' + bgm.count(), {
    height: '360',
    width: '640',
    videoId: 'trL9v-Tryeo',
    suggestedQuality: 'small',
    events: {
      onReady: playerReady
    }
  });

  function playerReady() {
    cancel();
    mainBgm.setVolume(20);
    mainBgm.setLoop(true);
    bgm.play();

    // requestAnimationFrame 너무 CPU 먹음
    setTimeout(function checkBgmPlay() {
      if (mainBgm.getCurrentTime() > 40.3) {
        mainBgm.seekTo(0);
        if (mainBgm.getPlayerState() === 1) {
          mainBgm.playVideo();
        }
      }
      setTimeout(checkBgmPlay, 1000);
    }, 1000);
  }
}

window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
