'use client';
import { SWRConfig } from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const SWRProvider = ({ children }) => {
  return (
    <SWRConfig
      value={{
        refreshInterval: 1000,
        fetcher,
      }}
    >
      {children}
    </SWRConfig>
  );
};
