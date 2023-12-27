import { Style } from '@/types/Style.type'



export const style: Style = {
  root: {
    p: { sm: 1 },
    bgcolor: 'background.paper',
    transition: 'background-color 0.3s',
    alignItems: 'start',
    borderRadius: 1.2,
    overflow: 'hidden',
    width: 1,
    display: 'flex',
    flexFlow: 'column',
    ':hover': {
      bgcolor: 'background.input',
    },
    '.thumbnail': {
      borderRadius: { sm: 1 },
      width: 1,
      objectFit: 'cover',
      aspectRatio: 1 / 1.5045,
      bgcolor: 'background.input',
      height: 'auto',
    }
  }
}