import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  PasswordInput,
  required,
  email,
} from 'react-admin';
import { Card } from '@mui/material';

const validateEmail = [required(), email()];
const validateRequired = [required()];

const roleChoices = [
  { id: 'super_admin', name: 'Super Admin' },
  { id: 'admin', name: 'Admin' },
  { id: 'user', name: 'User' },
];

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <Card sx={{ padding: 2, marginBottom: 2 }}>
        <TextInput source="email" validate={validateEmail} fullWidth />
        <TextInput source="first_name" validate={validateRequired} />
        <TextInput source="last_name" validate={validateRequired} />
        <SelectInput source="role" choices={roleChoices} validate={validateRequired} />
        <PasswordInput source="password" />
      </Card>
    </SimpleForm>
  </Edit>
); 