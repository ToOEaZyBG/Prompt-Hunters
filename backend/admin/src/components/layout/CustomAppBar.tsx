import { AppBar, TitlePortal } from 'react-admin';
import { Box, Typography } from '@mui/material';

export const CustomAppBar = () => (
  <AppBar
    color="primary"
    sx={{
      '& .RaAppBar-title': {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      },
    }}
  >
    <TitlePortal />
    <Box flex={1} />
    <Box
      display="flex"
      alignItems="center"
      sx={{
        marginRight: 2,
      }}
    >
      <Typography variant="body2">
        Prompt Hunters Admin
      </Typography>
    </Box>
  </AppBar>
); 