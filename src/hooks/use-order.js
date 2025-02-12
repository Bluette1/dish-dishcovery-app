import useSWR from 'swr';
import fetchWithToken from '../helpers/fetchWithToken';

export default function useOrder(token, id) {
  const urlOrder = `${process.env.NEXT_PUBLIC_BASE_URL}/orders/${id}`;

  const responseOrder = useSWR(
    // Only fetch if token and id are present
    id && token ? [urlOrder, token] : null,
    ([url, token]) => fetchWithToken(url, token),
    {
      refreshInterval: 1000,
      revalidateOnFocus: true,
      shouldRetryOnError: false,
    },
  );

  return responseOrder;
}
