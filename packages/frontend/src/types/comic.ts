export type TComicImages = { path: string; extension: string }[];

export type TComicItem = {
  id: number;
  title: string;
  issueNumber: number;
  series: {
    resourceURI: string;
    name: string;
  };
  images: TComicImages;
};

export default TComicItem;
