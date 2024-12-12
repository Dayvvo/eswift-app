import { ObjectId } from 'mongoose'
import { PropertyDocuments, PropertyVerification } from './types'

export enum PropertyOwner {
  'ESWIFT' = 'ESWIFT',
  'AFFILIATE' = 'AFFILIATE',
  'AGENT' = 'AGENT'
}

export interface ILocation {
  state: string
  lga: string
  address: string
}

export interface IDocument {
  type: PropertyDocuments
  document: string
}

export enum PaymentMode {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  ANNUALLY = 'annually',
  ONE_OFF = 'one_off'
}

export interface IPrice {
  mode: PaymentMode
  amount: string
}

export interface IProperty {
  title: string
  description: string
  address: string
  type: string
  category: string
  duration: string
  features: Array<string>
  price: IPrice
  state:string
  lga: string
  owner: PropertyOwner
  images: Array<string>
  documents: Array<IDocument>
  creatorID: ObjectId
  ownerID: ObjectId
  isActive: boolean
  verification: PropertyVerification,

}
