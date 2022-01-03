import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import useStates from '../.';
// import useStates from '@norio6199/react-usestates';

const initialValues = {
  text: 'hogehoge',
  number: 123,
  obj: {
    paramA: 'A',
    paramB: 'B',
  },
  array: ['apple', 'orange', 'grape'],
};

const App: React.VFC = () => {
  const { states, setState, setStates, resetState } = useStates(initialValues);

  const handleInclimentText = (): void => {
    setState('text', `${states.text} + fuga`);
  };
  const handleResetText = (): void => {
    resetState('text');
  };

  const handleInclimentNumber = (): void => {
    setState('number', prev => {
      return prev * 2;
    });
  };
  const handleResetNumber = (): void => {
    resetState('number');
  };

  const handleUpdateObject = (): void => {
    setStates(draft => {
      draft.obj['paramC'] = 'C';
      draft.obj['paramD'] = 'D';
    });
  };
  const handleResetObject = (): void => {
    resetState('obj');
  };

  const handleUpdateArray = (): void => {
    setStates(draft => {
      draft.array[1] = 'banana';
    });
  };
  const handleResetArray = (): void => {
    resetState('array');
  };

  const handleResetAll = (): void => {
    resetState();
  };

  return (
    <div>
      <p>text: {states.text}</p>
      <button onClick={handleInclimentText}>update text</button>
      <button onClick={handleResetText}>reset text</button>
      <br />
      <p>number: {states.number}</p>
      <button onClick={handleInclimentNumber}>update number</button>
      <button onClick={handleResetNumber}>reset number</button>
      <br />
      <p>object: {JSON.stringify(states.obj)}</p>
      <button onClick={handleUpdateObject}>update object</button>
      <button onClick={handleResetObject}>reset object</button>
      <br />
      <p>array: {JSON.stringify(states.array)}</p>
      <button onClick={handleUpdateArray}>update array</button>
      <button onClick={handleResetArray}>reset array</button>
      <br />
      <br />
      <button onClick={handleResetAll}>reset all</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
