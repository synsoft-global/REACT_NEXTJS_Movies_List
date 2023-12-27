import { Pagination as MuiPagination, PaginationItem, PaginationProps } from '@mui/material'



export default function Pagination(props: PaginationProps) {

  return (
    <MuiPagination
      {...props}
      renderItem={(item) => (
        <PaginationItem
          slots={{ previous: () => 'Prev', next: () => 'Next' }}
          {...item}
        />
      )}
    />
  )
}
