import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  category: "all",
};

const filterSlice = createSlice({
  name: "filterSlice",

  initialState,

  reducers: {
    setFilterSliceSearch: (state, action) => {
      state.search = action.payload;
    },

    setFilterSliceCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { setFilterSliceSearch, setFilterSliceCategory } =
  filterSlice.actions;
