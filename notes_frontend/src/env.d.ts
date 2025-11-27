declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_PORT?: string;
    EXPO_PUBLIC_TRUST_PROXY?: string;
    EXPO_PUBLIC_LOG_LEVEL?: string;
    EXPO_PUBLIC_HEALTHCHECK_PATH?: string;
    EXPO_PUBLIC_FEATURE_FLAGS?: string;
    EXPO_PUBLIC_EXPERIMENTS_ENABLED?: string;
  }
}
