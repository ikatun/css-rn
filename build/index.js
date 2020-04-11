"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const react_native_1 = require("react-native");
const css_to_react_native_1 = __importDefault(require("css-to-react-native"));
const clean_deep_1 = __importDefault(require("clean-deep"));
const trim = x => x.trim();
const merge = (left, right) => (left === undefined ? '' : left) + (right === undefined ? '' : right);
const transformationsToSkip = ['borderRadius'];
const isEmpty = value => value === '' || value === null || value === undefined;
function computeStyle(strings, args) {
    const unzipped = lodash_1.unzipWith([strings, args], merge)
        .join('')
        .split(';')
        .map(trim)
        .filter(lodash_1.identity)
        .map(line => line.split(':').map(trim))
        .filter(([left, right]) => !isEmpty(left) && !isEmpty(right));
    return clean_deep_1.default(css_to_react_native_1.default(unzipped, transformationsToSkip));
}
function css(strings, ...args) {
    return computeStyle(strings, args);
}
exports.css = css;
function styleSheet(strings, ...args) {
    return react_native_1.StyleSheet.create({
        style: computeStyle(strings, args),
    }).style;
}
exports.styleSheet = styleSheet;
//# sourceMappingURL=index.js.map