import { createTheme, Theme } from '@mui/material'



/* Typography & Palette
======================== */
let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#2BD17E', contrastText: '#fff' },
    error: { main: '#EB5757' },
    text: { primary: '#fff' },
    background: { default: '#093545', paper: '#092C39', input: '#224957' }
  },
  typography: {
    fontFamily: 'var(--body-font)',
    h1: { fontSize: '4rem', lineHeight: 1.25, fontWeight: 600 },
    h2: { fontSize: '3rem', lineHeight: 1.166667, fontWeight: 600 },
    h3: { fontSize: '2rem', lineHeight: 1.25, fontWeight: 600 },
    h4: { fontSize: '1.5rem', lineHeight: 1.333333, fontWeight: 700 },
    h5: { fontSize: '1.25rem', lineHeight: 1.2, fontWeight: 700 },
    h6: { fontSize: '1rem', lineHeight: 1.5, fontWeight: 700 },
    body1: { fontSize: '1rem', lineHeight: 1.5, fontWeight: 400 },
    body2: { fontSize: '0.875rem', lineHeight: 1.714285, fontWeight: 400 },
    body3: { fontSize: '0.75rem', lineHeight: 2, fontWeight: 400 },
    caption: { fontSize: '0.875rem', lineHeight: 1.142859, fontWeight: 400 },
    subtitle: { fontSize: '1.25rem', lineHeight: 1.6, fontWeight: 400 },
    subtitle1: undefined,
    subtitle2: undefined,
    overline: undefined
  },
  shape: {
    borderRadius: 10
  }
})



/* Responsive
======================== */
theme = createTheme(theme, {
  typography: {
    h1: {
      [theme.breakpoints.down('md')]: { fontSize: '3rem' }
    },
    h2: {
      [theme.breakpoints.down('md')]: { fontSize: '2rem' }
    },
    subtitle: {
      [theme.breakpoints.down('md')]: { fontSize: '1rem' }
    }
  }
})



/* Components
======================== */
theme = createTheme(theme, {
  components: {
    MuiContainer: {
      styleOverrides: {
        root: theme.unstable_sx({
          maxWidth: { xs: 'min(100%, 1248px)' }
        })
      }
    },
    MuiGrid: {
      defaultProps: {
        spacing: theme.unstable_sx({ xs: 2, md: 3 })
      }
    },
    MuiTypography: {
      defaultProps: {
        variant: 'body2'
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: theme.unstable_sx({
          bgcolor: 'background.input',
          fontSize: 'body2.fontSize',
          'input::placeholder': { opacity: 1 }
        })
      }
    },
    MuiTextField: {
      defaultProps: { size: 'medium', fullWidth: true },
      styleOverrides: {
        root: ({ ownerState }) => theme.unstable_sx({
          fieldset: { borderWidth: '1px !important', borderColor: 'background.input' },
          '.Mui-focused': {
            color: 'background.input',
            fieldset: { borderColor: `${theme.palette.background.input} !important` },
            '&.MuiInputBase-root': { bgcolor: '#fff' },
            '.MuiInputBase-input': { caretColor: theme.palette.background.input },
          },
          '.Mui-error': {
            color: 'error.main',
            fieldset: { borderColor: `${theme.palette.error.main} !important` },
            '.MuiInputBase-input': { caretColor: theme.palette.error.main },
          },
          ...(ownerState.size === 'medium' && {
            '.MuiInputBase-input': { px: '16px', py: '11px' }
          }),
        })
      }
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: ({ ownerState }) => theme.unstable_sx({
          textTransform: 'unset',
          ...(ownerState.size === 'medium' && {
            p: '16px 28px', typography: 'body1', fontWeight: 700,
          })
        })
      }
    }
  }
} as Theme)



/* Typescript
======================== */
declare module '@mui/material/styles' {
  interface TypeBackground {
    input: string
  }
  interface TypographyVariants {
    body3: React.CSSProperties
    subtitle: React.CSSProperties
  }
  interface TypographyVariantsOptions {
    body3?: React.CSSProperties
    subtitle: React.CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true
    subtitle: true
    subtitle1: false
    subtitle2: false
    overline: false
  }
}



export { theme }