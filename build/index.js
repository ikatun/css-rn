'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.css = css;
exports.styleSheet = styleSheet;

var _lodash = require('lodash');

var _reactNative = require('react-native');

var _cssToReactNative = require('css-to-react-native');

var _cssToReactNative2 = _interopRequireDefault(_cssToReactNative);

var _cleanDeep = require('clean-deep');

var _cleanDeep2 = _interopRequireDefault(_cleanDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var trim = function trim(x) {
  return x.trim();
};
var merge = function merge(left, right) {
  return (left === undefined ? '' : left) + (right === undefined ? '' : right);
};

function computeStyle(strings, args) {
  var unzipped = (0, _lodash.unzipWith)([strings, args], merge).join('').split(';').map(trim).filter(_lodash.identity).map(function (line) {
    return line.split(':').map(trim);
  });

  return (0, _cleanDeep2.default)((0, _cssToReactNative2.default)(unzipped));
}

function css(strings) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return computeStyle(strings, args);
}

function styleSheet(strings) {
  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return _reactNative.StyleSheet.create({
    style: computeStyle(strings, args)
  }).style;
}