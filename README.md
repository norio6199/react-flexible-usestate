# User Guide for react-flexible-usestate

React library for managing multiple states in an immutable and flexible.

## What is react-flexible-usestate

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
// and this is code using react-flexible-usestate.
import useStates from 'react-flexible-usestate';

const { states, setState } = useStates(initialValue);
```

## How to install

```bash
npm install react-flexible-usestate # or yarn add react-flexible-usestate
```

## How to get state

```ts
// just call target property.
states.hoge1;
```

## How to set state

```ts
// pass key and value to setState.
setState('hoge1', 'new value');

// or you can pass function also.
setState('hoge1', prev => {
  return `${prev} is current value`;
});

// or do flexible using setStates.
setStates(draft => {
  draft.hoge1 = 'new value';
  draft.someObj['newParam'] = 'you can set state flexible';
  draft.someArray[1] = 'like this';
});
```

## How to reset state

```ts
// react-flexible-usestate provides resetState.
const { resetState } = useStates(initialValue);

// just pass a key to reset the value to its initial value.
resetState('hoge1');

// or, if nothing is passed, all values will be initialized.
resetState();
```

## Of course type safe

```ts
typeof states.someText; // string
typeof states.someNumber; // number

setState('someText', 'new value'); // ok
setState('someText', 123); // type error
```

## Of course immutable

Inside react-flexible-usestate we use [immer](https://github.com/immerjs/immer) to manage the state in an immutable.

```ts
// Can do it like this.
setStates(draft => {
  draft.someObj['newParam'] = 'new value';
});

// No need to think about immutable like this.
setStates(draft => {
  draft.someObj = {
    ...draft.someObj,
    newParam: 'new value',
  };
});
```
