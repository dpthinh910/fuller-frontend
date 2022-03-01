import React from 'react';
import { Button, Card, Col, Divider, Empty, Row, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { showCancelModal } from './UpdateStatus';
import { Spinner } from 'src/components/Elements';
import { CreateBookingModal } from './CreateBooking';
import { useGetAllBookingsUser } from '../api/getListUser';
import { useDeleteBooking } from '../api/delete';
import styles from '../index.module.scss';
import { useAuth } from 'src/lib/auth';

export const UserBooking = () => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const { user } = useAuth();
  const { data, isLoading, isSuccess } = useGetAllBookingsUser({
    userId: user!._id,
    config: { keepPreviousData: true },
  });
  const useDeleteBookingMutation = useDeleteBooking();

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) return null;

  const onCancel = () => {
    setVisible(() => false);
  };

  return (
    <>
      <Card bordered={false}>
        <Space className={styles.sampleCard} size="middle">
          <Typography.Title level={4}>All Bookings</Typography.Title>
          <Button onClick={() => setVisible(true)} type="primary">
            + Create new booking
          </Button>
          <Space split={<Divider type="vertical" />}></Space>
        </Space>
        <Divider />
        <Row gutter={[24, 24]}>
          {isSuccess &&
            data.map((booking, index) => (
              <Col span={24} md={12} xl={6} key={index}>
                <Card
                  key={index}
                  bordered={true}
                  hoverable
                  actions={[
                    <>
                      <Button
                        key="status"
                        size="small"
                        shape="round"
                        type={booking.status == 'pending' ? 'link' : 'text'}
                        disabled={booking.status === 'rejected'}
                      >
                        status: {booking.status}
                      </Button>
                      {booking.status === 'pending' && (
                        <Button
                          onClick={() =>
                            showCancelModal({
                              id: booking._id,
                              deleteMutation: useDeleteBookingMutation,
                              data: booking,
                            })
                          }
                          type="text"
                          danger
                          size="small"
                          shape="round"
                        >
                          Cancel
                        </Button>
                      )}
                    </>,
                  ]}
                >
                  <Card.Meta
                    avatar={<UserOutlined />}
                    title={'Booking details'}
                    description={
                      <>
                        <Typography>Event: {booking.event}</Typography>
                        {booking.location ?? ''}
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
        </Row>
        {data.length === 0 && <Empty />}
      </Card>
      <CreateBookingModal userId={user?._id} visible={visible} onCancel={onCancel} />
    </>
  );
};
