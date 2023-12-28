import { model, Schema } from 'mongoose'
import { Movies } from '../../interface/interface'



const moviesSchema = new Schema<Movies>({
  title: { type: String, required: true },
  publishingYear: { type: String, required: true },
  image: { type: String, required: false },
  userID: { type: String, required: true },
  name: { type: String, required: true }
})

const MoviesModel = model<Movies>('Movies', moviesSchema)

export default MoviesModel
