import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { createSwaggerSpec } from 'next-swagger-doc'
import dynamic from 'next/dynamic'
import docJson from "../../openapi.json"
import 'swagger-ui-react/swagger-ui.css'


interface SwaggerUIProps { spec: Record<string, any> }
const DynamicSwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });
const SwaggerUI: React.FC<SwaggerUIProps> = ({ spec }) => <DynamicSwaggerUI spec={spec} />



export default function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <>
    <style>{`
      :root{color-scheme: none}
      body{background-color:white}
    `}</style>
    <SwaggerUI spec={spec} />
  </>
}



export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec(docJson)

  return {
    props: { spec },
  }
}