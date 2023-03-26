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

const baseUrl: string = 'https://marvel-collector-backend.onrender.com';

export type SignupOptions = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

type LoginOptions = {
  username: string;
  password: string;
};

export async function signup(data: SignupOptions) {
  const res = await fetch(`${baseUrl}/api/v1/register`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const result = await res.json();
  return result;
}

export async function login(data: LoginOptions) {
  const res = await fetch(`${baseUrl}/api/v1/login`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const result = await res.json();
  return result;
}

export function logout() {}
