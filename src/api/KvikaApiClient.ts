import ApiClient from '@kvika/api-client';
import { DisruptionTypeEnum } from '@kvika/api-types';
import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';

import { getEnvironment } from '../env/Environment';
import { updateServiceStatusMode } from '../store/appStateStatus';
import { EmptyAuthTokenError } from '../types/Types';
import { storeAuthToken as storeAuthTokenOnDevice, getAuthToken } from './AuthenticationStorage';

const env = getEnvironment();

type GetClientParams = {
  shouldCheckToken?: boolean;
  dispatch?: Dispatch<AnyAction>;
  loginRequestToken?: string;
};

class KvikaApiClient {
  private kvikaApiClient: ApiClient;

  private static instance: KvikaApiClient;

  private authToken: string | null;

  constructor(authToken: string | null, dispatch?: Dispatch<AnyAction>, loginRequestToken?: string) {
    this.authToken = authToken;
    this.kvikaApiClient = new ApiClient({
      apiUrl: env.apiUrl ?? '',
      storeAuthToken: this.storeAuthToken,
      appToken: env.applicationToken ?? '',
      authToken,
      onResponseHeaders: (headers) => {
        if (dispatch) {
          dispatch(
            updateServiceStatusMode({
              serviceStatus: headers['x-disruption-type'] as DisruptionTypeEnum,
              message: headers['x-disruption-message'],
              showAfter: new Date().toISOString(),
            })
          );
        }
      },
      loginRequestToken: loginRequestToken ?? '',
    });
  }

  private storeAuthToken = (authToken?: string) => {
    if (authToken) {
      storeAuthTokenOnDevice(authToken);
    }
  };

  public static getInstance(authToken: string | null, dispatch?: Dispatch<AnyAction>, loginRequestToken?: string) {
    // If we don't have an instance of the API client, or if the auth token has changed, or if we have a login request token we create a new one
    if (
      !KvikaApiClient.instance ||
      (KvikaApiClient.instance && authToken !== KvikaApiClient.instance.authToken) ||
      loginRequestToken
    ) {
      KvikaApiClient.instance = new KvikaApiClient(authToken, dispatch, loginRequestToken);
    }
    return KvikaApiClient.instance;
  }

  public static async getApiClient(params?: GetClientParams) {
    const storedAuthToken = await getAuthToken();
    if (params?.shouldCheckToken) {
      if (storedAuthToken) {
        return KvikaApiClient.getInstance(storedAuthToken, params?.dispatch, params?.loginRequestToken).kvikaApiClient;
      }
      throw new EmptyAuthTokenError('Stored auth token is falsy, user needs to login again');
    } else {
      return KvikaApiClient.getInstance(storedAuthToken, params?.dispatch, params?.loginRequestToken).kvikaApiClient;
    }
  }
}
export default KvikaApiClient;
