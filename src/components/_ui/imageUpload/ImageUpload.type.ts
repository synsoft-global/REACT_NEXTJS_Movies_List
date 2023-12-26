import { ChangeEvent } from 'react'



export type ImageUploadProps = {
  helperText?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  defaultImage: string | undefined
}