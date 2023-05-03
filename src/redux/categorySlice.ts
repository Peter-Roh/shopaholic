import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export type CategoryState = {
  categoryId: number;
  subcategoryId: number;
};

const initialState: CategoryState = {
  categoryId: -1,
  subcategoryId: -1,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    reset: (state) => {
      state.categoryId = -1;
      state.subcategoryId = -1;
    },
    saveCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    saveSubcategoryId: (state, action: PayloadAction<number>) => {
      state.subcategoryId = action.payload;
    },
  },
});

export const { reset, saveCategoryId, saveSubcategoryId } =
  categorySlice.actions;
export default categorySlice;
