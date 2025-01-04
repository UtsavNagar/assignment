import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton, Box } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Firebase/database';
import { auth } from '../Firebase/firebase';

export default function NavBar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        const status = logout();
        if(status)
            navigate("/")
        else
            alert("logout failed")
        // Implement logout logic here
        handleClose();
        // Implement logout logic here
    };

    const handleProfile = () => {
        navigate('/profile/'+auth.currentUser?.uid);
        handleClose();
    };

    const handlePostJob = () => {
        navigate('/post-job');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Open Job Listings
                </Typography>
                <Box display="flex" alignItems="center">
                    <Button color="inherit" onClick={handlePostJob}>Post a Job</Button>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        onClick={handleMenu}
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleProfile}>Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
