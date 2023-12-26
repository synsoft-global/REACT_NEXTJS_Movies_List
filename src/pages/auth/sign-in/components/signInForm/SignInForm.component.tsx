import { Checkbox, FormControl, FormControlLabel, Stack, TextField, Typography } from '@mui/material'
import { style } from './SignInForm.style'
import { Controller, useForm } from 'react-hook-form'
import { FormSchemaType, formSchema } from './SignInForm.config'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLoginMutation } from '@/redux/apis/auth.api'
import { setCookie } from '@/utils'



export default function SignInForm() {
  const { t } = useTranslation()
  const [rememberMe, setRememberMe] = useState(false)
  const [login, { data, isSuccess }] = useLoginMutation()


  const { control, handleSubmit, formState: { isSubmitting } } = useForm<FormSchemaType>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })


  useEffect(() => {
    if (isSuccess && data) {
      setCookie('token', data.token, rememberMe ? 30 : 1)
      window.location.replace('/')
    }
  }, [isSuccess, data])


  const handleRememberMe = (event: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked)
  }


  const onSubmit = async (formData: FormSchemaType) => {
    await login(formData)
  }


  return (
    <Stack component='form' noValidate sx={style.root} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant='h1' sx={style.heading}>{t('pages.signIn.heading')}</Typography>
      <Stack gap={3}>

        {/* === Email === */}
        <Controller name='email' control={control}
          render={({ fieldState: { error }, field }) =>
            <TextField {...field} placeholder='Email' type='email' error={!!error} helperText={error?.message} />
          }
        />


        {/* === Password === */}
        <Controller name='password' control={control}
          render={({ fieldState: { error }, field }) =>
            <TextField {...field} placeholder='Password' type='password' error={!!error} helperText={error?.message} />
          }
        />


        {/* === Remember Me === */}
        <Stack alignItems='center'>
          <FormControl>
            <FormControlLabel
              control={<Checkbox checked={rememberMe} onChange={handleRememberMe} />}
              label={<Typography variant='body2'>Remember me</Typography>}
            />
          </FormControl>
        </Stack>


        {/* === Submit === */}
        <LoadingButton variant='contained' type='submit' loading={isSubmitting}>Login</LoadingButton>

      </Stack>
    </Stack>
  )
}