class Note {
  constructor() {
    this.el = el('.note-wrapper',
      this.ball = el('.ball.ball-spawn'),
      this.character = el('.character')
    )
  }

  update(note) {
    switch (note.type) {
      case CYAN: {
        this.ball.classList.add('cyan');
      } break;
      case YELLOW: {
        this.ball.classList.add('yellow');
      } break;
      case MAGENTA: {
        this.ball.classList.add('magenta');
      } break;
    }

    switch (note.type) {
      case CYAN: {
        this.character.classList.add('aichan');
      } break;
      case YELLOW: {
        this.character.classList.add('sakura');
      } break;
      case MAGENTA: {
        this.character.classList.add('bronya');
      } break;
    }
    this.character.classList.add('walk');

    this.el.dataset.noteTime = note.noteTime;
    this.el.dataset.index = note.index;
  }
}

class Game {
  constructor() {
    var gameTop = el('.game-top',
      this.pauseButton = el('button.pause-button.honkai-button.honkai-button--skew.honkai-button--top-left-button.honkai-button--small-top-left-button',
        this.pauseButtonText = el('div', '||')
      ),
      this.hpGuage = new (function () {
        this.el = el('.hp-guage-wrappers');
        this.el.innerHTML = `
  <div class="hp-guage-wrapper">
    <div class="hp-guage"></div>
  </div>
  <div class="hp-guage-wrapper">
    <div class="hp-guage"></div>
  </div>
  <div class="hp-guage-wrapper">
    <div class="hp-guage"></div>
  </div>`.trim();
      })(),
      this.shieldGuage = el('.shield-guage-wrapper',
        el('.shield-guage')
      )
    );

    var gameStage = el('.game-stage',
      el('.monster',
        el('.damage-wrapper',
          // el('.damage', '309')
        )
      ),
      el('.combo.combo--hide',
        el('span.combo-count'),
        el('span.combo-label', 'COMBO')
      ),
      el('.judge-board-wrapper'),
      this.effectWrapper = el('.indicator-wrapper.ball',
        el('.indicator')
      ),
      el('.note-line'),
      el('.floor-line'),
      this.noteWrappers = list('.note-wrappers', Note, 'index'),
      this.attackWrappers = el('.attack-wrappers')
    );

    var gameBottom = el('.game-bottom',
      el('.energy-guage-wrapper',
        el('.energy-guage')
      ),
      el('#controls',
        this.cyanButton = el('button#cyan-button.control-button'),
        this.yellowButton = el('button#yellow-button.control-button'),
        this.magentaButton = el('button#magenta-button.control-button')
      )
    );

    this.el = el('#game.game.screen',
      gameTop,
      gameStage,
      gameBottom,
      el('#horizontal-line')
    );

    this.pauseButton.onclick = () => {
      if (game.paused) {
          this.pauseButtonText.textContent = '||';
          game.resume();
      } else {
          this.pauseButtonText.textContent = '>';
          game.pause(); // 이름 왜 이럼
      }
    };

    // TODO
    __bindButtons([
      this.cyanButton,
      this.yellowButton,
      this.magentaButton
    ]);

    this.gameDraw = this.gameDraw.bind(this);
  }

  update(gameConfig) {
    game.song = gameConfig.song;
    game.init();
    this.createNotes();
    player.playVideo();
    playtime = game.timer.getTime();

    window.requestAnimationFrame(this.gameDraw);
  }

  updateCombo(count) {
    game.timer.clearTimeout(this.__update_combo_timeout);
    var comboWrapper = document.querySelector('.combo');

    comboWrapper.classList.remove('fade-out');
    if (!count) {
      comboWrapper.classList.add('combo--hide');
      return;
    }
    comboWrapper.classList.remove('combo--hide');
    var countDom = comboWrapper.querySelector('.combo-count');

    this.__update_combo_timeout = game.timer.setTimeout(function () {
      comboWrapper.classList.add('fade-out');
    }, 3000);

    countDom.innerText = count;
  }

  blinkCombo() {
    var comboWrapper = document.querySelector('.combo');

    comboWrapper.classList.add('combo--hilight');
    setTimeout(function () {
      comboWrapper.classList.remove('combo--hilight');
    });
  }

  createNotes() {
    this.noteWrappers.update(game.song.notes);
  }

