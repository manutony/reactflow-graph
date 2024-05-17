import { createSlice } from '@reduxjs/toolkit';

const nodesSlice = createSlice({
  name: 'nodes',
  initialState: [],
  reducers: {
    addNode: (state, action) => {
      state.push(action.payload);
    },
    updateNode: (state, action) => {
      const { id, data } = action.payload;
      const node = state.find((node) => node.id === id);
      if (node) {
        node.data = { ...node.data, ...data };
      }
    },
    removeNode: (state, action) => {
      return state.filter((node) => node.id !== action.payload);
    },
  },
});

export const { addNode, updateNode, removeNode } = nodesSlice.actions;
export default nodesSlice.reducer;
