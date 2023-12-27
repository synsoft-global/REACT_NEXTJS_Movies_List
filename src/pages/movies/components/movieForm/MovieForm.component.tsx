import { Button, Grid, Stack, TextField, Theme, useMediaQuery } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { MovieFormProps } from './MovieForm.type'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormSchemaType, formSchema } from './MovieForm.config'
import { LoadingButton } from '@mui/lab'
import { useRouter } from 'next/router'
import { useAddMovieMutation, useUpdateMovieMutation } from '@/redux/apis/movie.api'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import ImageUpload from '@/components/_ui/imageUpload/ImageUpload.component'
import toast from 'react-hot-toast'



export default function MovieForm(props: MovieFormProps) {
  const { mode, data } = props
  const { t } = useTranslation()
  const router = useRouter()
  const [addMovie] = useAddMovieMutation()
  const [updateMovie] = useUpdateMovieMutation()
  const isSmDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))


  const { control, handleSubmit, setValue, trigger, formState: { isSubmitting, errors } } = useForm<FormSchemaType>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      ...(mode === 'add' ?
        {
          title: '',
          publishingYear: '' as any
        }
        :
        {
          title: data.title,
          image: data.image,
          publishingYear: Number(data.publishingYear)
        }
      )
    }
  })


  const onSubmit = async (data: FormSchemaType) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('publishingYear', String(data.publishingYear))
    formData.append('image', data.image)
    if (mode === 'edit') formData.append('id', router.query.id as string)

    if (mode === 'add') {
      await addMovie(formData as any)
      toast.success(t('pages.moviesList.form.movieAdded'))
    }
    else {
      await updateMovie(formData as any)
      toast.success(t('pages.moviesList.form.movieUpdated'))
    }
    router.push('/movies')
  }


  const SubmitButtons = () => (
    <Stack direction='row' gap={2} mt={5}>
      <Button fullWidth variant='outlined' color='inherit' component={Link} href='/movies'>{t('pages.moviesList.form.cancel')}</Button>
      <LoadingButton fullWidth variant='contained' type='submit' loading={isSubmitting}>
        {mode === 'add' ? t('pages.moviesList.form.submit') : t('pages.moviesList.form.update')}
      </LoadingButton>
    </Stack>
  )


  return (
    <Stack component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid alignItems='start' flexWrap='wrap-reverse' container spacing={{ xs: 3, md: 15 }}>

        {/* === Submit & Cancel Mobile === */}
        {isSmDown &&
          <Grid item xs={12}>
            <SubmitButtons />
          </Grid>
        }


        {/* === Thumbnail Upload === */}
        <Grid item xs={12} sm={6}>
          <ImageUpload
            defaultImage={data?.image}
            helperText={errors.image?.message}
            onChange={(file) => {
              setValue('image', file)
              trigger('image')
            }}
          />
        </Grid>


        {/* === Fields === */}
        <Grid container item spacing={3} xs={12} sm={6}>

          {/* --- Title --- */}
          <Grid item xs={12}>
            <Controller name='title' control={control}
              render={({ fieldState: { error }, field }) =>
                <TextField {...field} placeholder={t('pages.moviesList.form.title')} error={!!error} helperText={t(error?.message as string)} />
              }
            />
          </Grid>

          {/* --- Publishing Year --- */}
          <Grid item xs={12} md={6}>
            <Controller name='publishingYear' control={control}
              render={({ fieldState: { error }, field }) =>
                <TextField {...field} placeholder={t('pages.moviesList.form.publishingYear')} type='number' error={!!error} helperText={t(error?.message as string)} onChange={({ target: { value } }) => field.onChange(value ? value : '')} />
              }
            />
          </Grid>

          {/* --- Submit & Cancel Desktop --- */}
          {!isSmDown &&
            <Grid item xs={12}>
              <SubmitButtons />
            </Grid>
          }

        </Grid>
      </Grid>
    </Stack>
  )
}
