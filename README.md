# Guide for react-hooks-useFullStates

React library for managing multiple states in an immutable and useful.
Here is [sample code](https://github.com/norio6199/react-hooks-useFullStates/blob/main/example/index.tsx) for react-hooks-useFullStates.

## Why need

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

## It is time to use react-hooks-useFullStates

```diff
- import { useState } from 'react';
+ import { useFullStates } from 'react-hooks-useFullStates';

- const [value01, setValue01] = useState(initialValues.value01);
- const [value02, setValue02] = useState(initialValues.value02);
- const [value03, setValue03] = useState(initialValues.value03);
- const [value04, setValue04] = useState(initialValues.value04);
- const [value05, setValue05] = useState(initialValues.value05);
- const [value06, setValue06] = useState(initialValues.value06);
- const [value07, setValue07] = useState(initialValues.value07);
- const [value08, setValue08] = useState(initialValues.value08);
- const [value09, setValue09] = useState(initialValues.value09);
- const [value10, setValue10] = useState(initialValues.value10);
+ const [states, setStates] = useFullStates(initialValues);

const updateOneState = () => {
-   const newStates = { ...states };
-   newStates.valueXX = 'new value';
-   setStates(newStates);

+   // just pass key and value.
+   setStates('valueXX', 'new value');
};

const updateFewStates = () => {
-   const newStates = { ...states };
-   newStates.valueXX = 'new value';
-   newStates.valueYY = 'new value';
-   setStates(newStates);

+   // you don't have to mind about immutable!!
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

+   // pass key to initialize value.
+   setStates('valueXX');
+   setStates('valueYY');

+   // also you can initialize all values.
+   setStates()
};
```

## Usage for setStates

| pattern                      | description                                  |
| ---------------------------- | -------------------------------------------- |
| `setStates()`                | Reset all states to initial values.          |
| `setStates(key)`             | Reset some state to initial value using key. |
| `setStates(key, value)`      | Update some state using key and value.       |
| `setStates((prev) => {...})` | Update some states using prev values.        |

## Of course type safe

```ts
setStates('someText', 'new value'); // ok
setStates('someText', 123); // type error
setStates('Non-existent key'); // type error
```

## Of course immutable

You don't have to think about immutable.
Only update value you want to update.

```ts
setStates(prev => {
  prev.valueXX = 'new value';
});
```
