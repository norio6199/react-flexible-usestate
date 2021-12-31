import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import useStates from '../.';
// import useStates from '@norio6199/react-usestates';

const initialValues = {
  text: 'hogehoge',
  number: 123
}

const App: React.VFC = () => {
  const [ states, setStates, resetStates ] = useStates(initialValues);

  const handleInclimentText = (): void => {
    setStates('text', `${states.text} + fuga`)
  }
  const handleResetText = (): void => {
    resetStates('text');
  }

  const handleInclimentNumber = (): void => {
    setStates('number', (prev) => {
      return prev * 2
    })
  }
  const handleResetNumber = (): void => {
    resetStates('number');
  }

  const handleResetAll = (): void => {
    resetStates();
  }

  return (
    <div>
      <p>text: {states.text}</p>
      <button onClick={handleInclimentText}>update text</button>
      <button onClick={handleResetText}>reset text</button>
      <p>number: {states.number}</p>
      <button onClick={handleInclimentNumber}>update number</button>
      <button onClick={handleResetNumber}>reset number</button>
      <br />
      <button onClick={handleResetAll}>reset all</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
