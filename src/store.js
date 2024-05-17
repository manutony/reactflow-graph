import { configureStore } from '@reduxjs/toolkit';
import nodesReducer from './nodesSlice';
import edgesReducer from './edgesSlice';

const store = configureStore({
  reducer: {
    nodes: nodesReducer,
    edges: edgesReducer,
  },
});

export default store;
