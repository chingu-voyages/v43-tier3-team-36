import TComicType from '@/types/comic';

const API_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const API_URL = process.env.NEXT_PUBLIC_API;

export const searchComics = async (
  comicTitle: string,
): Promise<TComicType[]> => {
  const response = await fetch(
    `${API_URL}/comics?titleStartsWith=${comicTitle}&apikey=${API_KEY}`,
  );
  const json = await response.json();
  return json.data.results;
};

export default searchComics;
