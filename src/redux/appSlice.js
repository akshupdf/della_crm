// apiSlice.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

let BASE_URL = 'https://della-backend.vercel.app/api/v1';

export const addUser = createAsyncThunk(
  'user/addUser',
  async (values, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/addUsers`, values);
      return response;
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateStatus = createAsyncThunk(
  'user/updateStatus',
  async (data, thunkAPI) => {
    
    try {
      // const token = localStorage.getItem('token');

      const response = await axios.put(`${BASE_URL}/${data?.leadId}/status`, { status: data?.newStatus }, 
        { headers: { Authorization: `Bearer ${data?.token}` } }
        
      );
      return response;
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getLogin = createAsyncThunk(
  'api/login',
  async ( data , thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/login` , data);
      
      localStorage.setItem('token', response.data?.token);
      localStorage.setItem('role', response.data?.role);
      return response.data;
      

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userLogout = createAsyncThunk(
  'user/logOut',
  async (thunkAPI) => {
    try {
      localStorage.removeItem('token');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchLeads = createAsyncThunk(
  'api/fetchLeads',
  async (status ,thunkAPI) => {
 let stat = status || "";

    try {
      const response = await axios.get(`${BASE_URL}/getleads?status=${stat}` 
     );
      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchMember = createAsyncThunk(
  'api/membership',
  async (thunkAPI) => {

    try {
      const response = await axios.get(`${BASE_URL}/membership`);
      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addLead = createAsyncThunk(
  'api/addLead',
  async (data, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}/uploadLead`, [data] , {
        headers: {
          Authorization: `Bearer ${token}`, 
        } });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addMember = createAsyncThunk(
  'api/addMember',
  async (data, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}/membership`, data , {
        headers: {
          Authorization: `Bearer ${token}`, 
        } });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
