import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import InventoryIcon from '@mui/icons-material/Inventory';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
import HistoryIcon from '@mui/icons-material/History';

interface UserMenuItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

interface UserMenuProps {
  selectedItem: string;
  onItemSelect: (itemId: string) => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ selectedItem, onItemSelect }) => {
  const theme = useTheme();

  const menuItems: UserMenuItem[] = [
    { id: 'profile', icon: <AccountCircleIcon />, label: 'Profile Information' },
    { id: 'settings', icon: <SettingsIcon />, label: 'Settings' },
    { id: 'subscription', icon: <SubscriptionsIcon />, label: 'Subscription' },
    { id: 'bought-prompts', icon: <ShoppingCartIcon />, label: 'Bought Prompts' },
    { id: 'rented-prompts', icon: <InventoryIcon />, label: 'Rented Prompts' },
    { id: 'favorites', icon: <StarIcon />, label: 'Favorite Prompts' },
    { id: 'history', icon: <HistoryIcon />, label: 'History' },
  ];

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {menuItems.map((item) => (
        <ListItem
          key={item.id}
          button
          selected={selectedItem === item.id}
          onClick={() => onItemSelect(item.id)}
          sx={{
            borderRadius: 2,
            mb: 1,
            '&.Mui-selected': {
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.15),
              },
            },
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.05),
            },
          }}
        >
          <ListItemIcon sx={{ color: selectedItem === item.id ? 'primary.main' : 'text.secondary' }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText 
            primary={item.label}
            primaryTypographyProps={{
              fontWeight: selectedItem === item.id ? 600 : 400,
              color: selectedItem === item.id ? 'primary.main' : 'text.primary',
            }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default UserMenu; 