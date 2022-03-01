import React from 'react';
import { Button, Card, Col, Divider, Empty, Row, Space, Typography } from 'antd';
import { formatDate } from 'src/utils/formatDate';
import { UserOutlined } from '@ant-design/icons';
import { showCancelModal } from './UpdateStatus';
import { Spinner } from 'src/components/Elements';
import { useGetAllBookingsUser } from '../api/getListUser';
import { useDeleteBooking } from '../api/delete';
import styles from '../index.module.scss';
import { useAuth } from 'src/lib/auth';

export const UserBooking = () => {
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

  return (
    <>
      <Card bordered={false}>
        <Space className={styles.sampleCard} size="middle">
          <div>
            <Typography.Title level={4}>All Bookings</Typography.Title>
          </div>
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
    </>
  );
};
