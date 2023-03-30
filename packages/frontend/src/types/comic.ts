export type TComicImages = { path: string; extension: string }[];

export type TComicItem = {
  id: number;
  title: string;
  issueNumber: number;
  images: TComicImages;
};

export default TComicItem;
