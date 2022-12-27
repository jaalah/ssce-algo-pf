import { Store } from 'redux';
import reducer from './reducer';
import { InitialStateTypes, ActionTypes } from '../types';
import { configureStore } from '@reduxjs/toolkit';

export const store: Store<InitialStateTypes, ActionTypes<any>> = configureStore({
  reducer
});
