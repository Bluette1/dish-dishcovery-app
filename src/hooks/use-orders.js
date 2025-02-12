import useSWR from 'swr';
import fetchWithToken from '../helpers/fetchWithToken';

export default function useOrders(token) {
  const urlOrders = `${process.env.NEXT_PUBLIC_BASE_URL}/orders`;

  const responseOrders = useSWR(
    // Only fetch if token is present
    token ? [urlOrders, token] : null,
    ([url, token]) => fetchWithToken(url, token),
    {
      refreshInterval: 1000,
      revalidateOnFocus: true,
      shouldRetryOnError: false,
    },
  );

  return responseOrders;
}
