# Guide for react-flexible-usestate

React library for managing multiple states in an immutable and flexible.

## Why need react-flexible-usestate

```ts
// we have to manage lots of states in our app.
const initialValues = { ... };

// but using React.useState spends lots of line.
import { useState } from 'react';

const [value01, setValue01] = useState(initialValues.value01);
const [value02, setValue02] = useState(initialValues.value02);
const [value03, setValue03] = useState(initialValues.value03);
const [value04, setValue04] = useState(initialValues.value04);
const [value05, setValue05] = useState(initialValues.value05);
const [value06, setValue06] = useState(initialValues.value06);
const [value07, setValue07] = useState(initialValues.value07);
const [value08, setValue08] = useState(initialValues.value08);
const [value09, setValue09] = useState(initialValues.value09);
const [value10, setValue10] = useState(initialValues.value10);

// and try to manage states with object.
const [states, setStates] = useState(initialValues);

// it's still easy to access each states.
console.log(states.value01);
console.log(states.value02);

// but if you want to update just one state, you have to set whole object to keep it immutable.
const updateOneState = () => {
  const newStates = { ...states };
  newStates.valueXX = 'new value';
  setStates(newStates);
};

// soon, you'll get tired to keep it immutable...
const updateFewStates = () => {
  const newStates = { ...states };
  newStates.valueXX = 'new value';
  newStates.valueYY = 'new value';
  setStates(newStates);
};
const resetStates = () => {
  const newStates = { ...states };
  newStates.valueXX = initialValues.valueXX;
  newStates.valueYY = initialValues.valueYY;
  setStates(newStates);
};
```

## It is time to use react-flexible-usestate

```diff
- import { useState } from 'react';
+ import { useStates } from 'react-flexible-usestate';

- const [states, setStates] = useState(initialValues);
+ const { states, setState, setStates, resetState } = useStates(initialValues);

// no diff for access each states.
console.log(states.value01);
console.log(states.value02);

const updateOneState = () => {
-   const newStates = { ...states };
-   newStates.valueXX = 'new value';
-   setStates(newStates);

+   // pass key and value to setState.
+   setState('valueXX', 'new value');

+   // or if you want to use prev value, you can write like this.
+   setState('valueXX', (prev) => {
+     return  `update ${prev} to new value`;
+   });
};

const updateFewStates = () => {
-   const newStates = { ...states };
-   newStates.valueXX = 'new value';
-   newStates.valueYY = 'new value';
-   setStates(newStates);

+   // you can use setState.
+   setState('valueXX', 'new value');
+   setState('valueYY', 'new value');

+   // or using setState(s) for more flexible!!
+   setStates((draft) => {
+     draft.valueXX = 'new value';
+     draft.valueYY = `update ${draft.valueYY} to new value`;
+   });
};

const resetStates = () => {
-   const newStates = { ...states };
-   newStates.valueXX = initialValues.valueXX;
-   newStates.valueYY = initialValues.valueYY;
-   setStates(newStates);

+   // pass key to resetState to initialize.
+   resetState('valueXX');
+   resetState('valueYY');

+   // or, if nothing is passed, all values will be initialized.
+   resetState()
};
```

## Of course type safe

```ts
typeof states.someText; // string
typeof states.someNumber; // number

setState('someText', 'new value'); // ok
setState('someText', 123); // type error

resetState('Non-existent property'); // type error
```

## Of course immutable

Inside react-flexible-usestate we use [immer](https://github.com/immerjs/immer) to manage the state in an immutable.

## Tips

If you have enabled the "no-param-reassign" rule in eslint, you should be warned with the following code.

```ts
setStates(draft => {
  draft.valueXX = 'new value'; // here
});
```

If you encounter this problem, this issue and comments will be helpful for you. -> https://github.com/immerjs/immer/issues/189#issuecomment-506396244

or just disable rule is more easly.

```ts
/* eslint-disable no-param-reassign */
setStates(draft => {
  draft.valueXX = 'new value';
});
```

## Release Note

💣 is a marker for breaking changes.

### v2.0.0

- 💣 change useStates to named export
- update README

### v1.0.5

- update README

### v1.0.4

- export type of setState, setState(s), resetState
- add release note to README
- update README

### v1.0.1 - v1.0.3

- update README

### v1.0.0

- released
