// apiSlice.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

let BASE_URL = 'https://della-backend.vercel.app/api/v1';
const token = localStorage.getItem('token');

export const addUser = createAsyncThunk(
  'user/addUser',
  async (values, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/addUser`, values ,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          }
        }
      );
      return response.data;;
      
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

export const updateTravStatus = createAsyncThunk(
  'user/updateTravStatus',
  async (data, thunkAPI) => {
    
    try {
      // const token = localStorage.getItem('token');

      const response = await axios.put(`${BASE_URL}/benefit/${data?.leadId}/status`, { trav_status: data?.newStatus }, 
        { headers: { Authorization: `Bearer ${data?.token}` } }
        
      );
      return response;
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateBenStatus = createAsyncThunk(
  'user/updateBenStatus',
  async (data, thunkAPI) => {
    
    try {
      // const token = localStorage.getItem('token');

      const response = await axios.put(`${BASE_URL}/clubbenefit/${data?.leadId}/status`, { ben_status : data?.newStatus }, 
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
      localStorage.setItem('name', response.data?.name);
      if(response.data?.role === "tl"){
        localStorage.setItem('tl_id', response.data?.id);
      }
    
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
  async (data ,thunkAPI) => {

    try {

      let response;

      if(data.id){
        response = await axios.get(`${BASE_URL}/getleadsbyId/${data.id}` ,{ headers: { Authorization: `Bearer ${token}` } } );
      }else if(data.status){
       response = await axios.get(`${BASE_URL}/getleads?status=${data.status}` ,{ headers: { Authorization: `Bearer ${token}` } }
     );
    }else{
      response = await axios.get(`${BASE_URL}/getleads` ,{ headers: { Authorization: `Bearer ${token}` } })
    }
    
      return response.data;

    } catch (error) {
      console.log(error);
      
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllLeads = createAsyncThunk(
  'api/fetchAllLeads',
  async (thunkAPI) => {

    try {

  
     const response = await axios.get(`${BASE_URL}/getleads` ,{ headers: { Authorization: `Bearer ${token}` } })
    
      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchLeadsbyLocation = createAsyncThunk(
  'api/fetchLeadsLoc',
  async (loc ,thunkAPI) => {
 let stat = loc || "";

    try {
      const response = await axios.get(`${BASE_URL}/getleads/${stat}` ,{ headers: { Authorization: `Bearer ${token}` } }
     );
      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchMember = createAsyncThunk(
  'api/allmembership',
  async (thunkAPI) => {

    try {
      const response = await axios.get(`${BASE_URL}/allmembership`);
      return response.data;
  
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const findMember = createAsyncThunk(
  'api/findmembership',
  async (data, thunkAPI) => {

    try {
      const response = await axios.post(`${BASE_URL}/findmembership`, data);
      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUsersTl = createAsyncThunk(
  'api/getUsersByTl',
  async (tl,thunkAPI) => {

    try {
      const response = await axios.get(`${BASE_URL}/${tl}/getUsersByTl`);
      
      return response.data.agentData;


    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUsersbyRole = createAsyncThunk(
  'api/getUsersByRole',
  async (role,thunkAPI) => {

    try {
      const response = await axios.get(`${BASE_URL}/getUsersByRole/${role}`);
      
      return response.data.rolewiseUsers;


    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addLead = createAsyncThunk(
  'api/addLead',
  async (data, thunkAPI) => {
    try {
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

export const dashboardCount = createAsyncThunk(
  'api/dashboard_count',
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/dashboard_count`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        } });
      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const assignTo = createAsyncThunk(
  'api/assignto',
  async (data,thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/assignto`, { ...data }, {
        headers: {
          Authorization: `Bearer ${token}`, 
        } });
      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const uploadImg = createAsyncThunk(
  'api/uploadImg',
  async (data,thunkAPI) => {
    try {
      const response = await axios.post("https://della-backend.onrender.com/api/v1/upload", data, {
        headers: {
          Authorization: `Bearer ${token}`, 
        } });
      return response.data;

    } catch (error) {      
      return thunkAPI.rejectWithValue(error.message);
    }
  } 
);

export const addClubBenefit = createAsyncThunk(
  'api/clubbenefit',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/clubbenefit`, data );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchBenefits = createAsyncThunk(
  'api/benefits',
  async (id,thunkAPI) => {

    try {
      const response = await axios.get(`${BASE_URL}/benefits/${id}`);
      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchClubBenefits = createAsyncThunk(
  'api/clubbenefit',
  async (id,thunkAPI) => {

    try {
      const response = await axios.get(`${BASE_URL}/clubbenefits/${id}`);
      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const addTravelBenefit = createAsyncThunk(
  'api/benefit',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/benefit`, data );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

