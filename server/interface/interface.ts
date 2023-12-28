/**
 * Description: interface.ts contains interfaces.
 * Version: 1.0.0
 * Author: Synsoft Global
 * Author URI: https://www.synsoftglobal.com/
 *
 */

import { Document } from "mongoose"



export interface Movies extends Document{
    title: string,
    publishingYear: string,
    image: string,
    userID: string
    name: string
} 

export interface User extends Document {
    name: string
    password: number | string,
    id: number
    email: string
}