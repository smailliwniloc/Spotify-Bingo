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
  FaAddressBook,
  FaQuestionCircle,
} from 'react-icons/fa';
import {NavLink} from 'react-router-dom';

function SidebarContent() {
  const links = [
    {URL: '/', title: 'Home', logo: FaHome},
    {URL: '/new-game', title: 'New Game', logo: FaNewspaper},
    {URL: '/about-us', title: 'About Us', logo: FaAddressBook},
    {URL: '/FAQ', title: 'FAQ', logo: FaQuestionCircle},
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
                  <link.logo style={{color: 'red'}} />
                </ListItemIcon>
                <ListItemText primary={link.title} />
              </ListItemButton>
            </NavLink>
          ))}
        </div>
        <div>
          <a href={'/'} target="_blank" rel="noreferrer">
            <button>Book Now</button>
          </a>
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
      PaperProps={{sx: {backgroundColor: 'orange'}}}
    >
      <SidebarContent />
    </Drawer>
  );
}

export default Sidebar;
