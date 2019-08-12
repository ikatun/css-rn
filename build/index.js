"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.css = css;
exports.styleSheet = styleSheet;

var _lodash = require("lodash");

var _reactNative = require("react-native");

var _cssToReactNative = _interopRequireDefault(require("css-to-react-native"));

var _cleanDeep = _interopRequireDefault(require("clean-deep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const trim = x => x.trim();

const merge = (left, right) => (left === undefined ? '' : left) + (right === undefined ? '' : right);

const transformationsToSkip = ['borderRadius'];

function computeStyle(strings, args) {
  const unzipped = (0, _lodash.unzipWith)([strings, args], merge).join('').split(';').map(trim).filter(_lodash.identity).map(line => line.split(':').map(trim));
  return (0, _cleanDeep.default)((0, _cssToReactNative.default)(unzipped, transformationsToSkip));
}

function css(strings, ...args) {
  return computeStyle(strings, args);
}

function styleSheet(strings, ...args) {
  return _reactNative.StyleSheet.create({
    style: computeStyle(strings, args)
  }).style;
}