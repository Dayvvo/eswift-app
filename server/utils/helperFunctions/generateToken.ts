import Jwt from 'jsonwebtoken'

const generateToken = (id: any) => {
  return Jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  })
}

export const checkImageArray = (oldImages: string[], newImages: string[]): boolean => {
  // if(oldImages.length !== newImages.length) return true

  const sortedOld = [...oldImages].sort();
  const sortedNew = [...newImages].sort();
  return sortedOld.some((image, index) => image  !== sortedNew[index]);
}


export default generateToken