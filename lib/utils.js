var debug = (function () {
  var debugView = document.querySelector('#debug');
  if (debugView) 
  return function (str) {
    console.log(str);
    if (debugView) debugView.innerHTML = str + '<br>' + debugView.innerHTML;
  };
  return console.log.bind(console);
})();

var now = (function () {
  var origin = performance ? performance.now() : (+new Date());
  var getTime = performance
      ? performance.now.bind(performance)
      : function () { return (+new Date()); };
  return function () { return getTime() - origin; };
})();

function requestFullscreen(selector) {
  if (document.fullscreenElement) return;
  var e = document.querySelector(selector);
  e.requestFullscreen();
}
