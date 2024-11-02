// src/components/pages/SettingPage.jsx
import React from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { IoIosSettings } from 'react-icons/io';

const SettingPage = () => {
    return (
        <div style={{ padding: '20px', marginTop: '50px' }}>
            <h2>Settings</h2>
            <Card variant="outlined" style={{ marginBottom: '16px' }}>
                <CardContent>
                    <Typography variant="h6">
                        <IoIosSettings style={{ marginRight: '8px' }} />
                        Personal Information
                    </Typography>
                    <TextField label="Name" variant="outlined" fullWidth style={{ marginBottom: '12px' }} />
                    <TextField label="Email" variant="outlined" fullWidth style={{ marginBottom: '12px' }} />
                    <Button variant="contained" color="primary">Save Changes</Button>
                </CardContent>
            </Card>

            <Card variant="outlined" style={{ marginBottom: '16px' }}>
                <CardContent>
                    <Typography variant="h6">
                        <IoIosSettings style={{ marginRight: '8px' }} />
                        Change Password
                    </Typography>
                    <TextField label="Current Password" type="password" variant="outlined" fullWidth style={{ marginBottom: '12px' }} />
                    <TextField label="New Password" type="password" variant="outlined" fullWidth style={{ marginBottom: '12px' }} />
                    <TextField label="Confirm Password" type="password" variant="outlined" fullWidth style={{ marginBottom: '12px' }} />
                    <Button variant="contained" color="primary">Update Password</Button>
                </CardContent>
            </Card>

            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6">
                        <IoIosSettings style={{ marginRight: '8px' }} />
                        Notification Preferences
                    </Typography>
                    <Button variant="contained" color="secondary" style={{ marginTop: '8px' }}>Manage Preferences</Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default SettingPage;
