import { createSlice } from '@reduxjs/toolkit';
import { addUser, updateStatus, getLogin, fetchLeads , addLead, fetchMember, fetchUsersTl, dashboardCount} from './appSlice';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    loading: false,
    error: null,
    userInfo: null,
    userToken: null,
    leads: [],
    members: [],
    roles: [], // List of roles
    currentRole: null, // Current logged-in user's role
    usersByRole: null, // Users filtered by role
    usersByTL: null, 
    addLead: null,
    dashboardData: null
  },
  reducers: {
    logoutUser: (state) => {
      state.userData = null;
      state.userInfo = null;
      state.userToken = null;
      state.currentRole = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add User
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.userInfo;
        state.userToken = action.payload.token;
        state.currentRole = action.payload.role; // Extract role from response
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Leads
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

       // Fetch Members
       .addCase(fetchMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMember.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
      })
      .addCase(fetchMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Assign Role
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Users by Role
      .addCase(getLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.usersByRole = action.payload;
      })
      .addCase(getLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

       // Fetch Users by Role
       .addCase(fetchUsersTl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersTl.fulfilled, (state, action) => {
        state.loading = false;
        state.usersByTL = action.payload;
      })
      .addCase(fetchUsersTl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //add Leads
      .addCase(addLead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLead.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = [...state.leads, action.payload];
      })
      .addCase(addLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //dashboard

      
      .addCase(dashboardCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(dashboardCount.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = [ action.payload];
      })
      .addCase(dashboardCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addDefaultCase((state) => state);
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
