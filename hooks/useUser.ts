import React, { useCallback } from "react";
import { useApiUrl } from "./useApi";

interface VerificationProps {
  verification: string;
}

type AddUserProps = {
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
  phoneNumber?: string;
  address?: string;
};

const useUser = () => {
  const client = useApiUrl();

  const getUser = useCallback((search?: string) => {
    const req = client
      .get(`/user/users?keyword=${search}`)
      .then((res: any) => {
        return res;
      })
      .catch((err: any) => {
        throw new err();
      });
    return req;
  }, []);

  const getUserById = useCallback(async (userId: string) => {
    try {
      const req = await client.get(`/user/users/${userId}`);
      return req;
    } catch (err: any) {
      throw new err();
    }
  }, []);

  const addUser = useCallback(async (data: AddUserProps) => {
    try {
      const req = await client.post("/user/add-user", data);
      return req;
    } catch (err: any) {
      throw new err();
    }
  }, []);
  const updateUser = useCallback(async (data: AddUserProps) => {
    try {
      const req = await client.put("/user/profile", data);
      return req;
    } catch (err: any) {
      throw new err();
    }
  }, []);
  const verifyUser = useCallback(
    async (id: string, data: VerificationProps) => {
      try {
        const res = await client.put(`user/users/${id}/verify`, data);
        return res as any;
      } catch (err: any) {
        throw new err();
      }
      // return res
    },
    []
  );

  return {
    getUser,
    getUserById,
    addUser,
    updateUser,
    verifyUser,
  };
};

export default useUser;
