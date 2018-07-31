import { unzipWith, identity } from 'lodash';
import { StyleSheet } from 'react-native';
import transform from 'css-to-react-native';
import cleanDeep from 'clean-deep';

const trim = x => x.trim();
const merge = (left, right) => (left === undefined ? '' : left) + (right === undefined ? '' : right);

function computeStyle(strings, args) {
  const unzipped = unzipWith([strings, args], merge)
    .join('')
    .split(';')
    .map(trim)
    .filter(identity)
    .map(line => line.split(':').map(trim));

  return cleanDeep(transform(unzipped));
}

export function css(strings, ...args) {
  return computeStyle(strings, args);
}

export function styleSheet(strings, ...args) {
  return StyleSheet.create({
    style: computeStyle(strings, args),
  }).style;
}
