import type { PageLayoutProps } from '@/pages/_app.type'


export interface Page extends React.FC {
  layoutProps: PageLayoutProps
}