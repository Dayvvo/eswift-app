import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import httpClient from "./useApi";
import { R } from "@/utils/types";

interface BlogObj {
  title: string;
  header_image: string | null;
  introduction: string;
  body: string;
  body_image: string | null;
  // tags: string[];
}
interface MailType {
  email: string;
  firstName: string;
  lastName: string;
  message: string;
  phoneNumber: string;
  inquiryType: string;
  howDidYouHear: string;
}

const useBlog = () => {
  const baseUrl = "http://localhost:5500/api";
  const [token, setToken] = useState("");
  useEffect(() => {
    const userData = localStorage.getItem("userData") || null;

    if (userData) {
      const parsedData = JSON.parse(userData);
      // console.log(parsedData);
      setToken(parsedData.token);
    }

    // console.log("storedToken", userData);
  }, []);

  const {
    query,
    post,
    delete: deleteRequest,
    putMutation: put,
  } = httpClient({ token });

  const addBlog = useCallback(
    async (data: BlogObj) => {
      try {
        const res = await post(`${baseUrl}/blog/post`, data);
        // console.log("res", res);
        return res;
      } catch (err: any) {
        // console.log("error calling addblog", err);
        throw new err();
      }
      // return res
    },
    [token]
  );

  const updateBlog = useCallback(
    async (blogPostId: string, data: any) => {
      try {
        const res = await put(`${baseUrl}/blog/post/${blogPostId}`, data);
        return res;
      } catch (err: any) {
        throw new err();
      }
    },
    [token]
  );

  const contactUsFn = async (data: MailType) => {
    try {
      const res = await post(`${baseUrl}/contact-us`, data);
      // console.log("res", res);
      return res;
    } catch (err: any) {
      // console.log("error calling addblog", err);
      throw new err();
    }
    // return res
  };

  const deleteBlog = useCallback(
    async (blogPostId: any) => {
      try {
        const res = await deleteRequest(
          `${baseUrl}/blog/delete-post/${blogPostId}`
        );
        return res;
        // console.log("res", res);
      } catch (err: any) {
        // console.log("error deleting blog", err);
        throw new err();
      }
      // return res
    },
    [token]
  );
  
  const getBlog = async (search?:string) =>  (await query(`${baseUrl}/blog/post?keyword=${search}`)).data as R; 

  const getBlogByID = async (id: string) => {
    try {
      const res = await query(`${baseUrl}/blog/post/${id}`);
      return res.data as Record<string, unknown>;
    } catch (err: any) {
      // console.log("error", err);
      console.log("err occured");
      return {
        message: "error",
      };
    }
  };

  return {
    addBlog,
    deleteBlog,
    getBlog,
    contactApi: contactUsFn,
    getBlogByID,
    updateBlog,
  };
};

export default useBlog;
