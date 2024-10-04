
// types/next.d.ts
import 'next';

declare module 'next' {
  import { NextComponentType } from 'next';

  interface NextComponentType {
    auth?: boolean;
  }
}
