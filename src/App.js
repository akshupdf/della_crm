import React from "react";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import { Routes, Route, useLocation } from "react-router-dom";
import TelecallingDashboard from "./components/Addleads";
import Dashboardv2 from "./components/Dashboardv2";
import TeamMember from "./components/TeamMember";
import TotalLeads from "./components/TotalLeads";
import '../src/App.css';
import ConfirmLeads from "./components/ConfirmLeads";
import Deal from "./components/Deal";
import TeamManagement from "./components/TeamManagement";
import Login from "./components/Login";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import AddMember from "./components/AddMember";
import LeadForm from "./components/Form";
import AssignLeads from "./components/AssignLeads";



const { Content } = Layout;

const App = () => {

  const location = useLocation();

   const isHiddenPage = location.pathname === "/"

  return (
 
      <Layout>
          {!isHiddenPage &&  <Sidebar /> }
        <Layout className="p-4">
          <Navbar />
          <Content className="bg-white shadow-md p-6">
            <Routes>
              <Route path="/add-leads" element={ <LeadForm />} />
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboardv2 />} />
              <Route path="/teammember" element={<TeamMember />} />
              <Route path="/totalleads" element={<TotalLeads />} />
              <Route path="/confirmedleads" element={<ConfirmLeads />} />
              <Route path="/deal" element={<Deal />} />
              <Route path="/teammanagement" element={<TeamManagement />} />
              <Route path="/addmember" element={<AddMember />} />
              <Route path="/assign" element={<AssignLeads />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
   
  );
};

export default App;
