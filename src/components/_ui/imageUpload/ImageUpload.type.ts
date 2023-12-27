import { ChangeEvent } from 'react'



export type ImageUploadProps = {
  helperText?: string
  onChange?: (file: File) => void
  defaultImage: string | undefined
}