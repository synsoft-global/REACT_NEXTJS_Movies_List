import { Container } from '@mui/material'
import { Page } from '@/types/Page.type'
import { style } from './SignIn.style'
import SignInForm from './components/signInForm/SignInForm.component'



const SignIn: Page = () => {

  return <>
    <style global jsx>{`
      #__next > *{flex:1}
      footer{margin-top:0 !important}
    `}</style>

    <Container className='center' sx={style.container}>
      <SignInForm />
    </Container>
  </>
}


SignIn.layoutProps = {
  pageType: 'auth',
  title: 'Sign In',
}


export default SignIn