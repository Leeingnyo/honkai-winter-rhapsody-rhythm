var ui = {};

var game = {
  over: false,
  timer: new PausableTimer(),
  speed: 3730,
  // song: 
  stage: {
    maxHp: 2000,
    hpStage: 2,
    maxShield: 500,
    attacks: []
  },
  init: function () {
    this.over = false;
    this.combo.init();

    this.stage.hp = this.stage.maxHp;
    this.stage.shield = this.stage.maxShield;

    var song = this.song;
    var bps = song.bpm / 60;
    var preDelay = song.preDelay;
    song.notes.map(function (note) {
      note.noteTime = note.beat * 1000 / bps;
    });
    song.notes.forEach(function (note, index) {
      game.timer.setTimeout(function () {
        if (game.song.notes[index].invalid) return;
        game.song.notes[index].invalid = true;
        game.song.notes[index].score = MISS;
        game.combo.resetCount();
        ui.game.createEffect(MISS, game.song.notes[index].type); // FIXME
      }, note.noteTime + game.song.preDelay + judger.rule.miss);
    });

    this.timer.resetHard();
  },
  pause: function () {
    game.paused = true;
    game.timer.deactivate();
    var gameWrapper = document.querySelector('#game');
    gameWrapper.classList.add('paused');
    if (game.song.preDelay < game.timer.now()) {
      sound.pause();
    }
  },
  resume: function () {
    game.paused = false;
    game.timer.activate();
    var gameWrapper = document.querySelector('#game');
    gameWrapper.classList.remove('paused');
    if (game.song.preDelay < game.timer.now()) {
      sound.play();
    }
  }
};

game.combo = {
  comboCount: null,
  getCount: function () {
    return this.comboCount;
  },
  increaseCount: function () {
    this.comboCount = (this.comboCount || 0) + 1;
    this.maxCombo = Math.max(this.maxCombo || 0, this.comboCount);
  },
  init: function () {
    this.maxCombo = null;
    this.resetCount();
  },
  resetCount: function () {
    this.comboCount = null;
  },
  updateCombo: function () {
    this.increaseCount();
  }
};

game.input = function (type) {
  if (game.paused || game.waitForVideo) return;

  var input = { type };
  var result = judger.judge(game.timer.now(), game.song, input);
  if (!result) {
    effect.play('clickEffectVoid');
    return;
  }
  var score = result.score;
  var note = result.note;

  if (score === MISS) {
    effect.play('clickEffectMiss');
  } else if (score === GOOD) {
    effect.play('clickEffectGood');
  } else if (note.type === CYAN) { // score is PERFECT
    effect.play('clickEffectCyan');
  } else if (note.type === YELLOW) {
    effect.play('clickEffectYellow');
  } else { // magenta
    effect.play('clickEffectMagenta');
  }

  if (score !== MISS) {
    game.combo.updateCombo();
    ui.game.blinkCombo();
  } else {
    game.combo.resetCount();
  }

  ui.game.createEffect(score, note.type);
  ui.game.updateCombo(game.combo.getCount());
}
