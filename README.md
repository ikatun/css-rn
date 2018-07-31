# css-rn
A css literal string tag for React-Native

## Installation
```
npm i css-rn
```

## Usage
```JSX
import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import { css } from 'rss-rn'

const redStyle = css`
  color: blue;
  font-weight: bold;
  font-size: 30;
`;

const bigFontSize = 50;

// variables can be used within css template
const bigBlueStyle = css`
  color: blue;
  font-weight: bold;
  font-size: ${bigFontSize};
`;

const redStyle = css`
  color: red;
`;

export class LotsOfStyles extends Component {
  render() {
    return (
      <View>
        <Text style={redStyle}>just red</Text>
        <Text style={bigBlue}>just bigblue</Text>
        <Text style={[bigBlue, redStyle]}>bigblue, then red</Text>
        <Text style={[redStyle, bigBlue]}>red, then bigblue</Text>
      </View>
    );
  }
}
```

## css-to-react-native
css-rn uses https://github.com/styled-components/css-to-react-native to convert css strings to React-Native style objects. Check documentation there for more technical info.

## StyleSheet
Literal tag `css` from `import { css } from 'rss-rn'` returns regular JS style objects.
If you want `StyleSheet.create()`-ed variant of the style, use `styleSheet` string literal tag instead:
```JS
...
import { styleSheet } from 'rss-rn'
...
...

const redStyle = styleSheet`
  color: blue;
  font-weight: bold;
  font-size: 30;
`;

const bigBlueStyle = styleSheet`
  color: blue;
  font-weight: bold;
  font-size: 30;
`;

// `redStyle` and `bigBlueStyle` are now StyleSheet.create()ed integers instead of style objects
...
```
