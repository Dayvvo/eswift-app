

import { useCallback, useEffect, useState } from "react";
import httpClient, { useApiUrl } from "./useApi";

const useUpload = () => {
  const [token, setToken] = useState("");

  // console.log(token);

  useEffect(() => {
    const userData = localStorage.getItem("userData") || null;

    if (userData) {
      const parsedData = JSON.parse(userData);
      setToken(parsedData.token);
    }

  }, []);

  const {post} = useApiUrl()

  const uploadSingle = useCallback(
    async (file: FormData) => {
            const res = await post(`/upload/image`, file,{
                headers:{
                    "Content-Type":'multipart/form-data'
                }
            });
            return res;

      // return res
    },
    [token]
  );

  const uploadMultiple = useCallback(
    async (files:FormData) => {
        const res = await post(`/upload/images`, files,{
            headers:{
                "Content-Type":'multipart/form-data'
            }
        });
        return res

    },
    [token]
  );

  return {
    uploadSingle,
    uploadMultiple
  };
};

export default useUpload;
