import { Stack, Typography, Button } from '@mui/material'
import { PageHeaderProps } from './PageHeader.type'
import { style } from './PageHeader.style'
import { MdLogout } from 'react-icons/md'
import { handleLogout } from '@/utils/auth.util'



export default function PageHeader(props: PageHeaderProps) {
  const { heading, ActionButtons, logout } = props


  return (
    <Stack className='my-lg' sx={style.root}>
      <Stack direction='row' alignItems='center' gap={1.5}>
        <Typography variant='h2'>{heading}</Typography>
        {ActionButtons}
      </Stack>
      <Stack>
        {logout && <Button color='inherit' onClick={handleLogout} endIcon={<MdLogout />}>Logout</Button>}
      </Stack>
    </Stack>
  )
}
