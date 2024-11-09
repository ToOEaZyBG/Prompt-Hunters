import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
  SelectInput,
  BulkDeleteButton,
  SearchInput,
  FilterButton,
  CreateButton,
  ExportButton,
  TopToolbar,
  ReferenceField,
  ChipField,
} from 'react-admin';
import { Card } from '@mui/material';
import { PROMPT_CATEGORIES, AI_MODELS } from '../../constants/categories';

const promptFilters = [
  <SearchInput source="q" alwaysOn key="q" />,
  <SelectInput 
    source="category" 
    choices={Object.entries(PROMPT_CATEGORIES).map(([id, name]) => ({ id, name }))}
    key="category"
  />,
  <SelectInput 
    source="model" 
    choices={Object.keys(AI_MODELS).map(model => ({ id: model, name: model }))}
    key="model"
  />,
];

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const PromptList = () => (
  <List 
    filters={promptFilters}
    actions={<ListActions />}
    bulkActionButtons={<BulkDeleteButton />}
    sort={{ field: 'created_at', order: 'DESC' }}
  >
    <Card sx={{ padding: 0, borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="content" />
        <ChipField source="category" />
        <ChipField source="model" />
        <ReferenceField source="created_by" reference="users">
          <TextField source="email" />
        </ReferenceField>
        <DateField source="created_at" showTime />
        <DateField source="updated_at" showTime />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </Card>
  </List>
); 