declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      DATABASE_URL: string;
      SESSION_SECRET: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}

export {};
