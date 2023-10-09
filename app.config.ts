import { ExpoConfig, ConfigContext } from '@expo/config';

const IS_DEV = process.env.APP_VARIANT === 'development';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: IS_DEV ? 'DEV-Kvika' : 'Kvika',
  slug: 'kvika-expo-app',
  ios: {
    ...config.ios,
    bundleIdentifier: IS_DEV ? 'com.kvika.kvikaAppDev' : 'com.kvika.kvikaApp',
  },
  android: {
    ...config.android,
    package: IS_DEV ? 'com.kvika.kvikaAppDev' : 'com.kvika.kvikaApp',
    googleServicesFile: IS_DEV ? './assets/google-services-develop.json' : './assets/google-services.json',
  },
  extra: {
    ...config.extra,
    stagingApiUrl: 'https://api.staging.kvika.is',
    prodApiUrl: 'https://api.kvika.is',
    applicationTokenStaging: '4212d6e2-a47a-f660-c3f5-bc83d37342e3',
    applicationTokenProd: '5e45edb3-394b-c48b-135d-e79f5bf1950b',
    segmentWriteKeyStaging: 'CPU6pkAHEZeTIBmOACFNEhdCDUi3PBMo',
    segmentWriteKeyProd: 'WhpEPd9UEyY3LyUTBM0HszTQO75HF8ez',
    sentryDSN: 'https://b3195697d2754e528d91cc1e35ea2cd5@o394619.ingest.sentry.io/6718920',
  },
  hooks: {
    postPublish: [
      {
        file: 'sentry-expo/upload-sourcemaps',
        config: {
          organization: 'kvika',
          project: 'kvika-app',
          authToken: process.env.SENTRY_AUTH_TOKEN,
        },
      },
    ],
  },
});
