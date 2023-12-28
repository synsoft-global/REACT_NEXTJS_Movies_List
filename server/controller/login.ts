/**
 * Description: login.ts file carries controlleer login which allows user to login and get token.
 * Version: 1.0.0
 * Author: Synsoft Global
 * Author URI: https://www.synsoftglobal.com/
 *
 */


import { Request, Response } from 'express'

import { createToken, loginUser } from '../service/login.service'
import { t } from "../service/locales.service"


/**
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<"LOGIN_SUCCESS_MESSAGE">}
 * @throws INVALID_CREDENTIALS
 */
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await loginUser(email, password)

    if (user) {
        const token = await createToken(user)
        return res.status(200).json({ message: t('message', 'LOGIN_SUCCESS_MESSAGE'), token: token })
    } else {
        return res.status(401).json({ message: t('message', 'INVALID_CREDENTIALS') })
    }
}