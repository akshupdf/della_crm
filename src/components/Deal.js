import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Table, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import LeadForm from "./Form";
import { addLead, fetchLeads, updateStatus } from "../redux/appSlice";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const { Option } = Select;

const Deal = () => {
 

   const dispatch = useDispatch();
   const { leads, loading } = useSelector((state) => state.user);
 
   // Fetch leads once when the component mounts
   useEffect(() => {
     dispatch(fetchLeads());
   }, [dispatch]);

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
      render: (status, record) => (
        <Select
          defaultValue={status}
          style={{ width: 120 }}
          onChange={(newStatus) => handleStatusChange(record._id, newStatus)}
        >
          <Option value="Reached">Reached</Option>
          <Option value="On The Way">On The Way</Option>
          <Option value="Confirmed">Confirmed</Option>
        </Select>
      ),
    },
  ];

  // Handle status change
    const handleStatusChange = useCallback(
      async (leadId, newStatus) => {
        try {
          await dispatch(updateStatus({ leadId, newStatus })).unwrap();
          dispatch(fetchLeads());
          alert("Status updated successfully");
        } catch (error) {
          console.error("Failed to update status:", error);
        }
      },
      [dispatch]
    );


  return (
    <div className="px-8 rounded-2xl mt-10">

        <h1 className="text-4xl  text-center w-full  pb-4 font-semibold">Deals</h1>
     
     <Table columns={columns} dataSource={leads} rowKey="id" pagination={{ pageSize: 10 }} className="rounded-2xl"/>


     <ToastContainer  containerId={"deal"} />
     
    </div>
  );
};

export default Deal;
