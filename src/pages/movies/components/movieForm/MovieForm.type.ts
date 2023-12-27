import { MovieDTO } from "@/dtos/Movie.dto"



export type MovieFormProps =
  {
    mode: 'add'
    data?: void
  }
  |
  {
    mode: 'edit',
    data: MovieDTO
  }