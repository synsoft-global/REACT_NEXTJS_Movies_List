/**
 * Description: interface.ts contains interfaces.
 * Version: 1.0.0
 * Author: Synsoft Global
 * Author URI: https://www.synsoftglobal.com/
 *
 */



export interface Movies {
    id: number,
    title: string,
    publishingYear: string,
    image: string,
    userID: number
} 

export interface User {
    name: string
    password: number | string,
    id: number
    email: string
}