import { MovieDTO } from "@/dtos/Movie.dto"



export type MovieFormProps = {
  mode: 'add' | 'edit',
  data: MovieDTO
}