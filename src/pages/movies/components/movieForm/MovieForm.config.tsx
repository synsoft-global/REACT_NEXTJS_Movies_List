import { fileSizeTest } from '@/utils'
import i18n from '@/locales/i18n'
import * as yup from 'yup'



export const formSchema = yup.object({
  title: yup.string().trim().required().min(2).max(250),
  publishingYear: yup.number().typeError(i18n.t('errorMessage.required')).required().min(1800).max(new Date().getFullYear()),
  image: yup.mixed<File | string>().required().test('fileSize', i18n.t('errorMessage.largeFile').replace('{{size}}', '2MB'), value => fileSizeTest({ value, imageSize: 2 })),
})


export type FormSchemaType = yup.InferType<typeof formSchema>