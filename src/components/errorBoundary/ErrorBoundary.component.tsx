import { Component, ErrorInfo } from "react"
import { Box, Container, Stack, Typography, Button } from "@mui/material"
import { ErrorBoundaryProps, ErrorBoundaryState } from "./ErrorBoundary.interface"
import i18n from '@/locales/i18n'



export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: props.isError || false }
  }

  static getDerivedStateFromError(_: Error): Partial<ErrorBoundaryState> {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box textAlign='center' my={10}>
          <Stack component={Container} alignItems='center'>
            <Typography variant='subtitle'>{i18n.t('errorMessage.somethingWentWrong')}</Typography>
            <Button variant='contained' onClick={() => window.location.reload()} sx={{ mt: 2, px: 5 }}>{i18n.t('common.tryAgain')}</Button>
          </Stack>
        </Box>
      )
    }

    return this.props.children
  }
}
