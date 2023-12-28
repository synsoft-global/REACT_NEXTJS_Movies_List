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
import { Movies } from '../interface/interface'
import MoviesModel from '../mongodb/models/movie.model'

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
    const imageName = new Date().getTime().toString()
    const mimetype = data.file?.mimetype
    const fileType = mimetype.split('/')
    const imagePath = path.join(__dirname, '../uploads', `${imageName}.${fileType[1]}`)
    const base64Data: any = data?.file?.buffer.toString('base64')
    const decodedImage = Buffer.from(base64Data, 'base64')
    await fs.writeFileSync(imagePath, decodedImage)
    const imageData = { mimetype: mimetype, imagePath: imagePath, originalname: `${imageName}.${fileType[1]}` }
    return imageData
}

export const insertMovie = async (movieData: any): Promise<object> => {
    try {
        const movie = await MoviesModel.create(movieData)
        return { message: 'Success', movie: movie.toObject() }
    } catch (error) {
        console.error('Error inserting movie:', error)
        return { message: 'Error' }
    }
}


export const getMoviesByUserId = async (userID: string, page: number = 1, pageSize: number = 5): Promise<{ movies: Movies[]; totalMovies: number } | null> => {
    try {
        if (page <= 0 || pageSize <= 0) {
            console.log('Invalid page or pageSize provided.')
            return null
        }

        const [totalMovies, movies] = await Promise.all([
            MoviesModel.countDocuments({ userID: userID }),
            MoviesModel.find({ userID: userID }).skip((page - 1) * pageSize).limit(pageSize).lean(),
        ])

        if (page > Math.ceil(totalMovies / pageSize)) {
            console.log('Requested page exceeds available pages.')
            return null
        }

        return { movies, totalMovies }
    } catch (error) {
        console.error('Error fetching movies by user ID:', error)
        return null
    }
}

export const movieById = async (_id: any): Promise<Movies | object> => {
    let data: any
    try {
        const movie = await MoviesModel.findById(_id)
        if ((movie === null)) data = { message: 'MOVIE_NOT_FOUND' }
        else data = { movie: movie, message: 'Success' }
        return data
    } catch (error) {
        return data = { error: error, message: 'SOMETHING_WENT_WRONG' }
    }
}

export const updateData = async (movieId: string, updatedFields: Partial<Movies>): Promise<Movies | object> => {
    let data: object
    try {
        const updatedMovie = await MoviesModel.findOneAndUpdate({ _id: movieId }, updatedFields)
        data = { message: 'Success', movie: updatedMovie }
    } catch (error) {
        console.error('Error updating movie:', error)
        data = { message: 'SOMETHING_WENT_WRONG', error: error }
    }
    return data
}

export const unLinkFile = async (imageName: string = '') => {
    const imagePath = path.join(__dirname, '../uploads', imageName)
    await fs.unlinkSync(imagePath)
}

export const deleteData = async (movieId: string): Promise<object> => {
    let data: object
    try {

        const movieToDelete = await MoviesModel.findById(movieId)

        if (!movieToDelete) {
            return data = { message: 'MOVIE_NOT_FOUND' }
        }
        const result = await MoviesModel.deleteOne({ _id: movieId })

        if (result.deletedCount === 1) {
            data = { message: 'MOVIE_DELETED_MESSAGE' }
            await unLinkFile(movieToDelete.name)
        }
        else data = { message: 'MOVIE_NOT_FOUND' }
    } catch (error) {
        console.error('Error deleting movie:', error)
        data = { message: 'SOMETHING_WENT_WRONG', error: error }
    }
    return data
}