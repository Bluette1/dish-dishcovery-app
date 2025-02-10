// types/next.d.ts

import { NextApiRequest } from 'next';

declare module 'next' {
  interface NextApiRequest {
    ip?: string;
  }
}
