import React, { useEffect, useState } from "react";
import { Card, Modal, Table } from "antd";
import Tlteam from "./Tlteam";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersTl } from "../redux/appSlice";
import { useAuth } from "./AuthContext";


const TeamMember = () => {

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { usersByTL } = useSelector((state) => state.user);

    const { id} = useAuth();
    
  
  
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
     
        dispatch(fetchUsersTl(id));
      
      }, [ dispatch]);



  // const handleLeadSubmit = (formData) => {
  //   setLeads(prevLeads => [...prevLeads, { ...formData, id: prevLeads.length + 1 }]);
  //   setIsModalOpen(false);
  // };

  return (
    <div className="dashboard">
      <div className="p-4 space-y-6 mt-10">
         
      
               <Table
                 className="rounded-md border"
                 dataSource={usersByTL}
                 rowKey="id"
                 pagination={false}
               >
                 <Table.Column title="ID" dataIndex="_id" key="id" />
                 <Table.Column title="Employee Name" dataIndex="username" key="name" />
                 <Table.Column
                   title="Generated Lead"
                   dataIndex="generatedLead"
                   key="generatedLead"
                   align="center"
                 />
                 <Table.Column
                   title="Confirmed Deals"
                   dataIndex="confirmedDeals"
                   key="confirmedDeals"
                   align="center"
                 />
               </Table>
     
               {/* <div className="mt-4 flex justify-between items-center">
                 <button type="dashed" size="small">
                   Add Employee
                 </button>
                 <div className="flex gap-2">
                   <button type="dashed" size="small">
                     ADD Leads
                   </button>
                   <button type="dashed" size="small">
                     Total Leads
                   </button>
                   <button type="dashed" size="small">
                     Confirmed Leads
                   </button>
                   <button type="dashed" size="small">
                     Deal
                   </button>
                   <button type="dashed" size="small">
                     Team Performance
                   </button>
                 </div>
               </div> */}
         
           
         </div>

<div>

  <button className="border border-black p-2" onClick={showModal}>
    Add User
  </button>
</div>




  <Modal
     
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel} 
        footer={null}
      >
        < Tlteam  setIsModalOpen={setIsModalOpen}/> 
      </Modal>


     
    </div>
  );
};

export default TeamMember;
