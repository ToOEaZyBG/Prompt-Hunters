import { Menu } from 'react-admin';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CodeIcon from '@mui/icons-material/Code';
import SettingsIcon from '@mui/icons-material/Settings';

export const CustomMenu = () => (
  <Menu>
    <Menu.DashboardItem />
    <Menu.Item
      to="/users"
      primaryText="Users"
      leftIcon={<PeopleIcon />}
    />
    <Menu.Item
      to="/prompts"
      primaryText="Prompts"
      leftIcon={<CodeIcon />}
    />
    <Menu.Item
      to="/settings"
      primaryText="Settings"
      leftIcon={<SettingsIcon />}
    />
  </Menu>
); 