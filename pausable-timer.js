"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var PausableTimer = function PausableTimer() {
  // internal
  this._isActive = true; // for timeouts and intervals

  this._timeouts = {};
  this._intervals = {};
  this._map = {}; // for timer

  this._origin = this.getTime();
  this._deactivatedTime = 0; // 시간

  this._deactivatedTimeSet = null; // 시각
};

PausableTimer.prototype.isActive = function () {
  return this._isActive;
};

PausableTimer.prototype.getTime = performance ? performance.now.bind(performance) : function () {
  return +new Date();
};

PausableTimer.prototype.now = function () {
  var now = this.getTime() - this._origin - this._deactivatedTime;

  if (this._deactivatedTimeSet) return now - (this.getTime() - this._deactivatedTimeSet);
  return now;
};

PausableTimer.prototype.lifeTime = function () {
  return this.getTime() - this._origin;
};

PausableTimer.prototype.reset = function () {
  this._deactivatedTime = this.lifeTime();
};

PausableTimer.prototype.resetHard = function () {
  this._origin = this.getTime();
  this._deactivatedTime = 0;
  this._deactivatedTimeSet = null;
};

PausableTimer.prototype.traceId = function (id) {
  if (this._map[id]) return this.traceId(this._map[id]);
  return id;
};

PausableTimer.prototype.setTimeout = function (callback) {
  var _this = this;

  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var id = setTimeout.apply(void 0, [function () {
    callback.bind(null).apply(void 0, arguments);
    delete _this._timeouts[id];
  }, delay].concat(args));
  this._timeouts[id] = {
    callback: callback,
    delay: delay,
    args: args,
    timestamp: this.getTime()
  };

  if (!this._isActive) {
    clearTimeout(id);
  }

  return id;
};

PausableTimer.prototype.clearTimeout = function (id) {
  id = this.traceId(id);
  clearTimeout(id);
  delete this._timeouts[id];
};

PausableTimer.prototype.setInterval = function (callback) {
  var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  var id = setInterval.apply(void 0, [function () {
    callback.bind(null).apply(void 0, arguments);
  }, interval].concat(args));
  this._intervals[id] = {
    callback: callback,
    interval: interval,
    args: args,
    timestamp: this.getTime()
  };

  if (!this._isActive) {
    clearInterval(id);
  }

  return id;
};

PausableTimer.prototype.clearInterval = function (id) {
  id = this.traceId(id);
  clearInterval(id);
  delete this._intervals[id];
};

PausableTimer.prototype.deactivate = function () {
  var _this2 = this;

  Object.keys(this._timeouts).forEach(function (id) {
    var timeout = _this2._timeouts[id];
    timeout.delay -= _this2.getTime() - timeout.timestamp;
    clearTimeout(id);
  });
  Object.keys(this._intervals).forEach(function (id) {
    var interval = _this2._intervals[id];
    interval.leftTime = interval.interval - (_this2.getTime() - interval.timestamp) % interval.interval;
    clearInterval(id);
  });
  this._isActive = false;
  this._deactivatedTimeSet = this.getTime();
};

PausableTimer.prototype.activate = function () {
  var _this3 = this;

  this._isActive = true;
  this._deactivatedTime += this.getTime() - this._deactivatedTimeSet;
  this._deactivatedTimeSet = 0;
  Object.keys(this._timeouts).forEach(function (id) {
    var timeout = _this3._timeouts[id];
    var callback = timeout.callback,
        delay = timeout.delay,
        args = timeout.args;

    var newId = _this3.setTimeout.apply(_this3, [callback, delay].concat(_toConsumableArray(args)));

    _this3._map[id] = newId;
    delete _this3._timeouts[id];
  });
  Object.keys(this._intervals).forEach(function (id) {
    var target = _this3._intervals[id];
    var callback = target.callback,
        interval = target.interval,
        args = target.args,
        leftTime = target.leftTime;
    var newId = setTimeout(function () {
      callback.apply(void 0, _toConsumableArray(args));

      var realNewId = _this3.setInterval.apply(_this3, [callback, interval].concat(_toConsumableArray(args)));

      _this3._map[newId] = realNewId;
    }, leftTime);
    _this3._map[id] = newId;
    delete _this3._intervals[id];
  });
};
