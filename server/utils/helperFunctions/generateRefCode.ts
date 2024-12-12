export const generateRefCode = (length: number = 8): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let referralCode = 'REF_'

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    referralCode += characters[randomIndex]
  }

  return referralCode
}

export const generateTempPass = (length: number = 8): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let referralCode = 'TEMP_PASS_'

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    referralCode += characters[randomIndex]
  }

  return referralCode
}
