import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import { AppDispatch } from './store';

type DispatchFn = () => AppDispatch;

export const useDisPatch: DispatchFn = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<INITIAL_STATE_TYPES> = useSelector;
