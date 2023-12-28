/**
* Description: login..service.ts file has logics to create and verify token.
* Version: 1.0.0
* Author: Synsoft Global
* Author URI: https://www.synsoftglobal.com/
*
*/


import fs from 'fs'
import jwt from 'jsonwebtoken'
import path from 'path'
import { User } from '../interface/interface'
import UserModel from '../mongodb/models/user.model'
import { t } from './locales.service'


const filePath = path.join(__dirname, '../data', 'user.json')


export const readUserFile = async () => {
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    return users
}
export const createToken = async (user: User) => {
    const secretKey: any = process.env.SECRET_KEY
    const token = jwt.sign({ _id: user._id, email: user.email }, secretKey, { expiresIn: '24h' })
    return token
}

export const validateToken = async (token: string) => {
    let value: any
    const secretKey: any = process.env.SECRET_KEY
    try {
        jwt.verify(token, secretKey, (err: any, user: any) => {

            if (err) value = { message: 'Forbidden' }
            else value = { message: 'Success', user: user }
        })
    } catch (error) {
        value = { message: 'Something went wrong' }
    }
    return value
}

export const loginUser = async (email: string, password: string): Promise<any> => {
    let user
    try {
        user = await UserModel.findOne({ email })

        if (!user) return null
        if (user.email === email && user.password !== password) return null
        return user

    } catch (error) {
        return null
    }
}