import multer from 'multer'
import path from 'path'
import dotenv from 'dotenv';
dotenv.config()

// multer config

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
   cb(null, process.env.STORAGE_PATH as string)
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '_' + file.originalname)
  }
})

const fileFilter = (_req: any, file: Express.Multer.File, cb: Function) => {

  const allowedTypes =['image/jpeg', 'image/png', 'application/pdf', 'image/jpg'];

  if(allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  }else {
    cb(new Error('Invalid file type. Only JPG, PNG, and PDF are allowed.'), false);
  }
  
}
// const multerConfig = multer({
//   limits: { fileSize: 6 * 1024 * 1024 }, //6MB
//   storage: multer.memoryStorage(),
//   fileFilter: (req, file: Express.Multer.File, cb) => {
//     let ext = path.extname(file.originalname)
//     if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !=='.pdf') {
//       cb(null, false)
//       return
//     }
//     cb(null, true)
//   },
// })

const multerConfig = multer({
  storage:  multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 6 * 1024 * 1024 } // 6MB file size limit
});

export default multerConfig;
