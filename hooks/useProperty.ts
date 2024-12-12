import { useCallback } from "react";
import  { useApiUrl } from "./useApi";
import { R } from "@/utils/types";
import useAuth from "./useAuth";
import { PropertyCardProps } from "@/screens/Property/propertyCard";

interface PropertyObj {
  title: string;
  description: string;
  address: string;
  price: {
    mode:string,
    amount:string
  };
  category: string;
  features: string[];
  images: string[];
  documents:R[]
}

export interface Favourite extends PropertyCardProps{
  favoriteId:string
}

interface PropertyResponse {
  data: any;
}
interface VerificationProps {
  verification: string;
}
const useProperty = () => {

  // console.log(token);
  const {token} = useAuth(); 
  
  const {
    get:query,
    post,
    put:putMutation,
    delete: delProperty,
    patch
  } = useApiUrl();

  const addProperty = useCallback(
    async (data: PropertyObj) => {
      try {
        const res = await post(`/property`, data);
        return res;
      } catch (err: any) {
        throw new err();
      }
      // return res
    },
    [token]
  );

  const editProperty = useCallback(
    async (data: PropertyObj,id:string) => {
      try {
        const res = await patch(`/property/${id}`, data);
        return res;
      } catch (err: any) {
        throw new err();
      }
      // return res
    },
    [token]
  );

  const verifyProperty = useCallback(
    async (id: any, data: VerificationProps) => {
      try {
        const res = await putMutation(`/property/${id}/verify`, data);
        return res as any;
      } catch (err: any) {
        throw new err();
      }
      // return res
    },
    [token]
  );
  
  const deleteProperty = useCallback(
    async (id: string) => {
      try {
        const res = await delProperty(`/property/${id}`);
        return res as any;
      } catch (err: any) {
        throw new err();
      }
      // return res
    },
    [token]
  );
  
  const getAdminProperty = async (inputValue: string) => {
    try {
      const res = await query(
        `/property/admin?keyword=${inputValue}`
      );
      return res as PropertyResponse;
    } catch (err: any) {
      throw new err();
    }
    // return res
  };
  
  const propertyCreator = useCallback(
    async (userId: string) => {
      try {
        const res = await query(`/user/users/${userId}`);
        return res as any;
      } catch (err: any) {
        throw new err();
      }
      // return res
    },
    [token]
  );
  
  const getPropertyDetails = useCallback(async (id: string) => {
    const res = await query(`/property/${id}`);
    return res;
  }, []);

  const getFavorites = async()=>  await query(`/property/favourite`);

  const addToFavorites = async(id:string)=>  await post(`/property/favourite/${id}`,{}) ;

  const deleteFromFavorites = async(id:string)=>  await delProperty(`/property/favourite/${id}`);

  return {
    propertyCreator,
    verifyProperty,
    addProperty,
    deleteFromFavorites,
    getAdminProperty,
    getPropertyDetails,
    deleteProperty,
    getFavorites,
    addToFavorites,
    editProperty,
  };


};

export default useProperty;
