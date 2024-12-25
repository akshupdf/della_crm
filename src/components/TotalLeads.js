import React, { useMemo } from "react";
import { Table } from "antd";
import {  useSelector } from "react-redux";

const TotalLeads = () => {

  const { leads, loading } = useSelector((state) => state.user);

  // Memoize columns
  const columns = useMemo(
    () => [
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
      },
    ],
    []
  );

  // Memoize leads data
  const memoizedLeads = useMemo(() => leads, [leads]);

  return (
    <div className="px-8 rounded-2xl mt-10">
      <h1 className="text-4xl text-center w-full pb-4 font-semibold">
        Total Leads
      </h1>
      <Table
        columns={columns}
        dataSource={memoizedLeads}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        className="rounded-2xl"
        loading={loading}
        scroll={{ y: 400 }} // Virtual scrolling with fixed height
      />
    </div>
  );
};

export default TotalLeads;
