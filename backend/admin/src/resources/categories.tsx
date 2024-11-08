import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  ArrayField,
  SingleFieldList,
  required,
  EditButton,
  DeleteButton,
  NumberField,
  ArrayInput,
  SimpleFormIterator,
  ChipField,
} from 'react-admin';

export const CategoryList = () => (
  <List>
    <Datagrid>
      <TextField source="name" />
      <ChipField source="type" />
      <NumberField source="promptCount" />
      <TextField source="icon" />
      <ArrayField source="subcategories">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ArrayField>
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const CategoryEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <SelectInput 
        source="type" 
        choices={[
          { id: 'text', name: 'Text' },
          { id: 'image', name: 'Image' },
          { id: 'both', name: 'Both' },
        ]} 
        validate={required()} 
      />
      <TextInput source="icon" />
      <ArrayInput source="subcategories">
        <SimpleFormIterator>
          <TextInput source="name" />
          <TextInput source="description" multiline />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);

export const CategoryCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <SelectInput 
        source="type" 
        choices={[
          { id: 'text', name: 'Text' },
          { id: 'image', name: 'Image' },
          { id: 'both', name: 'Both' },
        ]} 
        validate={required()} 
      />
      <TextInput source="icon" />
      <ArrayInput source="subcategories">
        <SimpleFormIterator>
          <TextInput source="name" />
          <TextInput source="description" multiline />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
); 