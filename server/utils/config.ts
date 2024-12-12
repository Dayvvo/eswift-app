import axios from 'axios'
import mongoose from 'mongoose'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from '../models/User'
import { AuthProvider, UserRole } from './interfaces'
import { GoogleAuthResponse } from './interfaces/types'
import { generateRefCode } from './helperFunctions/generateRefCode'

export class appConfig {
  host = process.env['NODE_ENV'] !== 'production' ? 'localhost' : ''

  initializePassportStrategy = () => {
    // Serialize User
    passport.serializeUser((user, done) => {
      done(null, user)
    })

    // Deserialize User
    passport.deserializeUser((id: any, done) => {
      done(null, id)
    })

    // Configure Google Strategy
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env['GOOGLE_CLIENT_ID'] as string,
          clientSecret: process.env['GOOGLE_CLIENT_SECRET'] as string,
          callbackURL: `${process.env['BACKEND_URL']}/api/auth/google/callback`,
          proxy: true,
          passReqToCallback: true,
        },
        async (
          req,
          _accessToken,
          _refreshToken,
          profile: Record<string, any>,
          done
        ) => {
          const refCode = req.query['state'];
          let refferer ;
          if (refCode){
            refferer = User.findOne({refCode})
          }
          
          const verifiedUser: GoogleAuthResponse = profile?._json
          try {
            const user = await User.findOneAndUpdate(
              { email: verifiedUser.email },
              {
                tenantId: verifiedUser.sub,
                firstName: verifiedUser.given_name,
                lastName: verifiedUser.family_name,
                avatar: verifiedUser.picture,
                provider: AuthProvider.GOOGLE,
                ...refferer?{
                  referrer: refferer
                }:{},
                refCode: generateRefCode(8),
                role: UserRole.CLIENT,
                isActive: true,
                isVerified: verifiedUser.email_verified,
      
              },
              { upsert: true, new: true }
            )

            return done(null, user)
          } catch (error) {
            console.log('err at google oauth', error)
          }
        }
      )
    )
  }

  connectDB = async () => {
    try {
      console.log('connecting db')

      const mongooseConnect = await mongoose.connect(process.env.MONGO_URI as string,{
        dbName:process.env['DB_NAME']
      })
      console.log('MongoDB Connected...', mongooseConnect.Collection)
    } catch (err) {
      console.error('error at connecting db', err)
      process.exit(1)
    }
  }

  axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: '',
    },
  })
}
