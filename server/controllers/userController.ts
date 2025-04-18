import User from '../models/User'
import { Request, Response } from 'express'
import { validateSignupData } from '../utils/validation'
import { ISignupValidation } from '../utils/interfaces/interface.validation'
import generateToken from '../utils/helperFunctions/generateToken'
import { generateTempPass } from '../utils/helperFunctions/generateRefCode'
import { mailGenMails } from '../utils/mails/mailgen.mail'
import { HttpStatusCode } from 'axios'
import { UserRole } from '../utils/interfaces'

class UserController {
  async verifyUser(req: Request, res: Response) {
    const { userId } = req.params;
    const { verification } = req.body;
    const allowedVerificationStatuses = [
      "Pending",
      "Verified",
      "Rejected",
      "Suspend",
      "Resume",
      "Unsuspend"
    ];
    if (!allowedVerificationStatuses.includes(verification)) {
      return res.status(400).json({ message: 'Invalid verification status' })
    }

    try {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { verification: verification },
        { new: true }
      )
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      res.status(200).json({
        statusCode: 200,
        message: 'Verification status updated successfully',
        data: user,
      })
    } catch (error) {
      res.status(500).send('Failed to update verification status')
    }
  }
  getAllUsers = async (req: Request, res: Response) => {
    const keyword = req.query.keyword as string
    const regex = new RegExp(keyword, 'i')

    const findQuery = {
      $or: [
        { firstName: regex },
        { lastName: regex },
        { email: regex },
        { phoneNumber: regex },
        { email: regex },
        { role: regex },
      ],
    }
    try {
      const users = await User.find(findQuery).sort({ createdAt: -1 }); 
      return res.status(200).json({
        message: 'Fetched successfully',
        data: users,
        statusCode: 200,
      })
    } catch (error) {
      res.status(500).send('Failed to fetch all users')
    }
  }

  getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params
    try {
      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      if(process.env.NODE_ENV !== 'production') {
        if(user) {
          if(!user.avatar?.startsWith('http') && !user.avatar?.startsWith('https')) {
            user.avatar = `${process.env.BACKEND_URL}/uploads/${user.avatar}`
          } else {
            user.avatar = user.avatar
          }
        }
      }

      return res.status(200).json({
        message: 'Success',
        statusCode: 200,
        data: user,
      })
    } catch (error) {
      res.status(500).send('Internal server error')
    }
  }

  addUser = async (req: Request, res: Response) => {
    const body: ISignupValidation = req.body
    try {
      const validate = validateSignupData(body)
      const { error } = validate
      if (error) {
        return res.status(400).json(error.details[0])
      }
      const { email, firstName, lastName, role } = body
      const userExists = await User.findOne({ email })

      if (userExists) {
        return res
          .status(400)
          .json({ statusCode: 400, message: 'User with email already exists' })
      }

      let password:string = generateTempPass()

      const user = await User.create({
        email,
        hash: password,
        firstName,
        lastName,
        role,
      })

      const selectedRole: UserRole[] = [UserRole.AFFILIATE, UserRole.AGENT]

      if (selectedRole.includes(user.role)) await mailGenMails.refLink(firstName, email, user.refCode, true)
      else await mailGenMails.updatePassword(firstName, email, password, true)

      return res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        property: user.propertyCount,
        email: user.email,
        role: user.role,
      })
    } catch (err) {
      console.log('Error in user creation', err)
      res.status(500).send('Internal Server Error')
    }
  }

  updateUser = async (req: Request, res: Response) => {
    const body: ISignupValidation = req.body
    try {
      const validate = validateSignupData(body)
      const { error, value } = validate
      if (error) {
        return res.status(400).json(error.details[0])
      }

      const user = req.user! as any

      const selectedUser = await User.findById(user['_id'])
      if(!selectedUser) {
        return res.status(404).json({ message: 'User not found' })
      }
      
      const userData = await User.findOneAndUpdate(
        { _id: user['_id'] },
        { ...value },
        { new: true }
      )
      return res.status(HttpStatusCode.Ok).json({
        message: 'success',
        statusCode: 200,
        data: userData,
      })
    } catch (error: any) {
      res.status(500).send(error.message || 'Internal server error')
    }
  }
}

let userController = new UserController()

export default userController
