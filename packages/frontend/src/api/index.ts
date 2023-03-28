import type { User, CollectionItemPartial } from '@marvel-collector/types';

import type TComicType from '@/types/comic';

const API_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const searchComics = async (
  comicTitle: string,
): Promise<TComicType[]> => {
  const response = await fetch(
    `${API_URL}/comics?titleStartsWith=${comicTitle}&apikey=${API_KEY}`,
  );
  const json = await response.json();
  return json.data.results;
};

const baseUrl: string = process.env.NODE_ENV === 'development'
  ? 'http://localhost:4000'
  : 'https://marvel-collector-backend.onrender.com';

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
      credentials: 'include',
    },
  });

  if (!res.ok) {
    throw new Error();
  }

  const result = await res.json();
  return result;
}

export async function login(data: LoginOptions) {
  const res = await fetch(`${baseUrl}/api/v1/login`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      credentials: 'include',
    },
  });

  if (!res.ok) {
    throw new Error();
  }

  const result = await res.json();
  return result;
}

export const addComic = (data: CollectionItemPartial) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      credentials: 'include',
    },
    body: JSON.stringify(data),
  };

  fetch(`${baseUrl}/api/v1/user/collection`, options);
};

export function logout() {}

export type TComicBookCollectorQuery = Partial<{
  username: string;
  location: string;
}>;

export const getComicBookCollectors = async (
  query?: TComicBookCollectorQuery,
): Promise<User[]> => {
  const url = new URL('/api/v1/collectors', SERVER_URL);
  if (query && Object.keys(query).length > 0) {
    url.search = new URLSearchParams(query).toString();
  }

  const response = await fetch(url.toString());
  const json = await response.json();
  return json.data.users;
};

export const getComicBookCollector = async (id: string): Promise<User> => {
  const response = await fetch(`${SERVER_URL}/api/v1/collectors/${id}`);
  const json = await response.json();
  return json.data.users;
};
