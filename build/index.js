'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

var transformationsToSkip = ['borderRadius'];

var isEmpty = function isEmpty(value) {
  return value === '' || value === null || value === undefined;
};

function computeStyle(strings, args) {
  var unzipped = (0, _lodash.unzipWith)([strings, args], merge).join('').split(';').map(trim).filter(_lodash.identity).map(function (line) {
    return line.split(':').map(trim);
  }).filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        left = _ref2[0],
        right = _ref2[1];

    return !isEmpty(left) && !isEmpty(right);
  });

  return (0, _cleanDeep2.default)((0, _cssToReactNative2.default)(unzipped, transformationsToSkip));
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