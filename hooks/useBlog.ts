import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import httpClient, { useApiUrl } from "./useApi";
import { R } from "@/utils/types";
import useAuth from "./useAuth";

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
  const { token } = useAuth();

  const {
    get: query,
    post,
    delete: deleteRequest,
    put: putRequest,
  } = useApiUrl();

  const addBlog = useCallback(
    async (data: BlogObj) => {
      try {
        const res = await post(`/blog/post`, data);
        return res;
      } catch (err: any) {
        // console.log("error calling addblog", err.response.data);
        throw err;
      }
    },
    [token]
  );

  const updateBlog = useCallback(
    async (blogPostId: string, data: any) => {
      try {
        const res = await putRequest(`/blog/post/${blogPostId}`, data);
        return res;
      } catch (err: any) {
        throw new err();
      }
    },
    [token]
  );

  const contactUsFn = async (data: MailType) => {
    try {
      const res = await post(`/contact-us`, data);
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
        const res = await deleteRequest(`/blog/delete-post/${blogPostId}`);
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

  const getBlog = async (search?: string) =>
    (await query(`/blog/post?keyword=${search}`)).data as R;

  const getBlogByID = async (id: string) => {
    try {
      const res = await query(`/blog/post/${id}`);
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
