var types = { CYAN: 0, YELLOW: 1, MAGENTA: 2 };
var scores = { PERFECT: 0, GOOD: 1, MISS: 2 };
var screens = { MAIN: 0, SELECT: 1, PREPARE: 2, LOADING: 3, GAME: 4 };
var { CYAN, YELLOW, MAGENTA } = types;
var { PERFECT, GOOD, MISS } = scores;
var { MAIN, SELECT, PREPARE, LOADING, GAME } = screens;
function former(a, b) {
  return a.beat - b.beat;
};
function near(a, b) {
  return Math.abs(a.delta) - Math.abs(b.delta);
}

