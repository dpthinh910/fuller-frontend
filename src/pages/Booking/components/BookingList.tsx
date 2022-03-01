import React from 'react';
import { Button, Card, Col, Divider, Empty, Input, Row, Space, Switch, Typography } from 'antd';
import { useGetAllBookingsAdmin } from '../api/getListAdmin';
import { formatDate } from 'src/utils/formatDate';
import { DeleteOutlined, PictureFilled, UserOutlined, YoutubeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
// import { showDeleteModal } from './DeleteSample';
// import { showUpdateModal } from './UpdateSample';
import { Spinner } from 'src/components/Elements';
import { useUpdateBooking } from '../api/update';
import styles from '../index.module.scss';

export const BookingList = () => {
  const { data, isLoading, isSuccess } = useGetAllBookingsAdmin({ config: { keepPreviousData: true } });
  const useUpdateBookingMutation = useUpdateBooking();

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
                    <Button
                      // onClick={() =>
                      //   showUpdateModal({
                      //     sampleId: sample.id.toString(),
                      //     updateMutation: useUpdateSampleMutation,
                      //   })
                      // }
                      key="status"
                      size="small"
                      type={booking.status == 'pending' ? 'link' : booking.status == 'rejected' ? 'text' : 'primary'}
                      disabled={booking.status === 'rejected'}
                    >
                      status: {booking.status}
                    </Button>,
                  ]}
                >
                  <Card.Meta
                    avatar={<UserOutlined />}
                    title={booking.owner?.username ?? 'Anonymous'}
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
