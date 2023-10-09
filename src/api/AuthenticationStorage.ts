import * as SecureStore from 'expo-secure-store';

export const TOKEN_KEY = 'authToken';

export const storeAuthToken = async (token: string) => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
};

export const getAuthToken = async () => {
  try {
    const result = await SecureStore.getItemAsync(TOKEN_KEY);
    return result;
  } catch (e) {
    return null;
  }
};

export const deleteAuthToken = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};
