import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Table, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {   findMember } from "../redux/appSlice";
import MembershipForm from "./MemberForm";

const { Option } = Select;

const CustomerCare = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { members, loading } = useSelector((state) => state.user);
  const [searchId, setSearchId] = useState("");



  // Fetch leads once when the component mounts
  // useEffect(() => {
  //   dispatch(findMember(searchQuery));
  // }, [searchQuery,dispatch]);

  const handleSearchById = () => {
    if (searchId.trim()) {
      dispatch(findMember({ id: searchId.trim() })); // Pass the ID to the action
    }
  };

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
        // { title: "AMC", dataIndex: "amc", key: "amc" },
        {title :"Payment Proof", dataIndex:"paymentProof", key:"paymentProof", 
           render: (proof, record) => (
            proof && <a href={`${proof}`} target="_blank">Payment proof</a>
                ), },
        {title :"Member Kyc", dataIndex:"memberKyc", key:"memberKyc" ,  
          render: (proof, record) => (
          proof && <a href={`${proof}`} target="_blank">Member Kyc</a>
              ),},
        {title :"Digital Signature", dataIndex:"digitalSignature", key:"digitalSignature",
          render: (proof, record) => (
            proof && <a href={`${proof}`} target="_blank">Digital Signature</a>
                )
         },
    ],
    []
  );

  // Memoize leads data
  const memoizedLeads = useMemo(() => members, [members]);

  const skeletonRows = Array.from({ length: members?.length < 6 ? members?.length : 6  });

  return (
    <div className="w-auto mt-10 members">
      <h1 className="text-4xl text-center w-full pb-4 font-semibold">
        Members
      </h1>

      <div className="flex justify-center items-center mb-4 space-x-2">
        <input
          type="text"
          placeholder="Enter Member ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-1/3"
        />
        <button
          onClick={handleSearchById}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </div>

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

    </div>
  );
};

export default CustomerCare;
