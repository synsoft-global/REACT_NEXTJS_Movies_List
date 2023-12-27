import { Html, Head, Main, NextScript } from 'next/document'
import config from '@/config/config.json'



export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel='shortcut icon' type='image/x-icon' href={`${config.basePath}/favicon.ico`} />
        <link rel='apple-touch-icon' sizes='180x180' href={`${config.basePath}/apple-touch-icon.png`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
