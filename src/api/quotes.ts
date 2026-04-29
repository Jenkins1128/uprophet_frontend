import axios from 'axios';
import { url } from '@/domain';
import type { Quote, Comment } from '@/types';

// ─── Quotes ───────────────────────────────────────────────────────────────────

export const fetchLatestQuotes = async (): Promise<Quote[]> => {
  const { data } = await axios.get(`${url}/`, {
    withCredentials: true,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });
  return data;
};

export const fetchExploreQuotes = async (): Promise<Quote[]> => {
  const { data } = await axios.get(`${url}/explore`, {
    withCredentials: true,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });
  return data;
};

export const createQuoteRequest = async ({ title, quote }: { title: string; quote: string }): Promise<Quote> => {
  const { data } = await axios.post(`${url}/createQuote`, { title, quote }, {
    withCredentials: true,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });
  return data;
};

export const likeQuoteRequest = async (quoteId: string | number): Promise<void> => {
  const { data } = await axios.post(`${url}/like`, { quoteId }, {
    withCredentials: true,
    headers: { Accept: '*/*', 'Content-Type': 'application/json' },
  });
  return data;
};

export const unlikeQuoteRequest = async (quoteId: string | number): Promise<void> => {
  const { data } = await axios.post(`${url}/unlike`, { quoteId }, {
    withCredentials: true,
    headers: { Accept: '*/*', 'Content-Type': 'application/json' },
  });
  return data;
};

export const deleteQuoteRequest = async (quoteId: number | string): Promise<void> => {
  const { data } = await axios.delete(`${url}/deleteQuote`, {
    withCredentials: true,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    data: { quoteId },
  });
  return data;
};

// ─── Single Quote Post ────────────────────────────────────────────────────────

export const fetchQuotePost = async (quoteId: string): Promise<Quote> => {
  const { data } = await axios.get(`${url}/quotes/${quoteId}`, {
    withCredentials: true,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });
  return data;
};

// ─── Comments ─────────────────────────────────────────────────────────────────

export const fetchComments = async (quoteId: string): Promise<Comment[]> => {
  const { data } = await axios.get(`${url}/quotes/${quoteId}/comments`, {
    withCredentials: true,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });
  return data;
};

export const postCommentRequest = async ({ quoteId, comment }: { quoteId: string; comment: string }): Promise<Comment> => {
  const { data } = await axios.post(`${url}/addComment`, { quoteId, comment }, {
    withCredentials: true,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });
  return data;
};
