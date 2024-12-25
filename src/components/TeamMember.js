import React, { useState } from "react";
import { Table, Card, Modal, Tabs, Button } from "antd";
import { PlusOutlined, RiseOutlined, TeamOutlined } from "@ant-design/icons";
import LeadForm from "./Form";

const TeamMember = () => {
  const [activeTab, setActiveTab] = useState("leads");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [leads, setLeads] = useState([
    {
      id: 1,
      date: '05.03.2025',
      location: 'Pune',
      name: 'Abc',
      phone1: 'S1',
      phone2: 'S1',
      emailId: 'Gmail.com',
      age: 28,
      profession: 'Service',
      income: 'abv 50k',
      lastHoliday: 'Goa',
      carCredit: 'yes',
      creditCard: 'no',
      time: '2:35pm',
      executive: 'priya',
      tlManager: 'ketan',
      status: 'reached'
    }
  ]);

  const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Phone", dataIndex: "phone1", key: "phone1" },
    { title: "Profession", dataIndex: "profession", key: "profession" },
    { title: "Income", dataIndex: "income", key: "income" },
    { title: "Executive", dataIndex: "executive", key: "executive" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // render: (status) => <Tag color="green">{status}</Tag>,
    },
  ];



  const handleLeadSubmit = (formData) => {
    setLeads(prevLeads => [...prevLeads, { ...formData, id: prevLeads.length + 1 }]);
    setIsModalOpen(false);
  };

  return (
    <div className="dashboard">
     






  


     
    </div>
  );
};

export default TeamMember;
