import { fileSizeTest } from '@/utils'
import * as yup from 'yup'



export const formSchema = yup.object({
  title: yup.string().trim().required().min(2).max(250),
  publishingYear: yup.number().typeError('Required *').required().min(1800).max(new Date().getFullYear()),
  image: yup.mixed<File | string>().required().test('fileSize', 'File size can be up to 2MB', value => fileSizeTest({ value, imageSize: 2 })),
})


export type FormSchemaType = yup.InferType<typeof formSchema>