import { ExclamationCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Modal, notification } from 'antd';

type UpdateBookingDTO = {
  id: string;
  updateMutation: any;
  data: any;
};

type DeleteBookingDTO = {
  id: string;
  deleteMutation: any;
  data: any;
};

export function showApproveModal({ id, updateMutation, data }: UpdateBookingDTO) {
  Modal.confirm({
    title: `Approve Booking for ${JSON.parse(JSON.stringify(data.owner.username))}`,
    icon: <ExclamationCircleOutlined />,
    onOk: async () => {
      const { status, ...rest } = data;
      data = { status: 'approved', ...rest };
      const result = await updateMutation.mutateAsync({ id, data });
      if (!!result) {
        notification.success({
          message: `Approved booking status ${id}`,
        });
      }
      return true;
    },
    closable: true,
    okButtonProps: { shape: 'round' },
    cancelButtonProps: { shape: 'round' },
    maskClosable: true,
    keyboard: true,
    width: 500,
    centered: true,
  });
}

export function showRejectModal({ id, updateMutation, data }: UpdateBookingDTO) {
  Modal.confirm({
    title: `Reject Booking for ${JSON.parse(JSON.stringify(data.owner.username))}`,
    icon: <QuestionCircleOutlined />,
    onOk: async () => {
      const { status, ...rest } = data;
      data = { status: 'rejected', ...rest };
      const result = await updateMutation.mutateAsync({ id, data });
      if (!!result) {
        notification.success({
          message: `Rejected booking status ${id}`,
        });
      }
      return true;
    },
    closable: true,
    okButtonProps: { shape: 'round' },
    cancelButtonProps: { shape: 'round' },
    maskClosable: true,
    keyboard: true,
    width: 500,
    centered: true,
  });
}

export function showCancelModal({ id, deleteMutation, data }: DeleteBookingDTO) {
  Modal.confirm({
    title: `Cancel Booking for ${id}`,
    icon: <ExclamationCircleOutlined />,
    onOk: async () => {
      const result = await deleteMutation.mutateAsync({ id, userId: data.owner });
      if (!!result) {
        notification.success({
          message: `Deleted booking ${id} from list`,
        });
      }
      return true;
    },
    closable: true,
    okButtonProps: { shape: 'round' },
    cancelButtonProps: { shape: 'round' },
    maskClosable: true,
    keyboard: true,
    width: 500,
    centered: true,
  });
}
