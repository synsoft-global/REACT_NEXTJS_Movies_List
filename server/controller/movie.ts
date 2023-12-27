/**
 * Description: movies.ts is controller file to perform CRUD operations.
 * Version: 1.0.0
 * Author: Synsoft Global
 * Author URI: https://www.synsoftglobal.com/
 *
 */


import { Request, Response } from 'express'
import { Movies } from '../interface/interface'
import { movieFileRead, writeImageFile, writeInMovieFile } from '../service/movie.service'
import { t } from '../service/locales.service'


/**
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<JsonResponse>}
 * @throws SOMETHING_WENT_WRONG
 */
export const addMovie = async (req: Request, res: Response) => {
    try {

        let imageDetails: any
        const { title, publishingYear, user } = req.body as { title: string; publishingYear: string; user?: { id: number } }

        const rawData = await movieFileRead()

        if (rawData.message !== 'Success') return res.status(401).json(rawData)
        const movieData = JSON.parse(rawData.movieList)
        if (req?.file) {
            imageDetails = await writeImageFile(req)
        }
        const id = new Date().getTime().toString()

        const newMovie = {
            id: id,
            title,
            publishingYear,
            image: req?.file ? `${process.env.SERVER_DOMAIN}uploads/${imageDetails.originalname}` : '',
            userID: user?.id
        }

        movieData.push(newMovie)

        // Decode Base64 and save the image
        const response = await writeInMovieFile(movieData)
        if (response.message !== 'Success') return res.status(500).json({ message: t('message', 'SOMETHING_WENT_WRONG') })
        else return res.status(201).json({ movie: newMovie })
    } catch (error) {
        console.log('error', error);

        return res.status(500).json({ message: t('message', 'SOMETHING_WENT_WRONG') })
    }
}

/**
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<JsonResponse>}
 * @throws MOVIE_UPDATED_MESSAGE
 * @throws SOMETHING_WENT_WRONG
 */
export const updateMovie = async (req: Request, res: Response) => {
    const { id } = req.body
    try {
        const jsonData: any = await movieFileRead()

        if (jsonData.message !== 'Success') return res.status(401).json(jsonData)
        const movies: any = JSON.parse(jsonData.movieList)

        const index: number = movies.findIndex((item: Movies) => item.id === id)

        if (index !== -1) {
            delete req?.body?.user
            if (req?.file) {
                delete req?.body?.image
                const imageDetails = await writeImageFile(req)
                movies[index] = { ...movies[index], ...req?.body, image: `${process.env.SERVER_DOMAIN}uploads/${imageDetails.originalname}` }
            } else movies[index] = { ...movies[index], ...req?.body }

            const response = await writeInMovieFile(movies)
            if (response.message !== 'Success') return res.status(500).json({ message: t('message', 'SOMETHING_WENT_WRONG') })
            else return res.status(201).json({ message: t('message', 'MOVIE_UPDATED_MESSAGE') })
        } else {
            res.status(500).json({ message: t('message', 'SOMETHING_WENT_WRONG') })
        }
    } catch (error: any) {
        console.error(`Error updating movie: ${error.message}`)
        res.status(500).json({ message: t('message', 'SOMETHING_WENT_WRONG') })
    }
}


/**
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<JsonResponse>}
 * @throws SOMETHING_WENT_WRONG
 */
export const deleteMovie = async (req: Request, res: Response) => {
    const { id } = req?.body
    const rawData = await movieFileRead()
    if (rawData.message !== 'Success') return res.status(401).json(rawData)

    const movieData = JSON.parse(rawData.movieList)

    const newJson = movieData.filter((a: any) => a.id !== id)

    const response = await writeInMovieFile(newJson)
    if (response.message !== 'Success') return res.status(500).json({ message: t('message', 'SOMETHING_WENT_WRONG') })
    else return res.status(201).json({ message: t('message', 'MOVIE_DELETED_MESSAGE') })
}


/**
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<JsonResponse>}
 * @throws SOMETHING_WENT_WRONG
 */
export const movieList = async (req: Request, res: Response) => {
    const page: any = req?.query?.page || 1
    let pageSize: any = req?.query?.pageSize || 10

    if (pageSize <= 0) pageSize = 10
    const { user } = req.body
    const data: any = await movieFileRead()

    if (data.message !== 'Success') return res.status(401).json(data)

    try {
        const movies = JSON.parse(data.movieList)
        const userMovies = movies.filter((movie: any) => movie.userID === user.id)
        // if (userMovies.length === 0) return res.status(200).json({ message: t('message', 'NO_DATA_FOUND') })
        const startIndex = (page - 1) * pageSize
        const endIndex = startIndex + pageSize
        const validEndIndex = Math.min(endIndex, userMovies.length)
        const paginatedMovies = userMovies.slice(startIndex, validEndIndex)
        
        res.json({
            totalMovies: userMovies.length,
            currentPage: page,
            pageSize: pageSize,
            totalPages: Math.ceil(userMovies.length / pageSize),
            movies: paginatedMovies,
        })
    } catch (error) {
        console.log('err', error);

        res.status(500).json({ message: t('message', 'SOMETHING_WENT_WRONG') })
    }
}

/**
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<JsonResponse>}
 * @throws SOMETHING_WENT_WRONG
 */
export const getMovie = async (req: Request, res: Response) => {
    const id: any = req?.params?.movieId
    const { user } = req.body
    const data: any = await movieFileRead()

    if (data.message !== 'Success') return res.status(401).json(data)

    try {
        const movies = JSON.parse(data.movieList)
        const userMovies = movies.filter((movie: any) => movie.userID === user.id && movie.id == id)
        if (userMovies.length == 0) {
            res.status(400).json({ message: t('message', 'NO_DATA_FOUND') })
        } else {
            res.json({
                movie: userMovies[0],
            })
        }

    } catch (error) {
        console.log('err', error);
        res.status(500).json({ message: t('message', 'SOMETHING_WENT_WRONG') })
    }
}
