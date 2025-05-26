import React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  FaHome,
  FaNewspaper,
} from 'react-icons/fa';
import {NavLink} from 'react-router-dom';

function SidebarContent(): React.ReactElement {
  const links = [
    {URL: '/', title: 'Home', logo: FaHome},
    {URL: '/new-game', title: 'New Game', logo: FaNewspaper},
  ];

  return (
    <List style={{height: '100dvh', padding: 0}}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <div>
          {links.map((link) => (
            <NavLink
              to={link.URL}
              style={{color: 'green', textDecoration: 'none'}}
              key={link.title}
            >
              <ListItemButton key={link.title} divider sx={{minHeight: 65}}>
                <ListItemIcon>
                  <link.logo />
                </ListItemIcon>
                <ListItemText primary={link.title} />
              </ListItemButton>
            </NavLink>
          ))}
        </div>
      </div>
    </List>
  );
}

type SidebarProps = {
  isOpen: boolean;
  handleDrawerToggle: () => void;
};

function Sidebar({isOpen, handleDrawerToggle}: SidebarProps) {
  return (
    <Drawer
      variant="temporary"
      open={isOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: {sm: 'block', md: 'none'},
        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: 240},
      }}
    >
      <SidebarContent />
    </Drawer>
  );
}

export default Sidebar;
