import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { Link } from 'react-router-dom';

export default function FadeMenu({handleClose,open,anchorEl}) {
  
const linkStyle = {
  color: '#1E293B',
  textDecoration: 'none'
}

  return (
    <div>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <Link to='/' style={linkStyle}>
          <MenuItem onClick={handleClose}>Flag of the Moment</MenuItem>
          </Link>
       <Link to='/flag/all-flags' style={linkStyle}>
        <MenuItem onClick={handleClose}>All Flags</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}