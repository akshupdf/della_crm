import { Form, Input, Select, DatePicker, Card, Row, Col } from 'antd';
import { addLead, fetchLeads, fetchUsersTl } from '../redux/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';

const { Option } = Select;

const LeadForm = () => {
  const [form] = Form.useForm();
  const { usersByTL } = useSelector((state) => state.user);
  const { id} = useAuth();

  const name = localStorage.getItem('name');

    const dispatch = useDispatch();

      useEffect(() => {
         
            dispatch(fetchUsersTl(id));
          
          }, [id,dispatch]);

  const locations = ['Pune', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata'];

  const holidayDestinations = ['Goa', 'Kerala', 'Manali', 'Ladakh', 'Thailand', 'Singapore', 'Dubai'];

  const professions = ['Service', 'Business', 'Self-employed', 'Professional', 'Other'];

  const incomeRanges = ['blw 50k', 'abv 50k', '50k-1L', '1L-2L', 'abv 2L'];

    const handleLeadSubmit = useCallback(
      async (formData) => {
        try {
          await dispatch(addLead(formData));
          dispatch(fetchLeads());
          alert('Lead added successfully!');
          form.resetFields();
        } catch (error) {
          console.error("Failed to add lead:", error);
        }
      },
      [form,dispatch]
    );


  const handleSubmit = (values) => {
    const formattedValues = {
      ...values,
      date: values.date ? values.date.format('YYYY-MM-DD') : null,
      time: values.time ? values.time : null,
      status:"new",
      tl: id
    };
    handleLeadSubmit(formattedValues);
  };

  return (
    <Card title="Add New Lead" className="w-auto mt-10 border-none ">
      <Form
        form={form}
        layout="vertical" // Keeps labels above inputs for clarity
        onFinish={handleSubmit}
        initialValues={{
          date: null,
          car: 'no',
          creditCard: 'no',
          status: 'new',
        }}
      >
        <Row gutter={16}>
          {/* Row 1 */}
          <Col span={8}>
            <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select a date!' }]}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="location" label="Location" rules={[{ required: true, message: 'Please select a location!' }]}>
              <Select placeholder="Select location">
                {locations.map((location) => (
                  <Option key={location} value={location}>
                    {location}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the name!' }]}>
              <Input placeholder="Enter name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* Row 2 */}
          <Col span={8}>
            <Form.Item name="phone1" label="Phone 1" rules={[{ required: true, message: 'Please enter the phone number!' }]}>
              <Input placeholder="Enter primary phone number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="phone2" label="Phone 2">
              <Input placeholder="Enter secondary phone number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="emailId" label="Email ID">
              <Input placeholder="Enter email ID" type="email" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* Row 3 */}
          <Col span={8}>
            <Form.Item name="age" label="Age">
              <Input placeholder="Enter age" type="number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="profession" label="Profession" rules={[{ required: true, message: 'Please select a profession!' }]}>
              <Select placeholder="Select profession">
                {professions.map((profession) => (
                  <Option key={profession} value={profession}>
                    {profession}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="income" label="Income" rules={[{ required: true, message: 'Please select an income range!' }]}>
              <Select placeholder="Select income range">
                {incomeRanges.map((range) => (
                  <Option key={range} value={range}>
                    {range}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* Row 4 */}
          <Col span={8}>
            <Form.Item name="lastHoliday" label="Last Holiday">
              <Select placeholder="Select last holiday destination">
                {holidayDestinations.map((destination) => (
                  <Option key={destination} value={destination}>
                    {destination}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="car" label="Has Car">
              <Select>
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="creditCard" label="Has Credit Card">
              <Select>
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* Row 5 */}
          <Col span={8}>
            {/* <Form.Item name="time" label="Time" rules={[{ required: true, message: 'Please select a time!' }]}>
              <TimePicker style={{ width: '100%' }} />
            </Form.Item> */}
            <Form.Item name="time" label="time">
            <Select>
                <Option value="12.00 AM - 2.00 PM">12.00 PM - 2.00 PM</Option>
                <Option value="2.00 PM - 4.00 PM">2.00 PM - 4.00 PM</Option>
                <Option value="4.00 PM - 6.00 PM">4.00 PM - 6.00 PM</Option>
                <Option value="6.00 PM - 8.00 PM">6.00 PM - 8.00 PM</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item
              name="executive"
              label="Executive"
            >
            <Select
                showSearch
                placeholder="Select executive"
                filterOption={(input, option) =>
                  option?.children?.toLowerCase().includes(input?.toLowerCase())
                }
              >
                {usersByTL?.map((user) => (
                  <Option key={user.name} value={user.name}>
                    {user.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item name="tlManager" label="TL Manager" initialValue={name}>
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="end" gutter={16}>
          {/* Submit and Cancel Buttons */}
          <Col>
            <button onClick={() => form.resetFields()} type="default" className='border border-black p-2 rounded-lg'>
              Cancel
            </button>
          </Col>
          <Col>
            <button type="primary" htmlType="submit" className='border border-black p-2 rounded-lg'>
              Submit Lead
            </button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default LeadForm;
