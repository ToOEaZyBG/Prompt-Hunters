import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  BooleanField,
  BooleanInput,
  EditButton,
  DeleteButton,
  required,
  email,
} from 'react-admin';

export const UserList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <EmailField source="email" />
      <BooleanField source="isActive" />
      <DateField source="createdAt" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="firstName" validate={required()} />
      <TextInput source="lastName" validate={required()} />
      <TextInput source="email" validate={[required(), email()]} />
      <BooleanInput source="isActive" />
    </SimpleForm>
  </Edit>
);

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="firstName" validate={required()} />
      <TextInput source="lastName" validate={required()} />
      <TextInput source="email" validate={[required(), email()]} />
      <TextInput source="password" type="password" validate={required()} />
      <BooleanInput source="isActive" defaultValue={true} />
    </SimpleForm>
  </Create>
); 