import { ComponentState, PropsWithoutRef, useEffect, useRef } from 'react';

export default function usePrevious<T>(value: PropsWithoutRef<T> | ComponentState) {
  const ref = useRef<PropsWithoutRef<T> | ComponentState | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
