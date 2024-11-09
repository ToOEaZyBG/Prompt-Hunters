import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
  ReferenceInput,
} from 'react-admin';
import { Card } from '@mui/material';
import { PROMPT_CATEGORIES, AI_MODELS } from '../../constants/categories';

const validateRequired = [required()];

export const PromptEdit = () => (
  <Edit>
    <SimpleForm>
      <Card sx={{ padding: 2, marginBottom: 2, borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <TextInput source="title" validate={validateRequired} fullWidth />
        <TextInput 
          source="content" 
          validate={validateRequired} 
          multiline 
          rows={4}
          fullWidth 
        />
        <SelectInput 
          source="category" 
          choices={Object.entries(PROMPT_CATEGORIES).map(([id, name]) => ({ id, name }))}
          validate={validateRequired}
        />
        <SelectInput 
          source="model" 
          choices={Object.keys(AI_MODELS).map(model => ({ id: model, name: model }))}
          validate={validateRequired}
        />
        <TextInput 
          source="output" 
          multiline 
          rows={4}
          fullWidth 
        />
        <ReferenceInput source="created_by" reference="users">
          <SelectInput optionText="email" validate={validateRequired} />
        </ReferenceInput>
      </Card>
    </SimpleForm>
  </Edit>
);
  