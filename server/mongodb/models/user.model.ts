import { model, Schema } from 'mongoose'
import { User } from '../../interface/interface'

const userSchema = new Schema<User>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true }
}, { _id: true })

const UserModel = model<User>('User', userSchema)

export default UserModel
