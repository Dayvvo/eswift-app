


import { Request, Response } from 'express'
import Property from '../models/Property'
import Users from '../models/User'
import { UserRole } from '../utils/interfaces'


class AdminControllerClass {
  //TODO: finish function
  //TODO: finish function
  getDashboardStats = async (req: Request, res: Response) => {
    try {

      const propertiesCount = await Property.countDocuments()

      const usersCount = await Users.countDocuments()

      const affiliateCount = await Users.countDocuments({role: UserRole.AFFILIATE })

      const agentCount = await Users.countDocuments()
   
      return res.json({
        status:'success',
        message:'Dashboard statistics pulled',
        data:{
            propertiesCount,
            usersCount,
            affiliateCount,
            agentCount
        }
      })


    } catch (err: any) {
      console.error(err?.message)
      res.status(500).send('An Error ocurred while retrieving data')
    }
  }

}

let AdminController = new AdminControllerClass();

export default AdminController;