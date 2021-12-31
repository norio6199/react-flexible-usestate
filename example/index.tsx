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
  const [ states, setStates, clearStates ] = useStates(initialValues);

  const handleInclimentText = (): void => {
    setStates('text', `${states.text} + fuga`)
  }
  const handleClearText = (): void => {
    clearStates('text');
  }

  const handleInclimentNumber = (): void => {
    setStates('number', (prev) => {
      return prev * 2
    })
  }
  const handleClearNumber = (): void => {
    clearStates('number');
  }

  const handleClearAll = (): void => {
    clearStates();
  }

  return (
    <div>
      <p>text: {states.text}</p>
      <button onClick={handleInclimentText}>update text</button>
      <button onClick={handleClearText}>clear text</button>
      <p>number: {states.number}</p>
      <button onClick={handleInclimentNumber}>update number</button>
      <button onClick={handleClearNumber}>clear number</button>
      <br />
      <button onClick={handleClearAll}>clear all</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
