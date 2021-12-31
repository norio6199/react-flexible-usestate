import { useState } from 'react';
import produce from 'immer';

type UseStatesReturn<T> = {
  states: T;
  setStates: (recipe: (draft: T) => void) => void;
}

const useStates = <T>(initialStates: T): UseStatesReturn<T> => {
  const [states, _setStates] = useState(initialStates);

  const setStates = (recipe: (draft: T) => void): void => {
    _setStates((prev) => produce(prev, recipe));
  };

  return {
    states,
    setStates
  }
};

export default useStates;