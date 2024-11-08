import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  ArrayInput,
  SimpleFormIterator,
  EditButton,
  DeleteButton,
  ChipField,
  NumberField,
  required,
} from 'react-admin';

// Типове промпти
const promptTypes = [
  { id: 'text', name: 'Text' },
  { id: 'image', name: 'Image' },
];

export const PromptList = () => (
  <List>
    <Datagrid>
      <TextField source="title" />
      <TextField source="type" />
      <ReferenceField source="authorId" reference="users">
        <TextField source="fullName" />
      </ReferenceField>
      <ChipField source="model" />
      <NumberField source="price.buy" label="Buy Price" />
      <NumberField source="price.rent" label="Rent Price" />
      <DateField source="createdAt" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const PromptEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" validate={required()} fullWidth />
      <TextInput source="content" validate={required()} multiline rows={4} fullWidth />
      <SelectInput source="type" choices={promptTypes} validate={required()} />
      <TextInput source="model" validate={required()} />
      <ArrayInput source="categories">
        <SimpleFormIterator>
          <TextInput source="name" />
        </SimpleFormIterator>
      </ArrayInput>
      <NumberInput source="price.buy" label="Buy Price" validate={required()} />
      <NumberInput source="price.rent" label="Rent Price" validate={required()} />
      <ReferenceInput source="authorId" reference="users">
        <SelectInput optionText="fullName" validate={required()} />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const PromptCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" validate={required()} fullWidth />
      <TextInput source="content" validate={required()} multiline rows={4} fullWidth />
      <SelectInput source="type" choices={promptTypes} validate={required()} />
      <TextInput source="model" validate={required()} />
      <ArrayInput source="categories">
        <SimpleFormIterator>
          <TextInput source="name" />
        </SimpleFormIterator>
      </ArrayInput>
      <NumberInput source="price.buy" label="Buy Price" validate={required()} />
      <NumberInput source="price.rent" label="Rent Price" validate={required()} />
      <ReferenceInput source="authorId" reference="users">
        <SelectInput optionText="fullName" validate={required()} />
      </ReferenceInput>
    </SimpleForm>
  </Create>
); 