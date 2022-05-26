import * as SecureStore from "expo-secure-store";

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}

export async function saveJWT(value: string): Promise<void> {
  await save("jwt", value);
}

export async function getJWT(): Promise<string | null> {
  return await getValueFor("jwt");
}

export async function deleteJWT(): Promise<void> {
  return await SecureStore.deleteItemAsync("jwt");
}
