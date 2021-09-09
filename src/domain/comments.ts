export type Comment = {
  id: number;
  text: string;
  by: string;
  time: number;
  kids?: number[];
  parent?: number[];
};
