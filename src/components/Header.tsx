import React from 'react';
import Sidebar from './Sidebar';
import {FaBars} from 'react-icons/fa';
import {NavLink} from 'react-router-dom';
import {Box} from '@mui/material';
import {styled} from '@mui/material/styles';
import {BLACK, GREEN} from '../constants/COLORS';

const headerHeight = 120;
const heroProportion = 0.4;

const styles = {
  header: {
    height: `${heroProportion * 100}vh`,
    position: 'relative',
    width: '100%',
  },
  nav: {
    position: 'fixed',
    height: `${headerHeight}px`,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: '0 32px',
    zIndex: 12,
    '& button': {
      color: 'white',
      border: '1px solid white',
    },
  },
  image: {
    top: 0,
    left: 0,
    position: 'relative',
    width: '100%',
    '& img': {
      objectFit: 'cover',
      objectPosition: 'center',
      height: '70vh',
      width: '100%',
      '@media screen and (max-width: 600px)': {
        height: '40vh',
      },
    },
  },
  bars: {
    display: 'none',
    color: 'white',
    '@media screen and (max-width: 600px)': {
      display: 'block',
      fontSize: '1.8rem',
      cursor: 'pointer',
    },
  },
  navMenu: {
    display: 'flex',
    alignItems: 'center',
    '& a': {
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      padding: '0 1rem',
      height: '100%',
      cursor: 'pointer',
      '&.active': {
        color: '#808080',
      },
      '&:hover': {
        color: '#808080',
      },
      '&:not(:first-of-type)': {
        '@media screen and (max-width: 600px)': {
          display: 'none',
        },
      },
    },
  },
  finalSection: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    '@media screen and (max-width: 900px)': {
      display: 'none',
    },
  },
  hero: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: `${heroProportion * 100}vh`,
    background: `linear-gradient(90deg, ${BLACK.hex}, ${GREEN.hex})`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
};

const PageHeader = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const pageHeight = window.innerHeight;

  const [scrollPosition, setScrollPosition] = React.useState(0);
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, {passive: true});

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const StyledBars = styled(FaBars)(styles.bars);
  const background =
    (scrollPosition + headerHeight) / pageHeight < heroProportion
      ? 'transparent'
      : `linear-gradient(90deg, ${BLACK.hex}, ${GREEN.hex})`;

  return (
    <Box component="header" sx={styles.header}>
      <Box component="nav" sx={styles.nav} style={{background: background}}>
        <Box component="div" sx={styles.navMenu}>
          <NavLink to="/">SB</NavLink>
          <NavLink to="/new-game">New Game</NavLink>
        </Box>
        <StyledBars onClick={handleDrawerToggle} />
        <Sidebar isOpen={sidebarOpen} handleDrawerToggle={handleDrawerToggle} />
      </Box>
      <Box component="div" sx={styles.hero}>
        <h1>Spotify Bingo Generator</h1>
      </Box>
    </Box>
  );
};

export default PageHeader;
