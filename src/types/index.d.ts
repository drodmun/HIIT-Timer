/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
  interface Window {
    adsbygoogle: any; // 👈️ turn off type checking
  }
}
declare global {
  interface ins {
    adsbygoogle: any; // 👈️ turn off type checking
  }
}
