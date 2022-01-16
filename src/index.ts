import { useState } from 'react';
import produce from 'immer';

type SetStatesArgs<T, K extends keyof T> = [] | [K] | [K, T[K]] | [(draft: T) => void];

export type SetStatesAction<T> = <K extends keyof T>(...args: SetStatesArgs<T, K>) => void;

type UseStatesReturn<T> = [T, SetStatesAction<T>];

export const useStates = <T>(initialValues: T): UseStatesReturn<T> => {
  const [states, _setStates] = useState(initialValues);

  const stateProducer = (recipe: (draft: T) => void): void => {
    _setStates(prev => produce(prev, recipe));
  };

  const setStates: SetStatesAction<T> = <K extends keyof T>(...args: SetStatesArgs<T, K>): void => {
    stateProducer(draft => {
      if (args.length === 0) {
        // reset all state to initial value
        const targetKeys = Object.keys(initialValues) as (keyof T)[];
        targetKeys.forEach(key => {
          stateProducer(draft => {
            draft[key] = initialValues[key];
          });
        });
      } else if (args.length === 1 && typeof args[0] === 'function') {
        // set state with draft
        args[0](draft);
      } else if (args.length === 1 && typeof args[0] !== 'function') {
        // reset state to initial value
        draft[args[0]] = initialValues[args[0]];
      } else if (args.length === 2) {
        // set state with key and value
        draft[args[0]] = args[1] as T[K];
      } else {
        throw new Error(
          'Please read README for react-flexible-usestate.( https://github.com/norio6199/react-flexible-usestate/blob/main/README.md )',
        );
      }
    });
  };

  return [states, setStates];
};
