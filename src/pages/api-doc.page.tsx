import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import docJson from "../openapi.json";

const DynamicSwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

interface SwaggerUIProps {
  spec: Record<string, any>; // Adjust the type according to your Swagger/OpenAPI specification
}

const SwaggerUI: React.FC<SwaggerUIProps> = ({ spec }) => {
  return <DynamicSwaggerUI spec={spec} />;
};

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