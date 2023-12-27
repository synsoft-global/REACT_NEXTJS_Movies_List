import { Style } from '@/types/Style.type'



export const style: Style = {
  container: {
    flex: 1,
    display: 'flex',
    flexFlow: 'column',
  },
  noRecord: {
    alignItems: 'center',
    gap: 5,
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
  },
  addNewButton: {
    width: { xs: 1, sm: 'auto' }
  }
}