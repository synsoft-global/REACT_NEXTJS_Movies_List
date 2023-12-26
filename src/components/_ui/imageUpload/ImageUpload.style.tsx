import { Style } from '@/types/Style.type'



export const style: Style = {
  root: {
    fieldset: { display: 'none' }
  },
  box: {
    width: 1,
    border: '2px dashed #fff',
    borderRadius: 1,
    bgcolor: 'background.input',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  uploadBox: {
    p: 2,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    gap: 1,
    py: { xs: '158px', md: '224px' },
    '.upload-icon': {
      fontSize: 'h4.fontSize'
    }
  },
  thumbnail: {
    width: '100%',
    objectFit: 'contain',
    height: 'auto',
    maxHeight: 'calc(100vh - 150px)'
  }
}