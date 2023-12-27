import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { createSwaggerSpec } from 'next-swagger-doc'
import dynamic from 'next/dynamic'
import docJson from '@/data/openapi.json'
import 'swagger-ui-react/swagger-ui.css'
const SwaggerUI = dynamic<{ spec: any }>(import('swagger-ui-react'), { ssr: false })



export default function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {

  return <>
    <style global jsx>{`
      :root{color-scheme: none}
      body{background-color:white}
    `}</style>
    <SwaggerUI spec={spec} />
  </>
}



export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec(docJson)

  return {
    props: { spec }
  }
}