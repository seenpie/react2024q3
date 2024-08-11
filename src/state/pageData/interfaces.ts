import { IResource } from "../interfaces.ts";

export interface IPageParams {
  totalItems: number;
  offset: number;
  limit: number;
}

export interface ISelectedItemData {
  name: string;
  height: number;
  weight: number;
  type: string;
  happiness: number;
  image: string;
}

export interface IPageData {
  itemList: IResource[];
  pageParams: IPageParams;
  selectedItem: ISelectedItemData | null;
}
