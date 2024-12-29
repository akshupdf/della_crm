import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../redux/appSlice";


const ConfirmLeads = () => {
 


  const dispatch = useDispatch();

  const { leads  , loading} = useSelector((state) => state.user);

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

  const skeletonRows = Array.from({ length: leads.length || 9  });

  useEffect(() => {
   
      dispatch(fetchLeads("confirmed"));
    
    }, [dispatch]);

  return (
    <div className="px-8 rounded-2xl mt-10">

        <h1 className="text-4xl  text-center w-full  pb-4 font-semibold">Confirmed Leads</h1>
        {
      loading ? ( <table
        className="min-w-full bg-white"
        style={{
          borderColor: "#A4CC12",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <thead
          className="text-xs text-gray-700 uppercase"
          style={{
            color: "#fff",
            borderBottom: "1px solid #A4CC12",
          }}
        >
          <tr>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Location</th>
            <th className="py-2 px-4 text-left">Phone</th>
            <th className="py-2 px-4 text-left">Profession</th>
            <th className="py-2 px-4 text-left">Income</th>
            <th className="py-2 px-4 text-left">Executive</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Reason</th>
          </tr>
        </thead>
        <tbody>
          {skeletonRows.map((_, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white" : ""}
              style={{
                backgroundColor: index % 2 === 1 ? "" : "",
                borderBottom: "1px solid #A4CC12",
              }}
            >
              <td className="py-2 px-4">
                <div className="skeleton skeleton-row"></div>
              </td>
              <td className="py-2 px-4">
                <div className="skeleton skeleton-text"></div>
              </td>
              <td className="py-2 px-4">
                <div className="skeleton skeleton-text"></div>
              </td>
              <td className="py-2 px-4">
                <div className="skeleton skeleton-text"></div>
              </td>
              <td className="py-2 px-4">
                <div className="skeleton skeleton-row"></div>
              </td>
              <td className="py-2 px-4">
                <div className="skeleton skeleton-text"></div>
              </td>
              <td className="py-2 px-4">
                <div className="skeleton skeleton-text"></div>
              </td>
              <td className="py-2 px-4">
                <div className="skeleton skeleton-text"></div>
              </td>
              <td className="py-2 px-4">
                <div className="skeleton skeleton-text"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>) : 
     <Table columns={columns} loading={loading} dataSource={leads} rowKey="id" pagination={{ pageSize: 10 }} className="rounded-2xl"/> }



     
    </div>
  );
};

export default ConfirmLeads;
