import { createContext } from 'react';

type RowContextType = {
  gutter?: [number, number];
};

export const RowContext = createContext<RowContextType>({});
