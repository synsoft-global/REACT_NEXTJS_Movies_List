import { CSSProperties, ChangeEvent, useRef, useState } from 'react'
import { Box, Stack, TextField, Typography } from '@mui/material'
import { ImageUploadProps } from './ImageUpload.type'
import { MdOutlineFileDownload } from 'react-icons/md'
import { style } from './ImageUpload.style'
import Image from 'next/image'



export default function ImageUpload(props: ImageUploadProps) {
  const { helperText, onChange, defaultImage } = props
  const [file, setFile] = useState<File | string | undefined>(defaultImage)
  const fileRef = useRef<HTMLInputElement>()


  return (
    <Stack gap={.5} sx={style.root}>
      <Stack sx={style.box} onClick={() => fileRef.current?.querySelector('input')?.click()}>
        {file ?
          <Image
            src={typeof file === 'string' ? file : URL.createObjectURL(file)}
            style={style.thumbnail as CSSProperties}
            width={266}
            height={400}
            className='thumbnail'
            alt='Movie thumbnail'
          />
          :
          <Stack sx={style.uploadBox}>
            <MdOutlineFileDownload className='upload-icon' />
            <Typography variant='body2'>Drop an image here</Typography>
          </Stack>
        }
      </Stack>

      <TextField
        type='file'
        inputProps={{ accept: 'image/*' }}
        InputProps={{ ref: fileRef }}
        sx={{ input: { display: 'none' } }}
        error={Boolean(helperText)}
        helperText={helperText}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (!event.target.files?.length) return
          setFile(event.target.files?.[0])
          onChange && onChange(event)
        }}
      />
    </Stack>
  )
}
