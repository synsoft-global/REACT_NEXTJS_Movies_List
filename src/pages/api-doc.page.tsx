import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import docJson from "../openapi.json";

const SwaggerUI = dynamic<{
  spec: any;
}>(import('swagger-ui-react'), { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (<>
    <style>{`
      :root{color-scheme: none;}
      body{background-color:white;}
    `}</style>
    <SwaggerUI spec={spec} />
  </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec(docJson);

  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;