import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Paper
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface UserFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

export const UserForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'USER'
  });

  useEffect(() => {
    if (id) {
      // Загрузка данных пользователя при редактировании
      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/admin/users/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          const { password, ...userData } = response.data;
          setFormData({ ...userData, password: '' });
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:8080/api/admin/users/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      } else {
        await axios.post('http://localhost:8080/api/admin/users', formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      }
      navigate('/admin/users');
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        {id ? 'Edit User' : 'Create New User'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <TextField
          fullWidth
          margin="normal"
          label="First Name"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Last Name"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        />
        <TextField
          select
          fullWidth
          margin="normal"
          label="Role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <MenuItem value="USER">User</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
        </TextField>
        <Box sx={{ mt: 3 }}>
          <Button type="submit" variant="contained" sx={{ mr: 1 }}>
            {id ? 'Update' : 'Create'}
          </Button>
          <Button variant="outlined" onClick={() => navigate('/admin/users')}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};