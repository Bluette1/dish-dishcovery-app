import useSWR from 'swr';
import fetchWithToken from '../helpers/fetchWithToken';

export default function useUser({ id, token }) {
  const urlUser = `${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}`;

  const responseUser = useSWR(
    // Only fetch if both id and token are present
    id && token ? [urlUser, token] : null,
    ([url, token]) => fetchWithToken(url, token),
    {
      refreshInterval: 1000,
      revalidateOnFocus: true,
      shouldRetryOnError: false,
    },
  );

  return responseUser;
}
