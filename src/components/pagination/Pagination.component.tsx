import { Pagination as MuiPagination, PaginationItem, PaginationProps } from '@mui/material'
import { useTranslation } from 'react-i18next'



export default function Pagination(props: PaginationProps) {
  const { t } = useTranslation()

  return (
    <MuiPagination
      {...props}
      renderItem={(item) => (
        <PaginationItem
          slots={{ previous: () => t('common.prev'), next: () => t('common.next') }}
          {...item}
        />
      )}
    />
  )
}
