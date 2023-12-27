import { Stack, Typography, Button, useMediaQuery, Theme, IconButton, Tooltip } from '@mui/material'
import { PageHeaderProps } from './PageHeader.type'
import { style } from './PageHeader.style'
import { MdLogout } from 'react-icons/md'
import { handleLogout } from '@/utils/auth.util'



export default function PageHeader(props: PageHeaderProps) {
  const { heading, ActionButtons } = props
  const isMdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))


  return (
    <Stack className='my-lg' sx={style.root}>

      {/* === Heading & Action Buttons */}
      <Stack sx={style.leftBox}>
        <Typography variant='h2'>{heading}</Typography>
        {ActionButtons}
      </Stack>


      {/* === Logout === */}
      <Stack>
        {isMdDown ?
          <Tooltip title='Logout'>
            <IconButton edge='end' onClick={handleLogout}><MdLogout /></IconButton>
          </Tooltip>
          :
          <Button color='inherit' onClick={handleLogout} endIcon={<MdLogout />}>Logout</Button>
        }
      </Stack>

    </Stack>
  )
}
