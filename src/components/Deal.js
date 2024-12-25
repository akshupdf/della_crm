import React, { useState } from "react";
import { Table } from "antd";

const Deal = () => {
 

  const [leads, setLeads] = useState([
    {
      "date": "05.03.2025",
      "location": "Pune",
      "name": "John Doe",
      "phone1": 91,
      "phone2": 91,
      "emailId": "john@gmail.com",
      "age": 29,
      "profession": "Service",
      "income": "abv 50k",
      "lastHoliday": "Goa",
      "car": "Yes",
      "creditCard": "No",
      "time": "2:30pm",
      "executive": "Priya",
      "tl": "Ketan",
      "manager": "Mosin",
      "status": "Deal"
    },
    {
      "date": "05.03.2025",
      "location": "Mumbai",
      "name": "Jane Roe",
      "phone1": 91,
      "phone2": 91,
      "emailId": "jane@gmail.com",
      "age": 34,
      "profession": "Business",
      "income": "blw 50k",
      "lastHoliday": "Manali",
      "car": "No",
      "creditCard": "Yes",
      "time": "2:45pm",
      "executive": "Varsha",
      "tl": "Sunil",
      "manager": "Mosin",
      "status": "Deal"
    },
    {
      "date": "05.03.2025",
      "location": "Delhi",
      "name": "Raj Mal",
      "phone1": 91,
      "phone2": 91,
      "emailId": "raj@gmail.com",
      "age": 31,
      "profession": "Service",
      "income": "abv 50k",
      "lastHoliday": "Kerala",
      "car": "Yes",
      "creditCard": "Yes",
      "time": "3:00pm",
      "executive": "Sahil",
      "tl": "Ketan",
      "manager": "Mosin",
      "status": "Deal"
    },
    {
      "date": "05.03.2025",
      "location": "Pune",
      "name": "Rita P.",
      "phone1": 91,
      "phone2": 91,
      "emailId": "rita@gmail.com",
      "age": 27,
      "profession": "Business",
      "income": "blw 50k",
      "lastHoliday": "Goa",
      "car": "No",
      "creditCard": "No",
      "time": "2:35pm",
      "executive": "Priya",
      "tl": "Sunil",
      "manager": "Mosin",
      "status": "Deal"
    },
    
  ]
  );

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



  return (
    <div className="px-8 rounded-2xl mt-10">

        <h1 className="text-4xl  text-center w-full  pb-4 font-semibold">Deals</h1>
     
     <Table columns={columns} dataSource={leads} rowKey="id" pagination={{ pageSize: 10 }} className="rounded-2xl"/>



     
    </div>
  );
};

export default Deal;
