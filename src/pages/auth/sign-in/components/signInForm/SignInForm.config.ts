import * as yup from 'yup'



export const formSchema = yup.object({
  email: yup.string().trim().email().required().max(150),
  password: yup.string().required().min(6, 'Enter valid password').max(150),
})


export type FormSchemaType = yup.InferType<typeof formSchema>