/**
* Description: middleware.ts has functionality to check for valid parameters if available or not.
* Version: 1.0.0
* Author: Synsoft Global
* Author URI: https://www.synsoftglobal.com/
*
*/

import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import multer from 'multer'
import { validateToken } from '../service/login.service'
import { movieById } from '../service/movie.service'
import { t } from '../service/locales.service'

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ message: t('message', 'INVALID_EMAIL') })
    next()
}


export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if (!token) return res.status(401).json({ message: t('message', 'ACCESS_DENIED') })

    const response: any = await validateToken(token)

    if (response?.message !== "Success") return res.status(403).json({ message: t('message', 'ACCESS_DENIED') })
    else {
        req.body.user = response.user
        next()
    }
}

export const isIdAvailable = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body?.id || req.params?.movieId
    if (!id) return res.status(401).json({ message: t('message', 'PROVIDE_MOVIE_ID') })
    next()
}
export const isMovieAvailable = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body?.id || req.params?.movieId
    const rawData: any = await movieById(id)
    if (rawData.message !== "Success") return res.status(401).json({ message: t('message', rawData.message) })
    next()
}

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });