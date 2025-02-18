import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, button, Card, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { uploadImg } from '../redux/appSlice';

const { Option } = Select;

const MembershipForm = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [kidsAges, setKidsAges] = useState([]);
  const [packagePrice, setPackagePrice] = useState(1666); 
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl1, setImageUrl1] = useState(null);
  const [imageUrl2, setImageUrl2] = useState(null);
  const [imageUrl3, setImageUrl3] = useState(null);

  const dispatch = useDispatch();


  const handleSubmit = (values) => {

    const formattedValues = {
      ...values,
      date: values.date ? values.date.format('YYYY-MM-DD') : null,
      time: values.time ? values.time : null,
      paymentProof: imageUrl1,
      memberKyc: imageUrl2,
      digitalSignature: imageUrl3,
      status:"new",
    };
    // console.log(formattedValues);
    
    onSubmit(formattedValues);
    form.resetFields();
  };

    // Handle selecting the number of adults
    const handleAdultsChange = (e) => {
      setAdults(e.target.value);
    };
  
    // Handle selecting the number of kids and their ages
    const handleKidsChange = (e) => {
      const value = e.target.value;
      setKids(value);
      setKidsAges(Array.from({ length: value }, (_, i) => ''));
    };
  
    // Handle kids' ages input
    const handleKidsAgesChange = (e, index) => {
      const newAges = [...kidsAges];
      newAges[index] = e.target.value;
      setKidsAges(newAges);
    };
  
    // Calculate price based on the number of adults and kids
    const calculatePrice = () => {
      let basePrice = 0;

      const numAdults = Number(adults);
      const numKids = Number(kids);
      
  
      if (numAdults === 1 && numKids === 2) {
        basePrice = 1666; // Studio package
      } else if (numAdults === 1 && numKids > 2) {
        basePrice = 2666; // Executive package
      } else if (numAdults === 2 && numKids <= 2) {
        basePrice = 2666; // Executive package
      } else if (numAdults === 2 && numKids > 2) {
        basePrice = 3666; // Royal package
      } else if (numAdults === 3 && numKids <= 2) {
        basePrice = 3666; // Royal package
      }      
  
      setPackagePrice(basePrice);
    };

  
    const handleImageUpload = async (info, setImageUrl) => {
      setLoading(true);
  
      const formData = new FormData();
      formData.append('file', info.file);
      
      try {
        const response = await dispatch(uploadImg(formData)); // Adjust `uploadImg` if needed for API calls.
       
        
        setImageUrl(response?.payload?.url);
        info.onSuccess(response, info.file);
      } catch (error) {
        console.error('Upload failed:', error);
        info.onError(error);
      } finally {
        setLoading(false);
      }
    };
  

  return (
    <Card title="Membership Details" style={{ maxWidth: 800, margin: '0 auto' }}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Personal Details */}
        <h3>Personal Details</h3>
        <Form.Item name="memberName1" label="Member Name" rules={[{ required: true, message: 'Please enter member name!' }]}>
          <Input placeholder="Enter member name" />
        </Form.Item>
        <Form.Item name="partnerName" label="Partner Name">
          <Input placeholder="Enter partner name" />
        </Form.Item>
        <Form.Item name="mobile" label="Mobile No" rules={[{ required: true, message: 'Please enter mobile number!' }]}>
          <Input placeholder="Enter mobile number" />
        </Form.Item>

        {/* Membership Details */}
        <h3>Membership Details</h3>
        <Form.Item name="membershipPeriod" label="Membership Period" rules={[{ required: true, message: 'Please select membership period!' }]}>
          <Select>
            <Option value="1_year">1 Year</Option>
            <Option value="3_years">3 Years</Option>
            <Option value="5_years">5 Years</Option>
            <Option value="10_years">10 Years</Option>
          </Select>
        </Form.Item>
        <Form.Item name="membershipPrice" label="Membership Price" rules={[{ required: true, message: 'Please enter membership price!' }]}>
          <Input placeholder="Enter membership price" />
        </Form.Item>

        <Form.Item name="membershipType" label="Membership Type" rules={[{ required: true, message: 'Please select membership Type!' }]}>
          <Select>
            <Option value="1_year">Studio</Option>
            <Option value="3_years">Executive</Option>
            <Option value="5_years">Royal</Option>
          </Select>
        </Form.Item>
        {/* <Form.Item name="membershipType" label="Membership Type" rules={[{ required: true, message: 'Please select membership period!' }]}>
          <Select>
            <Option value="1_year">1 Year </Option>
            <Option value="3_years">3 Years</Option>
            <Option value="5_years">5 Years</Option>
            <Option value="10_years">10 Years</Option>
          </Select>
        </Form.Item>
        <Form.Item name="membershipType" label="Membership Type" rules={[{ required: true, message: 'Please enter membership Type!' }]}>
          <Input placeholder="Enter membership Type" />
        </Form.Item> */}
        <Form.Item name="packageType" label="Package Type" rules={[{ required: true, message: 'Please select package type!' }]}>
          <Select>
            <Option value="domestic_only">Domestic Only</Option>
            <Option value="india_international">India + International</Option>
          </Select>
        </Form.Item>
        <Form.Item name="privilegeClub" label="Privilege Club" rules={[{ required: true }]}>
          <Select>
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </Form.Item>
        <Form.Item name="gym" label="Gym Access" rules={[{ required: true }]}>
          <Select>
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </Form.Item>

        {/* Payment Details */}
        <h3>Payment Details</h3>
        <Form.Item name="purchasedPrice" label="Purchased Price" rules={[{ required: true, message: 'Please enter purchased price!' }]}>
          <Input placeholder="Enter purchased price" />
        </Form.Item>
        <Form.Item name="downPayment" label="Down Payment">
          <Input placeholder="Enter down payment" />
        </Form.Item>
        <Form.Item name="balance" label="Balance">
          <Input placeholder="Enter balance amount" />
        </Form.Item>
        <Form.Item name="modeOfPayment" label="Mode of Payment">
          <Input placeholder="Enter mode of payment" />
        </Form.Item>

        {/* Sales Details */}
        <h3>Sales Details</h3>
        <Form.Item name="saleRep" label="Sales Representative">
          <Input placeholder="Enter sales representative name" />
        </Form.Item>
        <Form.Item name="manager" label="Manager">
          <Input placeholder="Enter manager name" />
        </Form.Item>
        <Form.Item name="branchInCharge" label="Branch In-Charge">
          <Input placeholder="Enter branch in-charge name" />
        </Form.Item>

        {/* Proofs and Agreements */}
        {/* <h3>Proofs and Agreements</h3> */}
        <Form.Item label="Payment Proof">
          <Upload
            customRequest={(info) => handleImageUpload(info, setImageUrl1)}
            listType="picture-card"
            showUploadList={false}
          >
            {imageUrl1 ? (
              <img src={imageUrl1} alt="Uploaded" style={{ width: '100%' , height: '90%'}} />
            ) : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>{loading ? 'Uploading...' : 'Click to Upload'}</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item label="Member Kyc proof">
          <Upload
            customRequest={(info) => handleImageUpload(info, setImageUrl2)}
            listType="picture-card"
            showUploadList={false}
          >
            {imageUrl2 ? (
              <img src={imageUrl2} alt="Uploaded" style={{ width: '100%' , height: '90%' }} />
            ) : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>{loading ? 'Uploading...' : 'Click to Upload'}</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item label="Digital Signature">
          <Upload
            customRequest={(info) => handleImageUpload(info, setImageUrl3)}
            listType="picture-card"
            showUploadList={false}
          >
            {imageUrl3 ? (
              <img src={imageUrl3} alt="Uploaded" style={{ width: '100%' , height: '90%' }} />
            ) : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>{loading ? 'Uploading...' : 'Click to Upload'}</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        {/* <Form.Item name="digitalSignature" label="Digital Signature">
          <Upload>
            <button icon={<UploadOutlined />}>Upload Digital Signature</button>
          </Upload>
        </Form.Item> */}
        <Form.Item name="agreementNumber" label="Agreement Number">
          <Input placeholder="Enter agreement number" />
        </Form.Item>

        <div>
      <h3>Room Booking</h3>
      
      <label>
        Adults:
        <select value={adults} onChange={handleAdultsChange}>
          <option value={1}>1 Adult</option>
          <option value={2}>2 Adults</option>
          <option value={3}>3 Adults</option>
        </select>
      </label>
      
      <br />
      
      <label>
        Kids:
        <select value={kids} onChange={handleKidsChange}>
          <option value={0}>0 Kids</option>
          <option value={1}>1 Kid</option>
          <option value={2}>2 Kids</option>
          <option value={3}>3 Kids</option>
          <option value={4}>4 Kids</option>
        </select>
      </label>
      
      {/* {kids > 0 && (
        <div>
          <h4>Enter Kids' Ages:</h4>
          {Array.from({ length: kids }).map((_, index) => (
            <div key={index}>
              <label>
                Kid {index + 1} Age:
                <input
                  type="number"
                  value={kidsAges[index]}
                  onChange={(e) => handleKidsAgesChange(e, index)}
                  min="0"
                />
              </label>
            </div>
          ))}
        </div>
      )} */}

      <br />
      
      <button onClick={calculatePrice} type='button' className='w-auto p-2 border border-black m-2 rounded-sm'>Calculate Price</button>

      <h4>Selected Package Price: ₹{packagePrice} per night</h4>
    </div>

        {/* Submit */}
        <Form.Item>
          <button type="primary" htmlType="submit" className='w-auto p-2 border border-black m-2 rounded-sm bg-black text-white'>
            Submit
          </button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default MembershipForm;
