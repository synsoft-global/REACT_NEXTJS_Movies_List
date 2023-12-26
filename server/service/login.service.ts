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


const filePath = path.join(__dirname, '../data', 'user.json')


export const readUserFile = async () => {
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    return users
}
export const createToken = async (user: User) => {
    const secretKey: any = process.env.SECRET_KEY
    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '9h' })
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