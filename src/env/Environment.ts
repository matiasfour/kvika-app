import Constants from 'expo-constants';
import * as Updates from 'expo-updates';

export enum ExpoEnv {
  Staging = 'staging',
  Prod = 'prod',
  Default = 'default',
}

export type EnvConfig = {
  apiUrl: string;
  applicationToken: string;
  segmentWriteKey: string;
  sentryDSN: string;
};

// TODO: Maybe there is no need for this dev config since it's the same as staging?
// This will probably all be removed anyway once we migrate to eas env setup
export const DEV: EnvConfig = {
  apiUrl: Constants.expoConfig?.extra?.stagingApiUrl,
  applicationToken: Constants.expoConfig?.extra?.applicationTokenStaging,
  segmentWriteKey: Constants.expoConfig?.extra?.segmentWriteKeyStaging,
  sentryDSN: Constants.expoConfig?.extra?.sentryDSN,
};

export const STAGING: EnvConfig = {
  apiUrl: Constants.expoConfig?.extra?.stagingApiUrl,
  applicationToken: Constants.expoConfig?.extra?.applicationTokenStaging,
  segmentWriteKey: Constants.expoConfig?.extra?.segmentWriteKeyStaging,
  sentryDSN: Constants.expoConfig?.extra?.sentryDSN,
};
export const PROD: EnvConfig = {
  apiUrl: Constants.expoConfig?.extra?.prodApiUrl,
  applicationToken: Constants.expoConfig?.extra?.applicationTokenProd,
  segmentWriteKey: Constants.expoConfig?.extra?.segmentWriteKeyProd,
  sentryDSN: Constants.expoConfig?.extra?.sentryDSN,
};

export const getEnvironment = (expoEnv?: string) => {
  const { channel } = Updates;
  if (__DEV__) {
    // We can pass env variables to localhost through expo start,
    // for example to test sentry error reporting or segment tracking
    // by default we don't want to send local development errors or tracking
    if (expoEnv) {
      if (expoEnv === ExpoEnv.Staging) {
        return STAGING;
      }
      if (expoEnv === ExpoEnv.Prod) {
        return PROD;
      }
    }
    return DEV;
  }

  // For EXPO release Channels with expo publish, return staging or prod
  if (channel) {
    if (channel.indexOf(ExpoEnv.Staging) !== -1) {
      // Staging env settings
      // matches staging-v1, staging-v2
      return STAGING;
    }
    if (channel.indexOf(ExpoEnv.Default) !== -1 || channel.indexOf(ExpoEnv.Prod) !== -1) {
      // Prod env settings
      // matches default-v1, default-v2, default-v3
      // or prod-v1, prod-v2, prod-v3
      return PROD;
    }
  }
  return DEV;
};

export const isProd = () => {
  return PROD.apiUrl && getEnvironment(process.env.EXPO_ENV).apiUrl === PROD.apiUrl;
};

export const isDebuggingEnabled = () => {
  const isDebuggingEnabled = typeof global?.location?.pathname.includes('Debugger') !== 'undefined';
  return !isProd() && isDebuggingEnabled;
};
