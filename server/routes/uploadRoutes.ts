import express, { Request, Response } from 'express'
import uploadController from '../controllers/uploadController'
import { appConfig } from '../utils/config'
import multerConfig from '../utils/config/multer.config'
import { isAuth } from '../utils/middleware'

const router = express.Router()
const config = new appConfig()

router
  .route('/image')
  .post(multerConfig.single('file'), uploadController.uploadSingle)
  .delete(isAuth, uploadController.deleteFile)

router.post(
  '/images',
  multerConfig.array('files'),
  uploadController.uploadMultiple
)

export default router
