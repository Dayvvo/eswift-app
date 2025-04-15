import Jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

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

  export const clearImage = (filepath: string) => {
    if (!filepath) return;

    filepath =
      process.env.NODE_ENV === "production"
        ? `/mnt/volume/uploads/${filepath}`
        : path.join(__dirname, "..", "uploads", filepath);
    fs.unlink(filepath, (err) => {
      console.log(err);
    });
  };


export default generateToken