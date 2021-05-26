import useSWR from 'swr';

import api from '../services/api';

async function fetcher<T = unknown>(url: string) {
  const response = await api.get<T>(url);
  return response.data;
}

export function useFetch<T = unknown>(url: string) {
  const { data, error, mutate } = useSWR<T>(url, fetcher);

  return {data, error, mutate};
}