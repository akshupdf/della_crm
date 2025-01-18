import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Table, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {  addMember, fetchMember } from "../redux/appSlice";
import MembershipForm from "./MemberForm";

const { Option } = Select;

const AddMember = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { members, loading } = useSelector((state) => state.user);

  // Fetch leads once when the component mounts
  useEffect(() => {
    dispatch(fetchMember());
  }, [dispatch]);

  // Memoize columns
  const columns = useMemo(
    () => [
        { title: "Member Name", dataIndex: "memberName1", key: "memberName1" },
        { title: "Partner Name", dataIndex: "partnerName", key: "partnerName" },
        { title: "Mobile", dataIndex: "mobile", key: "mobile" },
        { title: "Membership Period", dataIndex: "membershipPeriod", key: "membershipPeriod" },
        { title: "Membership Price", dataIndex: "membershipPrice", key: "membershipPrice" },
        { title: "Package Type", dataIndex: "packageType", key: "packageType" },
        { title: "Privilege Club", dataIndex: "privilegeClub", key: "privilegeClub",
          render : (value) => (value ? "Yes" : "No")
         },
        { title: "Gym", 
          dataIndex: "gym", 
          key: "gym", 
          render: (value) => (value ? "Yes" : "No") 
        },
        { title: "Purchased Price", dataIndex: "purchasedPrice", key: "purchasedPrice" },
        { title: "Down Payment", dataIndex: "downPayment", key: "downPayment" },
        { title: "Balance", dataIndex: "balance", key: "balance" },
        { title: "Mode of Payment", dataIndex: "modeOfPayment", key: "modeOfPayment" },
        { title: "Sales Rep", dataIndex: "saleRep", key: "saleRep" },
        { title: "Manager", dataIndex: "manager", key: "manager" },
        { title: "Branch In Charge", dataIndex: "branchInCharge", key: "branchInCharge" },
        { title: "Agreement Number", dataIndex: "agreementNumber", key: "agreementNumber" },
        { title: "AMC", dataIndex: "amc", key: "amc" },
    ],
    []
  );

  // Memoize leads data
  const memoizedLeads = useMemo(() => members, [members]);

  // Handle modal visibility
  const showModal = useCallback(() => setIsModalOpen(true), []);
  const handleCancel = useCallback(() => setIsModalOpen(false), []);

  // Handle lead submission
  const handleLeadSubmit = useCallback(
    async (formData) => {
      try {
        await dispatch(addMember(formData));
        dispatch(fetchMember());
        setIsModalOpen(false);
      } catch (error) {
        console.error("Failed to add lead:", error);
      }
    },
    [dispatch]
  );

  // Handle status change
//   const handleStatusChange = useCallback(
//     async (leadId, newStatus) => {
//       try {
//         await dispatch(updateStatus({ leadId, newStatus })).unwrap();
//         dispatch(fetchMember());
//       } catch (error) {
//         console.error("Failed to update status:", error);
//       }
//     },
//     [dispatch]
//   );

  const skeletonRows = Array.from({ length: members?.length < 6 ? members?.length : 6  });

  return (
    <div className="w-auto mt-10 members">
      <h1 className="text-4xl text-center w-full pb-4 font-semibold">
        Add Member
      </h1>

      {loading ? (
        <div className="loading-placeholder">
          <table
        className="min-w-full w-auto bg-white"
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

      <button type="primary" onClick={showModal} className="mt-4">
        Add Member
      </button>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width="80%"
        style={{ top: 20 }}
      >
        <MembershipForm onSubmit={handleLeadSubmit} />
      </Modal>
    </div>
  );
};

export default AddMember;
