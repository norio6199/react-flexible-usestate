import { useState } from 'react';
import produce from 'immer';

export type SetStateAction<T = {}> = <K extends keyof T>(
  key: K,
  value: T[K] | ((prev: T[K]) => T[K]),
) => void;
export type SetStatesAction<T = {}> = (recipe: (draft: T) => void) => void;
export type ResetStateAction<T = {}> = <K extends keyof T>(key?: K) => void;

type UseStatesReturn<T> = {
  states: T;
  setState: SetStateAction<T>;
  setStates: SetStatesAction<T>;
  resetState: ResetStateAction<T>;
};

const useStates = <T>(initialValues: T): UseStatesReturn<T> => {
  const [states, _setStates] = useState(initialValues);

  const setStates = (recipe: (draft: T) => void): void => {
    _setStates(prev => produce(prev, recipe));
  };

  const setState = <K extends keyof T>(key: K, value: T[K] | ((prev: T[K]) => T[K])): void => {
    setStates(draft => {
      draft[key] =
        typeof value === 'function' ? (value as (prev: T[K]) => T[K])(draft[key]) : value;
    });
  };

  const resetState = <K extends keyof T>(key?: K): void => {
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

  return { states, setState, setStates, resetState };
};

export default useStates;
