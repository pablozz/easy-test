import { useState, useEffect } from "react";
import { getJWT } from "../utils/storage";

// @TODO: add appropriate type
export const useAuth = (navigation?: any) => {
  const [jwt, setJwt] = useState<string | null>(null);

  useEffect(() => {
    const fetchJWT = async () => {
      const token = await getJWT();
      setJwt(token);
    };

    fetchJWT();
  }, []);

  useEffect(() => {
    const getToken = async () => {
      return await getJWT();
    };

    if (navigation && getToken()) {
      navigation.navigate("Login");
    }
  }, [jwt]);

  return { jwt };
};
