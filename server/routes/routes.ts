/**
 * Description: router.ts is containing routes for following apis login, addMovie, movieList, updateMovie and deleteMovie.
 * Version: 1.0.0
 * Author: Synsoft Global
 * Author URI: https://www.synsoftglobal.com/
 *
 */


import { Router } from 'express'
import { login } from '../controller/login'
import { check } from 'express-validator'
import { authenticateToken, handleValidationErrors, isMovieAvailable, upload } from '../middleware'
import { addMovie, deleteMovie, movieList, updateMovie, getMovie } from '../controller/movie'
import { t } from '../service/locales.service'


const route = Router()

route.post('/login', [
    check('email').isEmail().withMessage('Invalid email')
],
    handleValidationErrors,
    login
)

route.post('/addMovie', upload.single('image'), authenticateToken, addMovie)
route.get('/getMovie/:movieId', authenticateToken, getMovie)

route.get('/movieList', authenticateToken, movieList)
route.post('/updateMovie', authenticateToken, upload.single('image'), isMovieAvailable, updateMovie)
route.delete('/deleteMovie', authenticateToken, isMovieAvailable, deleteMovie)

export default route
