import * as SecureStore from "expo-secure-store";

export const storage = {
  set: async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  },

  getString: async (key: string): Promise<string | null> => {
    return await SecureStore.getItemAsync(key);
  },

  delete: async (key: string) => {
    await SecureStore.deleteItemAsync(key);
  },
};
