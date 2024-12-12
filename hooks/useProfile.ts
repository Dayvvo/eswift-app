import React, { useCallback } from 'react'
import { useApiUrl } from './useApi'

const useProfile = () => {

  const client = useApiUrl();

  const getProfile = useCallback(() => {
    try {
      const req = client.get('/user-detail/profile');
      return req;
    }
    catch (err) {
      console.log('err', err);
    }
  }, [])
  
  return {
    getProfile,
  }
}

export default useProfile