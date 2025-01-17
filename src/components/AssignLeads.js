import React, { useState , useEffect } from "react";
import { Select, List, Card } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { assignTo, fetchLeadsbyLocation, fetchUsersbyRole } from '../redux/appSlice';

const { Option } = Select;

const AssignLeads = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedReceptionist, setSelectedReceptionist] = useState(null);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [selectedLeadIds, setSelectedLeadIds] = useState([]);

  const dispatch = useDispatch();

  const { leadsLoc,usersByRoledata , loading} = useSelector((state) => state.user);

//   console.log(usersByRoledata,'usersByRoledata');
  

    useEffect(() => {
     
        dispatch(fetchLeadsbyLocation(selectedCity));
        dispatch(fetchUsersbyRole("reception"));
      
      }, [selectedCity,dispatch]);

  // Cities and Receptionists Data
  const cities = [...new Set(leadsLoc.map((lead) => lead.location))];

  // Handle City Selection
  const handleCityChange = (city) => {
    setSelectedCity(city);
    const filtered = leadsLoc.filter((lead) => lead.location === city);
    setFilteredLeads(filtered);
    setSelectedLeadIds([]); // Reset selected leads
  };
 

  // Handle Receptionist Selection
  const handleReceptionistChange = (id) => {
    setSelectedReceptionist(id);
  };

  // Handle Assign Action
  const handleAssign = async () => {
    if (!selectedReceptionist || selectedLeadIds.length === 0) {
      return alert("Please select a receptionist and at least one lead!");
    }

    const payload = {
      assigns: selectedLeadIds,
      userId: selectedReceptionist,
    };

    // console.log(payload);
    
 await dispatch(assignTo(payload));
    
    alert("Leads assigned successfully!");
    window.location.reload();
  };

  // Toggle Lead Selection
  const toggleLeadSelection = (id) => {
    setSelectedLeadIds((prev) =>
      prev.includes(id) ? prev.filter((leadId) => leadId !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex mt-12 gap-10">
      {/* Left Panel */}
      <div style={{ flex: 1 }}>
        <h3>Select City</h3>
        <Select
          style={{ width: "100%" }}
          placeholder="Select a city"
          onChange={handleCityChange}
        >
          {cities.map((city) => (
            <Option key={city} value={city}>
              {city}
            </Option>
          ))}
        </Select>

        <h3 style={{ marginTop: "20px" }}>Select Receptionist</h3>
        <Select
          style={{ width: "100%" }}
          placeholder="Select a receptionist"
          onChange={handleReceptionistChange}
        >
          {usersByRoledata?.map((receptionist) => (
            <Option key={receptionist._id} value={receptionist._id}>
              {receptionist.username}
            </Option>
          ))}
        </Select>
      </div>

      {/* Right Panel */}
      <div style={{ flex: 2 }}>
        <h3>Leads</h3>
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={filteredLeads}
          renderItem={(lead) => (
            <List.Item>
              <Card
                title={lead.name}
                style={{
                  backgroundColor: selectedLeadIds.includes(lead._id)
                    ? "#e6f7ff"
                    : "#fff",
                }}
                onClick={() => toggleLeadSelection(lead._id)}
              >
                <p>Email: {lead.emailId}</p>
                <p>Phone: {lead.phone1}</p>
                <p>Status: {lead.status}</p>
              </Card>
            </List.Item>
          )}
        />
        {filteredLeads.length > 0 && (
          <button
            type="primary"
            style={{ marginTop: "20px" }}
            onClick={handleAssign}
            disabled={!selectedReceptionist || selectedLeadIds.length === 0}
          >
            Assign Leads
          </button>
        )}
      </div>
    </div>
  );
};

export default AssignLeads;


