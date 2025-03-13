import { Select } from "antd";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBenefits, fetchClubBenefits, updateBenStatus, updateTravStatus } from "../redux/appSlice";


const TravelPackages = ({activeTab, setActiveTab ,searchId}) => {

  const {  benefits, loading} = useSelector((state) => state.user);
  const {clubbenefits  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const options = [
    { value: "new", label: "new" },
    { value: "pending", label: "pending" },
    { value: "rejected", label: "rejected" },
    { value: "accepted", label: "accepted" },
  ];

      const handleTravStatusChange = useCallback(
        async (leadId, newStatus) => {
          try {
  
         
            await dispatch(updateTravStatus({ leadId, newStatus })).unwrap();
            dispatch(fetchBenefits(searchId));
            alert("Status updated successfully");
            
          } catch (error) {
            console.error("Failed to update status:", error);
          }
        },
        [dispatch]
      );

          const handleClubStatusChange = useCallback(
            async (leadId, newStatus) => {
              try {             
                await dispatch(updateBenStatus({ leadId, newStatus })).unwrap();
                dispatch(fetchClubBenefits(searchId));
                alert("Status updated successfully");
                
              } catch (error) {
                console.error("Failed to update status:", error);
              }
            },
            [dispatch]
          );


  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 mx-2 rounded-t-lg ${
            activeTab === "travel" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("travel")}
        >
          Travel Benefits
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded-t-lg ${
            activeTab === "club" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("club")}
        >
          Club Benefits
        </button>
      </div>

      {loading ? (
        "Loading..."
      ) : 
    
            ( activeTab === "travel" ? 
              
              (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {
  benefits?.map((packageData) => (
    <div key={packageData.id} className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-bold text-blue-600 mb-4">{packageData.name}</h3>

    
        <div className="mb-4">
          <div className="flex justify-between">
            <h4 className="font-semibold text-gray-700 mb-2">Travel Details</h4>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <p><strong>Travelling:</strong> {packageData.travelling}</p>
            <div className="flex">
              <strong>Status:</strong>
              <Select
                placeholder="Select Status"
                options={options.map((option) => ({
                  label: option.label,
                  value: option.value,
                }))}
                value={packageData.trav_status}
                onChange={(value) => {
                  handleTravStatusChange(packageData._id, value);
                }}
                className="w-[15vh] ml-10"
              />
            </div>
            <p><strong>Pick-Up & Drop:</strong> {packageData.pickUpDrop}</p>
            <p><strong>Accommodation:</strong> {packageData.accommodation}</p>
            <p><strong>Food:</strong> {packageData.food}</p>
            <p><strong>Sightseeing:</strong> {packageData.sightseeing}</p>
          </div>
        </div>
        
        </div> )) }

        </div> 
        
      )
  
       : (
        // Club Benefits section - wrapped in a single div
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Club Benefits</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clubbenefits.length > 0 && clubbenefits?.map((data) => (
             <div key={data.id} className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex">
              <strong>Status:</strong>
              <Select
                placeholder="Select Status"
                options={options.map((option) => ({
                  label: option.label,
                  value: option.value,
                }))}
                value={data.ben_status}
                onChange={(value) => {
                  handleClubStatusChange(data._id, value);
                }}
                className="w-[15vh] ml-10"
              />
            </div>
                <p><strong>Medical:</strong> {data.medicalFacilities}</p>
                <p><strong>Games:</strong> {data.games}</p>
                <p><strong>Gym:</strong> {data.gym}</p>
                <p><strong>Movies:</strong> {data.movie}</p>
                <p><strong>Anniversary Dinner:</strong> {data.anniversaryDinner}</p>
                <p><strong>Events:</strong> {data.events}</p>
              </div>
            ))}
          </div>
        </div>
      )
            )
            

  
}

</div> )
};

export default TravelPackages;
