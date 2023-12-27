import { style } from './MovieCard.style'
import { ButtonBase, Stack, Typography } from '@mui/material'
import { MovieCardProps } from './MovieCard.type'
import Image from 'next/image'
import Link from 'next/link'



export default function MovieCard(props: MovieCardProps) {
  const { data, link } = props


  return (
    <ButtonBase href={link} component={Link} sx={style.root}>

      {/* === Thumbnail === */}
      <Image src={data.image} width={266} height={400} className='thumbnail' alt='Movie thumbnail' />


      {/* === Title & Year === */}
      <Stack px={{ xs: 1.5, sm: 1 }} my={{ xs: 1.5, sm: 1 }} gap={{ xs: 2, sm: 1 }} width={1}>
        <Typography variant='subtitle' className='line-1'>{data.title}</Typography>
        <Typography variant='body2'>{data.publishingYear}</Typography>
      </Stack>

    </ButtonBase>
  )
}
