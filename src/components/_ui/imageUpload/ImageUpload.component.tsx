import { CSSProperties, ChangeEvent, DragEvent, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Stack, TextField, Theme, Typography, useMediaQuery } from '@mui/material'
import { ImageUploadProps } from './ImageUpload.type'
import { MdOutlineFileDownload } from 'react-icons/md'
import { style } from './ImageUpload.style'
import Image from 'next/image'
import toast from 'react-hot-toast'



export default function ImageUpload(props: ImageUploadProps) {
  const { helperText, onChange, defaultImage } = props
  const { t } = useTranslation()
  const [file, setFile] = useState<File | string | undefined>(defaultImage)
  const fileRef = useRef<HTMLInputElement>()
  const [dragOver, setDragOver] = useState(false)
  const isMdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))


  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(true)
  }


  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
  }


  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }


  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) handleChange(file)
    else toast.error(t('components.imageUpload.invalidImageUploaded'))
  }


  const handleChange = (blob: File) => {
    setFile(blob)
    onChange && onChange(blob)
  }


  return (
    <Stack gap={.5} sx={style.root}>
      <Stack
        sx={{ ...style.box, borderColor: (theme) => helperText ? `${theme.palette.error.main} !important` : '#fff' }}
        onClick={() => fileRef.current?.querySelector('input')?.click()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${dragOver ? 'isHover' : ''} center`}
      >
        {file ?
          <Image
            src={typeof file === 'string' ? file : URL.createObjectURL(file)}
            style={style.thumbnail as CSSProperties}
            width={600}
            height={0}
            className='thumbnail'
            alt='Movie thumbnail'
          />
          :
          <Stack sx={style.uploadBox}>
            <MdOutlineFileDownload className='upload-icon' />
            <Typography variant='body2'>
              {isMdDown ?
                t('components.imageUpload.uploadImage')
                :
                dragOver ? t('components.imageUpload.dropHere') : t('components.imageUpload.dropImage')
              }
            </Typography>
          </Stack>
        }
      </Stack>

      <TextField
        type='file'
        inputProps={{ accept: 'image/*' }}
        InputProps={{ ref: fileRef }}
        sx={{ input: { display: 'none' } }}
        error={Boolean(helperText)}
        helperText={t(helperText as string)}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (event.target.files?.[0]) handleChange(event.target.files[0])
        }}
      />
    </Stack>
  )
}
