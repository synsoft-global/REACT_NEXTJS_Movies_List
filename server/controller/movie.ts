/**
 * Description: movies.ts is controller file to perform CRUD operations.
 * Version: 1.0.0
 * Author: Synsoft Global
 * Author URI: https://www.synsoftglobal.com/
 *
 */


import { Request, Response } from 'express'
import { deleteData, getMoviesByUserId, insertMovie, movieById, unLinkFile, updateData, writeImageFile } from '../service/movie.service'
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
        const { title, publishingYear, user } = req.body as { title: string; publishingYear: string; user: { _id: string } }

        if (req?.file) {
            imageDetails = await writeImageFile(req)
        }

        const newMovie = {
            title,
            publishingYear,
            image: req?.file ? `${process.env.SERVER_DOMAIN}uploads/${imageDetails.originalname}` : '',
            userID: user._id,
            name: imageDetails.originalname
        }
        const response: any = await insertMovie(newMovie)
        if (response.message !== 'Success') return res.status(500).json({ message: t('message', 'SOMETHING_WENT_WRONG') })
        else return res.status(201).json({ movie: newMovie })
    } catch (error) {
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
    let response: any
    try {
        delete req?.body?.user
        if (req.file) {
            const imageDetails = await writeImageFile(req)
            response = await updateData(id, { ...req.body, image: `${process.env.SERVER_DOMAIN}uploads/${imageDetails.originalname}` })
            await unLinkFile(response.movie.name)
        } else response = await updateData(id, req.body)
        if (response.message !== 'Success') return res.status(500).json({ message: t('message', response.message) })
        else return res.status(201).json({ message: t('message', 'MOVIE_UPDATED_MESSAGE') })
    } catch (error: any) {
        console.error(`Error updating movie: ${error.message}`)
        res.status(500).json({ message: t('message', response.message) })
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
    const response: any = await deleteData(id)
    if (response.message !== 'Success') return res.status(500).json({ message: t('message', response.message) })
    else return res.status(201).json({ message: t('message', response.message) })
}


/**
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<JsonResponse>}
 * @throws SOMETHING_WENT_WRONG
 */
export const movieList = async (req: Request, res: Response) => {
    const page: any = req?.query?.page || 1
    let pageSize: any = req?.query?.pageSize || 5
    try {
        const response: any = await getMoviesByUserId(req.body.user, page, pageSize)
        return res.json({
            totalMovies: response?.totalMovies > 0 ? response?.totalMovies : 0,
            currentPage: page,
            pageSize: pageSize,
            totalPages: response?.totalMovies > 0 ? Math.ceil(response?.totalMovies / pageSize) : 1,
            movies: response?.movies.length > 0 ? response?.movies : [],
        })
    } catch (error) {
        return res.status(500).json({ message: t('message', 'SOMETHING_WENT_WRONG') })
    }
}

/**
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<JsonResponse>}
 * @throws SOMETHING_WENT_WRONG
 */
export const getMovie = async (req: Request, res: Response) => {
    const { movieId }: any = req?.params
    try {
        const movies: any = await movieById(movieId)
        console.log(movies);
        if (Object.keys(movies)?.length == 0) return res.status(400).json({ message: t('message', 'MOVIE_NOT_FOUND') })
        else return res.json(movies)
    } catch (error) {
        return res.status(500).json({ message: t('message', 'SOMETHING_WENT_WRONG') })
    }
}
