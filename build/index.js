"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const react_native_1 = require("react-native");
const css_to_react_native_1 = __importDefault(require("css-to-react-native"));
const clean_deep_1 = __importDefault(require("clean-deep"));
const fast_memoize_1 = __importDefault(require("fast-memoize"));
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
function styleObject(strings, ...args) {
    return computeStyle(strings, args);
}
exports.styleObject = styleObject;
function styleSheet(strings, ...args) {
    return react_native_1.StyleSheet.create({
        style: computeStyle(strings, args),
    }).style;
}
exports.styleSheet = styleSheet;
let defaultStylingFunction = styleSheet;
function useStyleObject(shouldMemoize) {
    if (shouldMemoize) {
        defaultStylingFunction = fast_memoize_1.default((...args) => styleObject(...args));
    }
    else {
        defaultStylingFunction = styleObject;
    }
}
exports.useStyleObject = useStyleObject;
function useStyleSheet(shouldMemoize) {
    if (shouldMemoize) {
        defaultStylingFunction = fast_memoize_1.default((...args) => styleSheet(...args));
    }
    else {
        defaultStylingFunction = styleSheet;
    }
}
exports.useStyleSheet = useStyleSheet;
useStyleSheet(true);
function css(strings, ...args) {
    return defaultStylingFunction(strings, args);
}
exports.css = css;
//# sourceMappingURL=index.js.map