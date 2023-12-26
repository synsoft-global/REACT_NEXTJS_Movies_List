/**
* Description: movie.service.ts file contains CRUD functionality for movie.json file.
* Version: 1.0.0
* Author: Synsoft Global
* Author URI: https://www.synsoftglobal.com/
*
*/


import fs from 'fs'
import path from 'path'
import { t } from './locales.service'

const MOVIE_DATA_PATH = path.join(__dirname, '../data', 'movie.json')

export const movieFileRead = async () => {
    let data: any
    const movieList = fs.readFileSync(MOVIE_DATA_PATH, 'utf-8')
    if (movieList.length === 0) data = { message: t('message', 'MOVIE_NOT_FOUND') }
    else data = { message: 'Success', movieList }
    return data
}


export const writeInMovieFile = async (data: any) => {
    let message: any
    try {
        await fs.writeFileSync(MOVIE_DATA_PATH, JSON.stringify(data, null, 2))
        return message = { message: 'Success' }
    } catch (error) {
        return message = { message: 'Error' }
    }
}


export const writeImageFile = async (data: any) => {
    const originalname: any = data.file?.originalname
    const mimetype = data.file?.mimetype
    const imagePath = path.join(__dirname, '../uploads', originalname)
    const base64Data: any = data?.file?.buffer.toString('base64')
    const decodedImage = Buffer.from(base64Data, 'base64')
    await fs.writeFileSync(imagePath, decodedImage)
    const imageData = { mimetype: mimetype, imagePath: imagePath, originalname: originalname }
    return imageData
}