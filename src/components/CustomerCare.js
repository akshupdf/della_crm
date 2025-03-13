import React, { useEffect, useState, useMemo, useCallback, act } from "react";
import { Table, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {   fetchBenefits, fetchClubBenefits, findMember } from "../redux/appSlice";
import MembershipForm from "./MemberForm";
import TravelForm from "./MerberDetails";
import TravelPackages from "./taskBox";

const { Option } = Select;

const CustomerCare = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { members, loading } = useSelector((state) => state.user);
  const [searchId, setSearchId] = useState("");
  // const showModal = useCallback(() => setIsModalOpen(true), []);
  const handleCancel = useCallback(() => setIsModalOpen(false), []);
  const [travelStatus, setTravelStatus] = useState("");
    const [activeTab, setActiveTab] = useState("travel");


  const handleSearchById = useCallback(() => {
    if (searchId.trim() ) {
      dispatch(findMember({ id: searchId.trim() }));
      dispatch(fetchBenefits(searchId));
      dispatch(fetchClubBenefits(searchId));
    }
  }, [searchId, dispatch, loading ]); 

  const showModal = (status) => {
    setIsModalOpen(true);
    setTravelStatus(status);
  };

  useEffect(() => {

    if(activeTab === "travel") {
      dispatch(fetchBenefits(searchId));
    }else{ 
    dispatch(fetchClubBenefits(searchId));
    }
  }, [activeTab]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-auto mt-10 members">
      <h1 className="text-4xl text-center w-full pb-4 font-semibold">
       Search Member
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
          onClick={() => handleSearchById()}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </div>

      <div className=" flex flex-wrap justify-center p-4">
      {members?.map((member) => (
     <div
     key={member._id}
     className="border p-4 rounded-lg shadow-md w-full h-[60vh] flex flex-shrink flex-col"
   >
     <div className="flex flex-wrap h-full">
       {/* Left Column */}
       <div className="w-1/2 flex flex-col p-2">
         {Object.entries(member)
           .slice(0, Math.ceil(Object.entries(member).length / 2))
           .map(([key, value]) => (
             <div key={key} className="flex p-2 rounded-xl mb-2">
               <h1 className="w-[40%] font-semibold">{key.replace(/([A-Z])/g, " $1").toUpperCase()}:</h1>
               <div className="w-[60%]">{String(value)}</div>
             </div>
           ))}
       </div>
   
       {/* Right Column */}
       <div className="w-1/2 flex flex-col p-2">
         {Object.entries(member)
           .slice(Math.ceil(Object.entries(member).length / 2))
           .map(([key, value]) => (
             <div key={key} className="flex p-2 rounded-xl mb-2">
               <h1 className="w-[40%] font-semibold">{key.replace(/([A-Z])/g, " $1").toUpperCase()}:</h1>
               <div className="w-[60%]">{String(value)}</div>
             </div>
           ))}
       </div>
     </div>
   </div>
      ))}
    </div>

    {
        searchId && 
<div> 

{/* <button type="primary" onClick={() => showModal("both")} className="mt-4 p-4 m-4 shadow-xl" >
        Add Services
      </button> */}

      <button type="primary" onClick={() => showModal("travel")} className="mt-4 p-4 m-4 shadow-xl" >
        Add Travel Benefits
      </button>

      <button type="primary" onClick={() => showModal("club")} className="mt-4 p-4 m-4 shadow-xl" >
        Add Club Benefits
      </button>
</div>
      
    }
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width="80%"
        style={{ top: 20 }}
      >
        <TravelForm  searchId={searchId} handleCancel={handleCancel} travelStatus={travelStatus}/>
      </Modal>
     
      {
        searchId && 
      
      <TravelPackages activeTab={activeTab} setActiveTab={setActiveTab} searchId={searchId} />
      }
    </div>
  );
};

export default CustomerCare;
