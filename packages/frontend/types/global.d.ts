declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API: string;
      PUBLIC_KEY: string;
    }
  }
}

export {};
