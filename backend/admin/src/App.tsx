import { Admin, Resource } from 'react-admin';
import { dataProvider } from './dataProvider';
import authProvider from './authProvider';
import Dashboard from './pages/Dashboard';
import { UserList, UserEdit, UserCreate } from './resources/users';
import { PromptList, PromptEdit, PromptCreate } from './resources/prompts';
import { CategoryList, CategoryEdit, CategoryCreate } from './resources/categories';

const App = () => (
  <Admin
    dashboard={Dashboard}
    dataProvider={dataProvider}
    authProvider={authProvider}
    title="Prompt Hunters Admin"
  >
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
    <Resource 
      name="categories" 
      list={CategoryList} 
      edit={CategoryEdit} 
      create={CategoryCreate} 
    />
  </Admin>
);

export default App;
