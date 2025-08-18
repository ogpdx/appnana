// src/flows/useQuestionFlow.js
import { useMemo, useRef } from 'react';
import { buildFlow } from './questionFlow';

export function useQuestionFlow({ instrumento, supervisionado }) {
  const flow = useMemo(
    () => buildFlow({ instrumento, supervisionado }),
    [instrumento, supervisionado]
  );
  const idxRef = useRef(0);

  function current() { return flow[idxRef.current] || null; }
  function next() {
    idxRef.current = Math.min(idxRef.current + 1, flow.length);
    return flow[idxRef.current] || null;
  }
  function hasNext() { return idxRef.current < flow.length - 1; }
  function reset() { idxRef.current = 0; }

  return { flow, current, next, hasNext, reset };
}
