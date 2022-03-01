import { useMutation } from 'react-query';

import { axios } from 'src/lib/axios';
import { MutationConfig, queryClient } from 'src/lib/react-query';
import { API } from 'src/lib/api-list';

import { BookingResponse } from '../types';

export type UpdateBookingDTO = {
  data: {
    status: string;
    rejectedReason?: string;
    bookingsDates?: {
      firstDate: { date?: Date; confirmed: boolean };
      secondDate: { date?: Date; confirmed: boolean };
      thirdDate: { date?: Date; confirmed: boolean };
    };
  };
  id: string;
};

export const updateBooking = async ({ id, data }: UpdateBookingDTO) => {
  return await axios.patch(API.updateBookingAdmin(id), data);
};

type UseUpdateBookingOptions = {
  config?: MutationConfig<typeof updateBooking>;
};

export const useUpdateBooking = ({ config }: UseUpdateBookingOptions = {}) => {
  return useMutation({
    onMutate: async updatingBooking => {
      await queryClient.cancelQueries(['bookings']);

      const previousBookings = queryClient.getQueryData<BookingResponse[]>(['bookings']);

      queryClient.setQueryData(
        'bookings',
        previousBookings?.filter(booking => booking._id.toString() !== updatingBooking.id)
      );
      return { previousBookings };
    },
    onError: (_, __, context: any) => {
      if (context?.previousBookings) {
        queryClient.setQueryData('bookings', context.previousBookings);
      }
    },
    onSuccess: () => {
      return queryClient.invalidateQueries('bookings');
    },
    ...config,
    mutationFn: updateBooking,
  });
};
