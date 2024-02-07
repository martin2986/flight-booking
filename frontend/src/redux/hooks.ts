import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, RootState } from './store';

type DispatchFn = () => AppDispatch;

export const useDisPatch: DispatchFn = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
