import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, useTheme } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CodeIcon from '@mui/icons-material/Code';
import { Layout, LayoutProps, MenuItemLink } from 'react-admin';
import { useLocation } from 'react-router-dom';

const DRAWER_WIDTH = 240;

const Menu = () => {
  const theme = useTheme();
  const location = useLocation();

  const menuItems = [
    { name: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { name: 'users', label: 'Users', icon: <PeopleIcon /> },
    { name: 'prompts', label: 'Prompts', icon: <CodeIcon /> },
  ];

  return (
    <List>
      {menuItems.map(item => (
        <MenuItemLink
          key={item.name}
          to={`/${item.name}`}
          primaryText={item.label}
          leftIcon={item.icon}
          selected={location.pathname === `/${item.name}`}
          sx={{
            my: 0.5,
            mx: 1,
            borderRadius: 1,
            '&.RaMenuItemLink-active': {
              backgroundColor: theme.palette.primary.light + '20',
              '&:hover': {
                backgroundColor: theme.palette.primary.light + '30',
              },
            },
          }}
        />
      ))}
    </List>
  );
};

export const AdminLayout = (props: LayoutProps) => {
  const theme = useTheme();

  return (
    <Layout
      {...props}
      sx={{
        '& .RaLayout-content': {
          padding: 3,
          backgroundColor: theme.palette.background.default,
        },
      }}
      menu={Menu}
      appBar={() => (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Prompt Hunters Admin
            </Typography>
          </Toolbar>
        </AppBar>
      )}
    >
      <Box sx={{ display: 'flex' }}>
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              backgroundColor: theme.palette.background.default,
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          <Toolbar />
          <Menu />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {props.children}
        </Box>
      </Box>
    </Layout>
  );
}; 