import * as yup from 'yup'
import i18n from '@/locales/i18n'



export const formSchema = yup.object({
  email: yup.string().trim().email().required().max(150),
  password: yup.string().required().min(6, i18n.t('errorMessage.invalidPassword')).max(150),
})


export type FormSchemaType = yup.InferType<typeof formSchema>