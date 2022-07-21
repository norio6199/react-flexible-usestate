import { useState } from 'react';

type SetStatesParams<T, K extends keyof T> = [] | [K] | [K, T[K]] | [(prev: T) => void];
type FullStates<T> = [T, <K extends keyof T>(...params: SetStatesParams<T, K>) => void];

export const useFullStates = <T extends Record<string, unknown>>(
  initialValues: T,
): FullStates<T> => {
  const [states, _setStates] = useState(initialValues);

  const setInitialValues = () => {
    _setStates(initialValues);
  };

  const setStatesWithKeyAndValue = <K extends keyof T>(key: K, value: T[K]) => {
    _setStates({
      ...states,
      [key]: value,
    });
  };

  const setStatesWithPrevValue = (updatePrevStates: (prev: T) => void) => {
    const prevStates = { ...states };
    updatePrevStates(prevStates);
    _setStates(prevStates);
  };

  const setStates = <K extends keyof T>(...params: SetStatesParams<T, K>) => {
    if (params.length === 0) {
      // setStates()
      setInitialValues();
    } else if (params.length === 1) {
      if (typeof params[0] === 'string') {
        // setStates(key)
        const key = params[0] as K;
        setStatesWithKeyAndValue(key, initialValues[key]);
      } else {
        // setStates((prev) => { prev.hoge = 123 })
        const updateStates = params[0] as (prev: T) => void;
        setStatesWithPrevValue(updateStates);
      }
    } else {
      // setStates(key, value)
      const key = params[0] as K;
      const value = params[1] as T[K];
      setStatesWithKeyAndValue(key, value);
    }
  };

  return [states, setStates];
};
