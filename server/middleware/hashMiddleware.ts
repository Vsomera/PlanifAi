import bcrypt from "bcryptjs"

const hashPassword = async (password: string) => {
    // generates a hashed password before registering a user into database 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

const comparePasswordHash = async (password: string, hashedPassword: string) => {
    // compare user password to hashed password in database
    const isMatch = await bcrypt.compare(password, hashedPassword)
    return isMatch
}

export default {
    hashPassword,
    comparePasswordHash
}