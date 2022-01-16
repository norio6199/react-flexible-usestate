import { useState } from 'react';
import produce from 'immer';

type SetStatesArgs<T, K extends keyof T> = [K, T[K]] | [(draft: T) => void];

export type SetStatesAction<T> = <K extends keyof T>(...args: SetStatesArgs<T, K>) => void;

export type ResetStatesAction<T> = <K extends keyof T>(key?: K) => void;

type UseStatesReturn<T> = [T, SetStatesAction<T>, ResetStatesAction<T>];

export const useStates = <T>(initialValues: T): UseStatesReturn<T> => {
  const [states, _setStates] = useState(initialValues);

  const stateProducer = (recipe: (draft: T) => void): void => {
    _setStates(prev => produce(prev, recipe));
  };

  const setStates: SetStatesAction<T> = <K extends keyof T>(...args: SetStatesArgs<T, K>): void => {
    stateProducer(draft => {
      if (typeof args[0] === 'function') {
        args[0](draft);
      } else {
        draft[args[0]] = args[1] as T[K];
      }
    });
  };

  const resetStates: ResetStatesAction<T> = <K extends keyof T>(key?: K): void => {
    let targetKeys: (keyof T)[];
    if (!key) {
      targetKeys = Object.keys(initialValues) as (keyof T)[];
    } else {
      targetKeys = [key];
    }
    targetKeys.forEach(key => {
      stateProducer(draft => {
        draft[key] = initialValues[key];
      });
    });
  };

  return [states, setStates, resetStates];
};
