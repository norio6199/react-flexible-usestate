# Guide for react-flexible-usestate

React library for managing multiple states in an immutable and flexible.

## What is react-flexible-usestate for

```ts
// We have to manage lots of states of value state in our app.
const initialValues = {
  ... // lots of values
};

// but using React.useState spends lots of line.
import { useState } from 'react';

const [hoge1, setHoge1] = useState(initialValues.hoge1);
const [hoge2, setHoge2] = useState(initialValues.hoge2);
const [hoge3, setHoge3] = useState(initialValues.hoge3);
const [hoge4, setHoge4] = useState(initialValues.hoge4);
const [hoge5, setHoge5] = useState(initialValues.hoge5);
const [hoge6, setHoge6] = useState(initialValues.hoge6);
const [hoge7, setHoge7] = useState(initialValues.hoge7);
const [hoge8, setHoge8] = useState(initialValues.hoge8);
const [hoge9, setHoge9] = useState(initialValues.hoge9);
const [hoge10, setHoge10] = useState(initialValues.hoge10);

// And try to manage states with object.
const [states, setStates] = useState(initialValues);

// But soon, it will be tired to keep it immutable.
const updateSomeStates = () => {
  const newStates = { ...states };
  newStates.someParam = 'new value';
  setStates(newStates);
};
const resetSomeStates = () => {
  const newStates = { ...states };
  newStates.someParam = initialValues.someParam;
  setStates(newStates);
};
```

**Do you have the same problem?**  
**Please try react-flexible-usestate!!**

```ts
// This is sample code using react-flexible-usestate
import useStates from 'react-flexible-usestate';

const { states, setState, resetState } = useStates(initialValues);

const updateSomeStates = () => {
  setState('someParam', 'new value');
};
const resetSomeStates = () => {
  resetState('someParam');
};
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

// or do flexible using setState(s).
setStates(draft => {
  draft.hoge1 = 'new value';
  draft.someObj['newParam'] = 'you can set state flexible';
  draft.someArray[1] = 'like this';
});
```

## How to reset state

```ts
// react-flexible-usestate provides resetState.
const { resetState } = useStates(initialValues);

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
