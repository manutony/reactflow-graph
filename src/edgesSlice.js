import { createSlice } from '@reduxjs/toolkit';

const edgesSlice = createSlice({
  name: 'edges',  
  initialState: [], 
  reducers: {

    addEdge: (state, action) => {
      state.push(action.payload);
    },
    removeEdge: (state, action) => {
      return state.filter((edge) => edge.id !== action.payload);
    },
  },
});

export const { addEdge, removeEdge } = edgesSlice.actions;
export default edgesSlice.reducer;
