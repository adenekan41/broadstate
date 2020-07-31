<br />
<p align="center">
  <img src="https://i.ibb.co/w465vbK/Frame-1broad.png"/>
</p>
<h2 align="center"></h2>

<p align="center">Easy state manager for state values from one component to the other with useState and React Hooks in < 1KB! </p>

<br />
<br />
<h1>
  <img src="https://i.ibb.co/gVqCCky/Broadstate.png" width="160"/>
</h1>

[![npm](https://badge.fury.io/js/broad-state.svg)](https://www.npmjs.com/package/broad-state)

[![NPM](https://nodei.co/npm/broad-state.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/broad-state/)

<!-- useState, but simplified for complex states in React apps. -->

### [See Demo On Codesandbox](https://codesandbox.io/s/broad-state-pb971?file=/src/App.js)

## ⚡️Overview

Have you ever tried to move the value of a state from a child to the parent
without using large state managment tools like Redux, Mobx e.t.c ?. Broadstate
is an easy state manager for state values from one component to the other with
useState and React Hooks in < 1KB!

## 🔧 Installation

You can easily install this package with yarn or npm:

```
$ yarn add broad-state
```

or

```
$ npm install --save broad-state
```

## ✨ Features

- 😎 Easy to learn
- 📦 ~388b (gzipped)
- 🙅‍♂️ Zero dependencies
- ✂️ Super-flexible API
- ✅ Fully tested and reliable
- ⚒ CommonJS, ESM & browser standalone support

## 📖 Usage

Some usage terms you need to be familar with – `createObservable`,
`useBroadState`

- _createObservable_, takes in the central state you need to be observed,
- _useBroadState_, hooks that handle reading state and dispatching actions

Here is a simple example

```js
export const counter = createObservable(0);
// Other Observable value goes here
```

```jsx
import React from 'react';
import { createObservable, useBroadState } from 'broad-state';
import { counter } from './observable';

export default function App() {
  const [state, setState] = useBroadState(counter);
  return (
    <div className="App">
      <h2>Broad State Demo</h2>
      <h1>{state}</h1>
      <button onClick={() => setState(state + 1)}>+</button>
      <button onClick={() => setState(state - 1)} disabled={state === 0}>
        -
      </button>
    </div>
  );
}
```

## 🤔Thought Process

broadstate is built on top of React Hooks. I first tried this concept in a
project i was working on and seeing the re-usability and convenience, I decided
to convert it to a standalone open-source library for others to benefit from the
awesomeness of React Hooks.

## 🤝 License

> MIT © [codewonders.dev](https://codewonders.dev) &nbsp;&middot;&nbsp; GitHub
> [@adenekan41 / codewonders](https://github.com/adenekan41)
