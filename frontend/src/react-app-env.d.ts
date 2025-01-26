interface Window {
  webkitAudioContext: typeof AudioContext;
}

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_URL: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
