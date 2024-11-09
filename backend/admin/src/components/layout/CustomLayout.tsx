import { Layout, LayoutProps } from 'react-admin';
import { CustomMenu } from './CustomMenu';
import { CustomAppBar } from './CustomAppBar';

export const CustomLayout = (props: LayoutProps) => (
  <Layout
    {...props}
    menu={CustomMenu}
    appBar={CustomAppBar}
    sx={{
      '& .RaLayout-content': {
        padding: 3,
        backgroundColor: '#f5f5f5',
      },
    }}
  />
); 