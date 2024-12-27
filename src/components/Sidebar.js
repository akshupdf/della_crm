import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, TeamOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const { Sider } = Layout;

const Sidebar = () => {

   const {role } = useAuth();
   

  return (

    <Sider width={200} className="h-screen bg-gray-50 shadow-md pt-20">
      {/* <div className="p-4 text-center bg-blue-500 text-white font-bold">
        <h2>Dashboard</h2>
      </div> */}
      <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
      
            <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item> 
        

        {
          ["superadmin", "tl"].includes(role) && (
            <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/add-leads">Add Leads</Link>
          </Menu.Item>
          )
        }
  
       
        {
          ["superadmin","sales"].includes(role) && (
            <Menu.Item key="7" icon={<UserOutlined />}>
            <Link to="/addmember">Add Member</Link>
          </Menu.Item>
           )
        }
      {
        ["superadmin", "tl"].includes(role) && (
          <Menu.Item key="3" icon={<TeamOutlined />}>
          <Link to="/totalleads">Total leads</Link>
          </Menu.Item> )
      }
         {
          ["superadmin", "tl"].includes(role) && (
        <Menu.Item key="4" icon={<TeamOutlined />}>
        <Link to="/confirmedleads">Confirmed Leads</Link>
        </Menu.Item> )}

        {
          
        }
        {
           ["superadmin", "reception"].includes(role) && (
            <Menu.Item key="5" icon={<TeamOutlined />}>
            <Link to="/deal">Deal</Link>
            </Menu.Item>
           )
        }
       
       {
        ["superadmin", "tl"].includes(role) && (
          <Menu.Item key="6" icon={<TeamOutlined />}>
          <Link to="/teammember">Team Performance</Link>
          </Menu.Item> )
       }
       
      </Menu>
    </Sider>
  );
};

export default Sidebar;
