import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLead, fetchLeads, updateStatus } from "../redux/appSlice";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "./AuthContext";
import { Table, Select, Modal, Input, Form } from "antd";

const { Option } = Select;

const Deal = () => {

   const dispatch = useDispatch();
   const {id } = useAuth();
   const { leads, loading } = useSelector((state) => state.user);
   const [datav2,setDatav2] = useState({ _id: "" , manager : "" , salesRep : "" , });

   
 
   let data = {
    id: id
   }
   // Fetch leads once when the component mounts
   useEffect(() => {

     dispatch(fetchLeads(data));
   }, [dispatch]);


   const [isModalVisible, setIsModalVisible] = useState(false);
   const [selectedDeal, setSelectedDeal] = useState(null);
   const [form] = Form.useForm();
 
   // Show the modal for the selected deal
   const showModal = (deal) => {
     setSelectedDeal(deal);
     setIsModalVisible(true);
   };
 
   // Handle modal cancel
   const handleCancel = () => {
     setIsModalVisible(false);
     form.resetFields();
   };
 
   // Handle modal form submission
   const handleOk = () => {
     form
       .validateFields()
       .then((values) => {
         console.log("Submitted values:", values);
 
         // Update the deal's status in the table (optional)
        //  setDeals((prevDeals) =>
        //    prevDeals.map((deal) =>
        //      deal.id === selectedDeal.id
        //        ? { ...deal, status: "Confirmed" }
        //        : deal
        //    )
        //  );
 
         setIsModalVisible(false);
         form.resetFields();
       })
       .catch((info) => {
         console.log("Validation failed:", info);
       });
   };

   

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
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => {
        return record.status === "confirmed" ? ( // Show inputs only if status is "Confirmed"
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Input
              placeholder="Sales Rep."
              value={record.sale_executive}
              onChange={(e) => handleInputChange(record._id, "sale_executive", e.target.value)}
            />
            <Input
              placeholder="Sales TL"
              value={record.sale_tl}
              onChange={(e) => handleInputChange(record._id, "salesTL", e.target.value)}
            />
            <button type="button" onClick={() => handleSubmit(record._id)}>
              Submit
            </button>
          </div>
        ) : (
          <span>Status: {record.status}</span> // Optionally show the status if it's not "Confirmed"
        );
      }}
  ];

  // Handle status change
    const handleStatusChange = useCallback(
      async (leadId, newStatus) => {
        try {

          if(newStatus === "Confirmed"){
            
            setIsModalVisible(true);
          }else{
          await dispatch(updateStatus({ leadId, newStatus })).unwrap();
          dispatch(fetchLeads());
          alert("Status updated successfully");
          }
        } catch (error) {
          console.error("Failed to update status:", error);
        }
      },
      [dispatch]
    );

    //Handle input change

    const handleInputChange = (id, field, value) => {
      setDatav2((prev) => ({
        ...prev,
        _id: id,
        [field]: value,
      }));
    };

    const handleSubmit = (id) => {
      // const record = datav2.find((item) => item._id === id);
      // console.log("Submitted Data:", {
      //   salesRep: record.salesRep,
      //   manager: record.manager,
      // });

      console.log(datav2);
      
      // Add your API call or other submission logic here
    };


  return (
    <div className="px-8 rounded-2xl mt-10">

        <h1 className="text-4xl  text-center w-full  pb-4 font-semibold">Deals</h1>
     
     <Table columns={columns} dataSource={leads} rowKey="id" pagination={{ pageSize: 10 }} className="rounded-2xl"/>


     <ToastContainer  containerId={"deal"} />

     {/* <Modal
        title={`Update Deal`}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="teamLeadName"
            label="Team Lead Name"
            rules={[{ required: true, message: "Please enter the team lead name" }]}
          >
            <Input placeholder="Enter team lead name" />
          </Form.Item>

          <Form.Item
            name="salesAgentName"
            label="Sales Agent Name"
            rules={[
              { required: true, message: "Please enter the sales agent name" },
            ]}
          >
            <Input placeholder="Enter sales agent name" />
          </Form.Item>

          <Form.Item
            name="remark"
            label="Remark"
            rules={[{ required: true, message: "Please enter a remark" }]}
          >
            <Input.TextArea placeholder="Enter remark" />
          </Form.Item>
        </Form>
      </Modal> */}
     
    </div>
  );
};

export default Deal;
