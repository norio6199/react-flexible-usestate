import { useState } from 'react';
import produce from 'immer';

const useStates = <T>(initialValues: T) => {
  const [states, _setStates] = useState(initialValues);

  const stateUpdater = (recipe: (draft: T) => void): void => {
    _setStates((prev) => produce(prev, recipe));
  };

  const setStates = <K extends keyof T>(key: K, value: T[K] | ((prev: T[K]) => T[K])) => {
      stateUpdater((draft) => {
        draft[key] = typeof value === 'function' ? (value as ((prev: T[K]) => T[K]))(draft[key]) : value;
      })
  }

  const clearStates = <K extends keyof T>(key?: K) => {
    let targetKeys: (keyof T)[];
    if (!key) {
      targetKeys = (Object.keys(initialValues) as (keyof T)[]);
    } else {
      targetKeys = [key];
    }
    targetKeys.forEach((key) => {
      stateUpdater((draft) => {
        draft[key] = initialValues[key];
      })
    })
  }

  return [
    states,
    setStates,
    clearStates
  ] as [
    typeof states,
    typeof setStates,
    typeof clearStates,
  ]
};

export default useStates;