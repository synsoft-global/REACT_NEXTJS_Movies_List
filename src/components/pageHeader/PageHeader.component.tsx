import { Stack, Typography, Button, useMediaQuery, Theme, IconButton, Tooltip } from '@mui/material'
import { PageHeaderProps } from './PageHeader.type'
import { style } from './PageHeader.style'
import { MdLogout } from 'react-icons/md'
import { handleLogout } from '@/utils/auth.util'
import { useTranslation } from 'react-i18next'



export default function PageHeader(props: PageHeaderProps) {
  const { t } = useTranslation()
  const { heading, ActionButtons } = props
  const isMdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))


  return (
    <Stack className='my-lg' sx={style.root}>

      {/* === Heading & Action Buttons */}
      <Stack sx={style.leftBox}>
        <Typography variant='h2'>{t(heading)}</Typography>
        {ActionButtons}
      </Stack>


      {/* === Logout === */}
      <Stack>
        {isMdDown ?
          <Tooltip title={t('layout.header.logout')}>
            <IconButton edge='end' onClick={handleLogout}><MdLogout /></IconButton>
          </Tooltip>
          :
          <Button color='inherit' onClick={handleLogout} endIcon={<MdLogout />}>{t('layout.header.logout')}</Button>
        }
      </Stack>

    </Stack>
  )
}
