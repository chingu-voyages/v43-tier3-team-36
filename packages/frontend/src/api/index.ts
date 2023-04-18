import type {
  User,
  CollectionItemPartial,
  TradeOfferPartial,
  PushNotification,
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

export const getComic = async (comicId: number): Promise<TComicType> => {
  const response = await fetch(
    `${MARVEL_API_URL}/comics/${comicId}?apikey=${MARVEL_API_KEY}`,
  );
  const json = await response.json();
  return json.data.results[0];
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
  const res = await fetch(`${SERVER_URL}/api/v1/current-user`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error();
  }

  const result = await res.json();
  return result.user;
};

export const getUserNotifications = async (): Promise<PushNotification[]> => {
  const res = await fetch(`${SERVER_URL}/api/v1/notifications`, {
    method: 'GET',
    credentials: 'include',
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(`${json.error} (${res.status})`);
  }

  return json.data.notification;
};

export const patchUserNotifications = async (
  notificationId: string,
): Promise<PushNotification> => {
  const res = await fetch(
    `${SERVER_URL}/api/v1/notifications/${notificationId}`,
    {
      method: 'PATCH',
      credentials: 'include',
    },
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(`${json.message} (${res.status})`);
  }

  return json.data;
};

export const addComic = async (
  data: CollectionItemPartial,
): Promise<string> => {
  const res = await fetch(`${SERVER_URL}/api/v1/collections`, {
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
  const res = await fetch(`${SERVER_URL}/api/v1/collections/${comicId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    // @ts-ignore
    // NOTE: Error type needs defining
    throw new Error(res.error);
  }

  const json = await res.json();

  if (json.error) {
    throw new Error(json.error);
  }

  return json.data.message;
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

export const getComicBookCollector = async (userId: string): Promise<User> => {
  const response = await fetch(`${SERVER_URL}/api/v1/collection/${userId}`, {
    method: 'GET',
    credentials: 'include',
  });
  const json = await response.json();
  return json.data;
};

export const createTradeOffer = async (
  data: TradeOfferPartial,
): Promise<string> => {
  const res = await fetch(`${SERVER_URL}/api/v1/trade-offers`, {
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

export type TTradeOfferQuery = Partial<{
  comic: string;
  location: string;
}>;

// TODO: Add type for the response of this service
export const getTradeOffers = async (
  query?: TTradeOfferQuery,
): Promise<any[]> => {
  const url = new URL('/api/v1/trade-offers', SERVER_URL);
  if (query && Object.keys(query).length > 0) {
    url.search = new URLSearchParams(query).toString();
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    credentials: 'include',
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error);
  }

  return json.data.tradeOffers;
};

export type TRequestTradeOfferBody = {
  tradeOfferId: string;
  receiverComicId?: number;
};

export const requestTradeOffer = async (
  data: TRequestTradeOfferBody,
): Promise<any> => {
  const res = await fetch(`${SERVER_URL}/api/v1/trade-request`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(`${json.error} (${res.status})`);
  }

  return json.message;
};
