import React, { useEffect, useMemo, useCallback } from "react";
import { Table, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {  fetchLeads, updateStatus } from "../redux/appSlice";

const { Option } = Select;

const TelecallingDashboard = () => {
  const dispatch = useDispatch();
  const { leads, loading ,usersByRole } = useSelector((state) => state.user);


  // Fetch leads once when the component mounts
  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

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
      { title: "Reason", dataIndex: "reason", key: "reason" },
    ],
    []
  );

  // Memoize leads data
  const memoizedLeads = useMemo(() => leads, [leads]);

  // Handle status change
  const handleStatusChange = useCallback(
    async (leadId, newStatus) => {
      try {
        await dispatch(updateStatus({ leadId, newStatus })).unwrap();
        dispatch(fetchLeads());
      } catch (error) {
        console.error("Failed to update status:", error);
      }
    },
    [dispatch]
  );

  const skeletonRows = Array.from({ length: leads?.length < 6 ? leads?.length : 6  });

  return (
    <div className="dashboard mt-10">
      <h1 className="text-4xl text-center w-full pb-4 font-semibold">
        Telecalling Dashboard
      </h1>

      {loading ? (
        <div className="loading-placeholder">
          <table
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
      </table>
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={memoizedLeads}
          rowKey="_id"
          pagination={{ pageSize: 9 }}
          scroll={{ y: 400 }} // Enable virtual scrolling
          loading={loading}
        />
      )}

      {/* <button type="primary" onClick={showModal} className="mt-4">
        Add Lead
      </button> */}

      {/* <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width="80%"
        style={{ top: 20 }}
      >
        <LeadForm onSubmit={handleLeadSubmit} />
      </Modal> */}
    </div>
  );
};

export default TelecallingDashboard;
