import { useState, useEffect } from "react";
import { getJWT } from "../utils/storage";
import * as SecureStore from "expo-secure-store";

// @TODO: add appropriate type
export const useAuth = (navigation?: any) => {
  const [jwt, setJwt] = useState<string | null>(null);

  // async function save(key: string, value: string) {
  //   await SecureStore.setItemAsync(key, value);
  // }

  const save = async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  };

  //   async function getValueFor(key: string) {
  //     let result = await SecureStore.getItemAsync(key);
  //     return result;
  //   }

  const getValueFor = async (key: string) => {
    let result = await SecureStore.getItemAsync(key);
    return result;
  };

  // export async function saveJWT(value: string): Promise<void> {
  //   await save("jwt", value);
  // }

  const saveJWT = async (value: string): Promise<void> => {
    await save("jwt", value);
    setJwt(await getJWT());
  };

  //   export async function getJWT(): Promise<string | null> {
  //     return await getValueFor("jwt");
  //   }
  const getJWT = async (): Promise<string | null> => {
    return await getValueFor("jwt");
  };

  //   export async function deleteJWT(): Promise<void> {
  //     return await SecureStore.deleteItemAsync("jwt");
  //   }c

  const deleteJWT = async (): Promise<void> => {
    await SecureStore.deleteItemAsync("jwt");
    setJwt(await getJWT());
  };

  useEffect(() => {
    const fetchJWT = async () => {
      setJwt(await getJWT());
    };

    fetchJWT();
  }, []);

  useEffect(() => {
    (async () => {
      if (navigation && !(await getJWT())) {
        navigation.navigate("Login");
      }
    })();
  }, [jwt]);

  return { jwt, deleteJWT, saveJWT, getJWT };
};
