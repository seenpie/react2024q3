import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPageData, IPageParams, ISelectedItemData } from "./interfaces.ts";
import { IResource } from "../interfaces.ts";

const initialState: IPageData = {
  itemList: [],
  pageParams: {
    offset: 0,
    totalItems: 0,
    limit: 0
  },
  selectedItem: null
};

export const pageDataSlice = createSlice({
  name: "currentPagePokemonList",
  initialState,
  reducers: {
    addItemsToList: (state, action: PayloadAction<IResource[]>) => {
      state.itemList = action.payload;
    },
    updatePageParams: (state, action: PayloadAction<IPageParams>) => {
      state.pageParams.totalItems = action.payload.totalItems;
      state.pageParams.limit = action.payload.limit;
      state.pageParams.offset = action.payload.offset;
    },
    addSelectedItem: (state, action: PayloadAction<ISelectedItemData>) => {
      state.selectedItem = action.payload;
    }
  }
});

export const { addSelectedItem, addItemsToList, updatePageParams } =
  pageDataSlice.actions;
