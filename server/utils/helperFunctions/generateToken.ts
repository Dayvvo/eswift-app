import Jwt from 'jsonwebtoken'

const generateToken = (id: any) => {
  return Jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  })
}

export default generateToken