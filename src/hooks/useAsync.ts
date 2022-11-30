import { useCallback, useEffect, useState } from 'react';

export const useAsync = (
  func: () => Promise<any>,
  dependencies: string[] = []
) => {
  const { execute, ...state } = useAsyncInternal(func, dependencies, true);

  useEffect(() => {
    execute();
  }, [execute]);

  return state;
};

export const useAsyncFn = (
  func: () => Promise<any>,
  dependencies: string[] = []
) => {
  return useAsyncInternal(func, dependencies, false);
};

const useAsyncInternal = (
  func: () => Promise<any>,
  dependencies: string[],
  initialLoading = false
) => {
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState();
  const [value, setValue] = useState();

  const execute = useCallback((...params: unknown[]) => {
    setLoading(true);
    return func(...(params as []))
      .then((data) => {
        setValue(data);
        setError(undefined);
        return data;
      })
      .catch((err) => {
        setValue(undefined);
        setError(err);
        return Promise.reject(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, dependencies);

  return { loading, error, value, execute };
};
