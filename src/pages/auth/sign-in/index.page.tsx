import { Container } from '@mui/material'
import { Page } from '@/types/Page.type'
import SignInForm from './components/signInForm/SignInForm.component'



const SignIn: Page = () => {
  return <>
    <style global jsx>{`
        #__next > *{
          flex:1
        }
        
        main{
          display:flex;
          justify-content:center;
          align-items:center;
          margin:var(--spacing) 0;
        }
        footer{
          margin-top:0 !important
        }
    `}</style>

    <Container  >
      <SignInForm />
    </Container>
  </>
}


SignIn.layoutProps = {
  pageType: 'auth',
  title: 'Sign In',
}


export default SignIn