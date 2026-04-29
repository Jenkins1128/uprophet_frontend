import axios from 'axios';
import { url } from '@/domain';
import type { UserInfo, FavoriteRelation, SearchResult, NotificationItem, ImagePayload, Quote } from '@/types';

export const fetchProfileQuotes = async (username: string): Promise<Quote[]> => {
  const { data } = await axios.post(`${url}/profile`, { username }, {
    withCredentials: true,
    headers: { Accept: '*/*', 'Content-Type': 'application/json' },
  });
  return data;
};

export const fetchUserInfo = async (username: string): Promise<UserInfo> => {
  const { data } = await axios.post(`${url}/userInfo`, { username }, {
    withCredentials: true,
    headers: { Accept: '*/*', 'Content-Type': 'application/json' },
  });
  return data;
};

export const fetchCurrentUserInfo = async (): Promise<UserInfo> => {
  const { data } = await axios.get(`${url}/currentUserInfo`, {
    withCredentials: true,
    headers: { Accept: '*/*', 'Content-Type': 'application/json' },
  });
  return data;
};

export const savePhotoRequest = async (imageData: ImagePayload): Promise<void> => {
  const { data } = await axios.put(`${url}/uploadPic`, imageData, {
    withCredentials: true,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });
  return data;
};

export const saveBioRequest = async (bio: string): Promise<void> => {
  const { data } = await axios.put(`${url}/savebio`, { bio }, {
    withCredentials: true,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });
  return data;
};

export const fetchFavoriters = async (username: string): Promise<FavoriteRelation[]> => {
  const { data } = await axios.post(`${url}/favoriters`, { username }, {
    withCredentials: true,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });
  return data;
};

export const fetchFavoriting = async (username: string): Promise<FavoriteRelation[]> => {
  const { data } = await axios.post(`${url}/favoriting`, { username }, {
    withCredentials: true,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });
  return data;
};

export const fetchSearchResults = async (search: string): Promise<SearchResult[]> => {
  const { data } = await axios.post(`${url}/search`, { search }, {
    withCredentials: true,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });
  return data;
};

export const fetchNotifications = async (): Promise<NotificationItem[]> => {
  const { data } = await axios.get(`${url}/notifications`, {
    withCredentials: true,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });
  return data;
};
