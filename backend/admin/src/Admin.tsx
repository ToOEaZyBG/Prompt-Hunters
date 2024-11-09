import { Admin, Resource, CustomRoutes } from 'react-admin';
import { Route } from 'react-router-dom';
import { dataProvider } from './dataProvider';
import authProvider from './authProvider';
import { theme } from './theme';
import { AdminLayout } from './components/layout/AdminLayout';
import Dashboard from './pages/Dashboard';
import { UserList, UserEdit, UserCreate } from './pages/users';
import { PromptList, PromptEdit, PromptCreate } from './pages/prompts';

export const AdminApp = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    theme={theme}
    layout={AdminLayout}
    dashboard={Dashboard}
    requireAuth
  >
    <CustomRoutes>
      <Route path="/" element={<Dashboard />} />
    </CustomRoutes>
    <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
      create={UserCreate}
    />
    <Resource
      name="prompts"
      list={PromptList}
      edit={PromptEdit}
      create={PromptCreate}
    />
  </Admin>
); 