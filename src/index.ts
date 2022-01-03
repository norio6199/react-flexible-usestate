import { useState } from 'react';
import produce from 'immer';

const useStates = <T>(initialValues: T) => {
  const [states, _setStates] = useState(initialValues);

  const setStates = (recipe: (draft: T) => void): void => {
    _setStates(prev => produce(prev, recipe));
  };

  const setState = <K extends keyof T>(key: K, value: T[K] | ((prev: T[K]) => T[K])) => {
    setStates(draft => {
      draft[key] =
        typeof value === 'function' ? (value as (prev: T[K]) => T[K])(draft[key]) : value;
    });
  };

  const resetState = <K extends keyof T>(key?: K) => {
    let targetKeys: (keyof T)[];
    if (!key) {
      targetKeys = Object.keys(initialValues) as (keyof T)[];
    } else {
      targetKeys = [key];
    }
    targetKeys.forEach(key => {
      setStates(draft => {
        draft[key] = initialValues[key];
      });
    });
  };

  return [states, setState, resetState] as [typeof states, typeof setState, typeof resetState];
};

export default useStates;
