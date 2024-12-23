import React, { useState } from 'react';
import {
    TextField,
    Button,
    Container,
    Paper,
    Typography,
    MenuItem,
    Box,
    Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userService, CreateUserRequest } from '../../services/userService';

export const CreateUser: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [userData, setUserData] = useState<CreateUserRequest>({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        role: 'USER'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log('Creating user:', userData);
            await userService.createUser(userData);
            navigate('/admin/users');
        } catch (error: any) {
            console.error('Error creating user:', error);
            setError(error.response?.data?.message || 'Failed to create user');
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Create New User
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        required
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        required
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    />

                    <TextField
                        fullWidth
                        label="First Name"
                        margin="normal"
                        value={userData.firstName}
                        onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                    />

                    <TextField
                        fullWidth
                        label="Last Name"
                        margin="normal"
                        value={userData.lastName}
                        onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                    />

                    <TextField
                        select
                        fullWidth
                        label="Role"
                        margin="normal"
                        value={userData.role}
                        onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                    >
                        <MenuItem value="USER">User</MenuItem>
                        <MenuItem value="ADMIN">Admin</MenuItem>
                    </TextField>

                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Create User
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/admin')}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}; 