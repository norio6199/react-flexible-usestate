# User Guide for react-usestates

This is react library for managing multiple states in an immutable manner like React.useState.

## What is react-usestates
```ts
// if you want to manage state of these values
const initialValue = {
  hoge1: '',
  hoge2: '',
  hoge3: '',
  hoge4: '',
  hoge5: '',
  hoge6: '',
  hoge7: '',
  hoge8: '',
  hoge9: '',
  hoge10: '',
};
```

```ts
// this is code using React.useState.
import { useState } from 'react';

const [hoge1, setHoge1] = useState(initialValue.hoge1);
const [hoge2, setHoge2] = useState(initialValue.hoge2);
const [hoge3, setHoge3] = useState(initialValue.hoge3);
const [hoge4, setHoge4] = useState(initialValue.hoge4);
const [hoge5, setHoge5] = useState(initialValue.hoge5);
const [hoge6, setHoge6] = useState(initialValue.hoge6);
const [hoge7, setHoge7] = useState(initialValue.hoge7);
const [hoge8, setHoge8] = useState(initialValue.hoge8);
const [hoge9, setHoge9] = useState(initialValue.hoge9);
const [hoge10, setHoge10] = useState(initialValue.hoge10);
```

```ts
// and this is code using react-usestates.
import useStates from '@norio6199/react-usestates';

const [states, setStates] = useStates(initialValue);
```

## How to install
```bash
npm install @norio6199/react-usestates # or yarn add @norio6199/react-usestates
```

## How to get state
```ts
// just call target property.
states.hoge1;
```

## How to set state
```ts
// pass key and value to setStates.
setStates('hoge1', 'new value');

// or you can pass function also.
setStates('hoge1', (prev) => {
  return `${prev} is current value`
});
```

## How to reset state
```ts
// react-usestates provides resetStates.
const [states, setStates, resetStates] = useStates(initialValue);

// just pass a key to reset the value to its initial value.
resetStates('hoge1');

// or, if nothing is passed, all values will be initialized.
resetStates();
```

## Of course type safe
```ts
typeof states.someText // string
typeof states.someNumber // number

setStates('someText', 'new value'); // ok
setStates('someText', 123); // type error
```

## Of course immutable
Inside react-usestates we use [immer](https://github.com/immerjs/immer) to manage the state in an immutable.