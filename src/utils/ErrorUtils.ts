import { DisruptionTypeEnum } from '@kvika/api-types';
import { Alert } from 'react-native';
import * as Sentry from 'sentry-expo';
import { ApiError as KvikaApiError } from '@kvika/api-client';
import { ErrorStrings } from '../constants/Text';

type AlertData = {
  title?: string;
  message: string;
};

type ErrorHandlingProps = {
  error: KvikaApiError;
  alertData?: AlertData;
  sentryExtras?: Record<string, unknown>;
  skipAlert?: boolean;
};

export const getErrorEvent = (apiError: KvikaApiError, extra?: Record<string, unknown>): Sentry.Native.Event => {
  const { message } = apiError;

  if (apiError.response) {
    const { status, data, headers } = apiError.response;
    const { type, code, detail } = data;
    const detailString = typeof detail === 'string' ? detail : JSON.stringify(detail);

    return {
      message: `${detailString}, errorCode: ${status}, message: ${message ?? ''}`,
      extra: { code, type, requestId: headers['x-request-id'], ...extra },
    };
  }
  return { message: `Error, message: ${message ?? ''}`, extra };
};

export function errorHandling({ error, alertData, sentryExtras, skipAlert = false }: ErrorHandlingProps) {
  const status = error?.response?.status;

  const disruptionType = error?.response?.headers['x-disruption-type'] as DisruptionTypeEnum | undefined;
  const isMaintenanceMode = status === 503 && disruptionType === DisruptionTypeEnum.MAINTENANCE;

  // No need to do analytics, log to Sentry or display error to user if maintenance mode is on
  if (isMaintenanceMode) {
    return;
  }

  Sentry.Native.captureEvent(getErrorEvent(error, sentryExtras));

  if (!skipAlert) {
    Alert.alert(alertData?.title ?? ErrorStrings.ErrorHeadline, alertData?.message ?? ErrorStrings.ErrorMessage);
  }
}
