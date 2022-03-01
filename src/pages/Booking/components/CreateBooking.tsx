import React from 'react';
import { DatePicker, Form, Input, Modal, notification, Select } from 'antd';
import { useCreateBooking } from '../api/create';

type CreateBookingDTO = {
  userId?: string;
  visible: any;
  onCancel: () => void;
};

export const CreateBookingModal = ({ userId, visible, onCancel }: CreateBookingDTO) => {
  const [form] = Form.useForm();
  const postBookingMutation = useCreateBooking();

  const handleSubmit = async (data: any) => {
    const result = await postBookingMutation.mutateAsync({ data: { ...data, userId } });

    if (!!result) {
      notification.success({ message: 'Created new booking' });
    }
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      title="Create new booking"
      onCancel={onCancel}
      okText="Save"
      okButtonProps={{ shape: 'round' }}
      cancelButtonProps={{ shape: 'round' }}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            handleSubmit(values);
          })
          .catch(error => {
            console.log('Validation failed: ', error);
          });
      }}
      afterClose={() => {
        form.resetFields();
      }}
      destroyOnClose={true}
      getContainer={false}
    >
      <Form key={userId} form={form}>
        <Form.Item required name="event" label="Event" rules={[{ required: true }]}>
          <Select showSearch placeholder="Select an event">
            <Select.Option value="Health Talk">Health Talk</Select.Option>
            <Select.Option value="Wellness Events">Wellness Events</Select.Option>
            <Select.Option value="Fitness Activities">Fitness Activities</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="location" label="Location" rules={[{ required: false }]}>
          <Input />
        </Form.Item>
        <Form.Item required name="firstDate" label="Proposed 1st date">
          <DatePicker showNow showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>
        <Form.Item required name="secondDate" label="Proposed 2nd date">
          <DatePicker showNow showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>
        <Form.Item required name="thirdDate" label="Proposed 3rd date">
          <DatePicker showNow showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
