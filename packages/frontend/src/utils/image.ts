import { TComicImages } from '@/types/comic';

export const createImageUrl = (images: TComicImages) => {
  const [firstImage] = images;

  if (firstImage) return `${firstImage.path}.${firstImage.extension}`;
  return undefined;
};

export default createImageUrl;
