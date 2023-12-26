import { Style } from '@/types/Style.type'
import footerBg from '@/../public/footer-bg.svg'



export const style: Style = {
  root: {
    mt: '109px',
    minHeight: 111,
    backgroundImage: `url(${footerBg.src})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'left bottom',
  }
}