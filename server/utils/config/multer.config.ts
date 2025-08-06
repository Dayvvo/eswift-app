import multer from 'multer'
import dotenv from 'dotenv';
dotenv.config()

// multer config

const fileFilter = (_req: any, file: Express.Multer.File, cb: Function) => {

  const allowedTypes =['image/jpeg', 'image/png', 'application/pdf', 'image/jpg'];

  if(allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  }else {
    cb(new Error('Invalid file type. Only JPG, PNG, and PDF are allowed.'), false);
  }
  
}

const multerConfig = multer({
  storage:  multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB file size limit
});

export default multerConfig;
