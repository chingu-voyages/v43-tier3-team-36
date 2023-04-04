import type {
  User,
  CollectionItemPartial,
  TradeOfferPartial,
  CollectionItem,
} from '@marvel-collector/types';

import type TComicType from '@/types/comic';

const MARVEL_API_KEY = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY;
const MARVEL_API_URL = process.env.NEXT_PUBLIC_MARVEL_API_URL;
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const searchComics = async (
  comicTitle: string,
): Promise<TComicType[]> => {
  const response = await fetch(
    `${MARVEL_API_URL}/comics?titleStartsWith=${comicTitle}&apikey=${MARVEL_API_KEY}&limit=50`,
  );
  const json = await response.json();
  return json.data.results;
};

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
  const res = await fetch(`${SERVER_URL}/api/v1/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error();
  }

  const result = await res.json();
  return result;
}

export async function login(data: LoginOptions) {
  const res = await fetch(`${SERVER_URL}/api/v1/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error();
  }

  const result = await res.json();
  return result;
}

export const getCurrentUserDetails = async (): Promise<User> => {
  const res = await fetch(`${SERVER_URL}/api/v1/users/current-user`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error();
  }

  const result = await res.json();
  return result.user;
};

export const addComic = async (
  data: CollectionItemPartial,
): Promise<string> => {
  const res = await fetch(`${SERVER_URL}/api/v1/user/collection`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();

  if (json.error) throw new Error(json.error);

  return json.message;
};

export const removeComic = async (comicId: number) => {
  const res = await fetch(`${SERVER_URL}/api/v1/user/collection/${comicId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    // @ts-ignore
    // NOTE: Error type needs defining
    throw new Error(res.error);
  }

  return res.json();
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

  const response = await fetch(url.toString(), {
    method: 'GET',
    credentials: 'include',
  });
  const json = await response.json();
  return json.data.users;
};

export const getComicBookCollector = async (id: string): Promise<User> => {
  const response = await fetch(`${SERVER_URL}/api/v1/user/${id}/collection`, {
    method: 'GET',
    credentials: 'include',
  });
  const json = await response.json();
  return json.data;
};

export const createTradeOffer = async (
  data: TradeOfferPartial,
): Promise<string> => {
  const res = await fetch(`${SERVER_URL}/api/v1/user/trade-offer`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();

  if (json.error) throw new Error(json.error);

  return json.message;
};

export const getUsersWithComic = async (comicId: number) => {
  const res = await fetch(`${SERVER_URL}/api/v1/users/comic/${comicId}`);
  const json: Array<CollectionItem & { user: User }> = await res.json();
  return json;
};
