import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { MovieFormProps } from './MovieForm.type'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormSchemaType, formSchema } from './MovieForm.config'
import { LoadingButton } from '@mui/lab'
import { useRouter } from 'next/router'
import { useAddMovieMutation, useUpdateMovieMutation } from '@/redux/apis/movie.api'
import Link from 'next/link'
import ImageUpload from '@/components/_ui/imageUpload/ImageUpload.component'
import toast from 'react-hot-toast'



export default function MovieForm(props: MovieFormProps) {
  const { mode, data } = props
  const router = useRouter()
  const [addMovie] = useAddMovieMutation()
  const [updateMovie] = useUpdateMovieMutation()


  const { control, handleSubmit, setValue, watch, getValues, trigger, formState: { isSubmitting, errors } } = useForm<FormSchemaType>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      ...(mode === 'add' ?
        {
          title: '',
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
      toast.success('Movie added')
    }
    else {
      await updateMovie(formData as any)
      toast.success('Movie updated')
    }
    router.push('/movies')
  }


  return (
    <Stack component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid alignItems='start' container spacing={{ xs: 5, md: 15 }}>

        {/* === Thumbnail Upload === */}
        <Grid item xs={12} md={6}>
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
        <Grid container item spacing={3} xs={12} md={6}>

          {/* --- Title --- */}
          <Grid item xs={12}>
            <Controller name='title' control={control}
              render={({ fieldState: { error }, field }) =>
                <TextField {...field} placeholder='Title' error={!!error} helperText={error?.message} />
              }
            />
          </Grid>

          {/* --- Publishing Year --- */}
          <Grid item xs={6}>
            <Controller name='publishingYear' control={control}
              render={({ fieldState: { error }, field }) =>
                <TextField {...field} placeholder='Publishing year' type='number' error={!!error} helperText={error?.message} onChange={({ target: { value } }) => field.onChange(value ? value : undefined)} />
              }
            />
          </Grid>

          {/* --- Submit & Cancel --- */}
          <Grid item xs={12}>
            <Stack direction='row' gap={2} mt={5}>
              <Button fullWidth variant='outlined' color='inherit' component={Link} href='/movies'>Cancel</Button>
              <LoadingButton fullWidth variant='contained' type='submit' loading={isSubmitting}>Submit</LoadingButton>
            </Stack>
          </Grid>

        </Grid>
      </Grid>
    </Stack>
  )
}
