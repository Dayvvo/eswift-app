import multer from 'multer'
import path from 'path'

// multer config
const multerConfig = multer({
  limits: { fileSize: 6 * 1024 * 1024 }, //6MB
  storage: multer.memoryStorage(),
  fileFilter: (req, file: Express.Multer.File, cb) => {
    let ext = path.extname(file.originalname)
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !=='.pdf') {
      cb(null, false)
      return
    }
    cb(null, true)
  },
})

export default multerConfig;
