import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "../features/filter/filterSlice";

const store = configureStore({
  reducer: { filter: filterSlice },
});

const filterSliceValue = (store) => store.filter;

export default store;

export { filterSliceValue };
