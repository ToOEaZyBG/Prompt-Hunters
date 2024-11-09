import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  PasswordInput,
  required,
  email,
  useNotify,
  useRedirect,
} from 'react-admin';
import { Card } from '@mui/material';

const validateEmail = [required(), email()];
const validateRequired = [required()];

const roleChoices = [
  { id: 'super_admin', name: 'Super Admin' },
  { id: 'admin', name: 'Admin' },
  { id: 'user', name: 'User' },
];

export const UserCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect();

  const onSuccess = () => {
    notify('User created successfully');
    redirect('list', 'users');
  };

  return (
    <Create mutationOptions={{ onSuccess }}>
      <SimpleForm>
        <Card sx={{ padding: 2, marginBottom: 2, borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <TextInput source="email" validate={validateEmail} fullWidth />
          <TextInput source="first_name" validate={validateRequired} />
          <TextInput source="last_name" validate={validateRequired} />
          <SelectInput source="role" choices={roleChoices} validate={validateRequired} />
          <PasswordInput source="password" validate={validateRequired} />
        </Card>
      </SimpleForm>
    </Create>
  );
}; 