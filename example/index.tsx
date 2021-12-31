import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import useStates from '../.';

const initialValues = {
  text: 'hogehoge',
  number: 123
}

const App: React.VFC = () => {
  const {states, setStates} = useStates(initialValues);

  const handleInclimentText = (): void => {
    setStates((draft) => draft.text = `${draft.text}+fuga`)
  }

  const handleInclimentNumber = (): void => {
    setStates((draft) => draft.number = draft.number * 2)
  }

  return (
    <div>
      <p>text: {states.text}</p>
      <button onClick={handleInclimentText}>update text</button>
      <p>number: {states.number}</p>
      <button onClick={handleInclimentNumber}>update number</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
