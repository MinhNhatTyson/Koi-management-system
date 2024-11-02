// src/components/pages/NotificationPage.jsx
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { FaBell } from 'react-icons/fa';

const notifications = [
    { id: 1, title: 'Order #1234 has been shipped', date: '2024-11-01', type: 'Order' },
    { id: 2, title: 'New message from support', date: '2024-10-31', type: 'Message' },
    { id: 3, title: 'Scheduled maintenance update', date: '2024-10-30', type: 'Update' },
];

const NotificationPage = () => {
    return (
        <div style={{ padding: '20px', marginTop: '50px' }}>
            <h2>Notifications</h2>
            {notifications.map((notif) => (
                <Card key={notif.id} variant="outlined" style={{ marginBottom: '16px' }}>
                    <CardContent>
                        <Typography variant="h6" component="div" style={{ display: 'flex', alignItems: 'center' }}>
                            <FaBell style={{ marginRight: '8px' }} />
                            {notif.title}
                        </Typography>
                        <Typography color="textSecondary">{notif.date}</Typography>
                        <Typography variant="body2">{notif.type}</Typography>
                    </CardContent>
                    <Button size="small" color="primary" variant="contained" style={{ margin: '8px' }}>
                        Mark as Read
                    </Button>
                </Card>
            ))}
        </div>
    );
};

export default NotificationPage;
