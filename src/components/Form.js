import { Form, Input, Select, DatePicker, TimePicker, Button, Card, Row, Col } from 'antd';
import { fetchLeads } from '../redux/appSlice';
import { useDispatch } from 'react-redux';

const { Option } = Select;

const LeadForm = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const locations = ['Pune', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata'];

  const holidayDestinations = ['Goa', 'Kerala', 'Manali', 'Ladakh', 'Thailand', 'Singapore', 'Dubai'];

  const professions = ['Service', 'Business', 'Self-employed', 'Professional', 'Other'];

  const incomeRanges = ['blw 50k', 'abv 50k', '50k-1L', '1L-2L', 'abv 2L'];


  const handleSubmit = (values) => {
    const formattedValues = {
      ...values,
      date: values.date ? values.date.format('YYYY-MM-DD') : null,
      time: values.time ? values.time : null,
      status:"new",
    };
    onSubmit(formattedValues);
  };

  return (
    <Card title="Add New Lead" className="w-[90vw] border-none ">
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
              <Input placeholder="Enter time" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="executive" label="Executive">
              <Input placeholder="Enter executive name" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="tlManager" label="TL Manager">
              <Input placeholder="Enter TL manager name" />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="end" gutter={16}>
          {/* Submit and Cancel Buttons */}
          <Col>
            <button onClick={() => form.resetFields()} type="default">
              Cancel
            </button>
          </Col>
          <Col>
            <button type="primary" htmlType="submit">
              Submit Lead
            </button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default LeadForm;