  createEffect(score, type) {
    // TODO refactoring
    var scoreName = score === PERFECT ? 'perfect' : score === GOOD ? 'good' : 'miss'; // TODO ui.utils.getScoreName()
    var effectScoreName = document.createElement('div');
    effectScoreName.innerText = scoreName.toUpperCase() + '!';
    effectScoreName.classList.add('effect-score-name');
    effectScoreName.classList.add(scoreName);
    // TODO change to animation
    game.timer.setTimeout(function () {
      effectScoreName.classList.add('appeared');
    });
    game.timer.setTimeout(function () {
      effectScoreName.classList.add('fade-out');
    }, 1700);
    game.timer.setTimeout(() => {
      this.effectWrapper.removeChild(effectScoreName);
    }, 2000);
    this.effectWrapper.append(effectScoreName);

    (() => { // effect circle function 
    if (score !== PERFECT) return;
    var effectCircle = document.createElement('div');
    effectCircle.classList.add('effect-circle');
    game.timer.setTimeout(function () {
      switch (type) {
        case CYAN: {
          effectCircle.classList.add('cyan');
        } break;
        case YELLOW: {
          effectCircle.classList.add('yellow');
        } break;
        case MAGENTA: {
          effectCircle.classList.add('magenta');
        } break;
      }
    });
    game.timer.setTimeout(function() {
      effectCircle.classList.add('fade-out');
    }, 200);
    game.timer.setTimeout(() => {
      this.effectWrapper.removeChild(effectCircle);
    }, 1400);
    this.effectWrapper.append(effectCircle);
    })();
  }

  gameDraw() {
    var notes = game.song.notes;
    var speed = game.speed;

    var attackWrappers = document.querySelector('.attack-wrappers');

    var ticks = [];
    notes.forEach((note, index) => {
      var noteWrapper = this.noteWrappers.views[index]
          && this.noteWrappers.views[index].el;
      if (!noteWrapper) return;
      var leftPixel = ((game.song.preDelay + note.noteTime - game.timer.now()) / speed * 100) + '%';
      if (note.invalid && noteWrapper.style.visibility !== 'hidden') {
        // this.noteWrappers.removeChild(noteWrapper);
        noteWrapper.style.visibility = 'hidden';

        var score = note.score;
        if (score === MISS) return;

        var character = noteWrapper.querySelector('.character');
        character.classList.remove('walk');
        character.classList.add('jump');

        var attackWrapper = document.createElement('div');
        attackWrapper.dataset.leftPixel = leftPixel;
        attackWrapper.dataset.index = index;
        attackWrapper.style.left = 'calc(50% - 2.05rem + ' + leftPixel + ')';
        attackWrapper.classList.add('attack-wrapper');
        attackWrapper.append(character);
        ticks.push({ attackWrapper: attackWrapper, score: score });
        
        attackWrappers.append(attackWrapper);

        game.stage.attacks.push({
          leftPixel: leftPixel,
          score: score,
          startTime: game.timer.now(),
          index: index,
        });

        return;
      }
      noteWrapper.style.left = 'calc(50% - 2.05rem + ' + leftPixel + ')'
      noteWrapper.style.opacity = note.invalid ? 0.5 : null;
    });

    if (ticks.length) {
      setTimeout(function () {
        ticks.forEach(function (tick) {
          var attackWrapper = tick.attackWrapper;
          var score = tick.score;
          attackWrapper.classList.add(score === PERFECT ? 'perfect' : 'good');
          setTimeout(function () {
            attackWrappers.removeChild(attackWrapper);
          }, score === PERFECT ? 1000 : 1500);
        });
      });
    }

    /*
    game.stage.attacks = game.stage.attacks.filter(function (attacks) {
      var attackWrapper = document.querySelector('.attack-wrapper[data-index="' + attack.index + '"]');
      return attackWrapper;
    }).map(function (attack) {
      var attackWrapper = document.querySelector('.attack-wrapper[data-index="' + attack.index + '"]');
      var leftPixel = attack.leftPixel;
      var left = game.speed * 1.2  attack.startTime
      attackWrappers.style.left = 'calc(50% - 2.05rem + ' + leftPixel + ')';

      return attack;
    });
    */

    if (!game.over) window.requestAnimationFrame(this.gameDraw);
  }
}

function __bindButtons(buttons) {
  buttons.map(function (button, index) {
    if (button.onpointerdown !== undefined) {
      button.onpointerdown = function (event) {
        switch (index) {
          case 0: { game.input(CYAN) } break;
          case 1: { game.input(YELLOW) } break;
          case 2: { game.input(MAGENTA) } break;
        }
      }
    } else if (button.ontouchstart !== undefined) {
      button.ontouchstart = function (event) {
        switch (index) {
          case 0: { game.input(CYAN) } break;
          case 1: { game.input(YELLOW) } break;
          case 2: { game.input(MAGENTA) } break;
        }
      }
    } else {
      button.onmousedown = function (event) {
        switch (index) {
          case 0: { game.input(CYAN) } break;
          case 1: { game.input(YELLOW) } break;
          case 2: { game.input(MAGENTA) } break;
        }
      }
    }
  });
}

var keyDownState = {
  [0x20]: false,
  83: false,
  76: false
};
window.onkeydown = function (event) {
  if ([0x20, 83, 76].includes(event.keyCode) && !keyDownState[event.keyCode]) {
    keyDownState[event.keyCode] = true;
    switch (event.keyCode) {
      case 0x20: {
        game.input(YELLOW);
      } break;
      case 83: {
        game.input(CYAN);
      } break;
      case 76: {
        game.input(MAGENTA);
      } break;
    }
  }
}
window.onkeyup = function (event) {
  if ([0x20, 83, 76].includes(event.keyCode)) {
    keyDownState[event.keyCode] = false;
  }
}
