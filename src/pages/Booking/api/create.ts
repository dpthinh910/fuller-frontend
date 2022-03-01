import { useMutation } from 'react-query';

import { axios } from 'src/lib/axios';
import { MutationConfig, queryClient } from 'src/lib/react-query';
import { API } from 'src/lib/api-list';
import { BookingResponse } from '../types';

export type CreateSampleVideoDTO = {
  data: {
    event: string;
    location?: number;
    status?: string;
    userId: string;
  };
};

export const createBooking = async ({ data }: CreateSampleVideoDTO): Promise<BookingResponse> => {
  return await axios.post(API.createNewBooking, data);
};

type UseCreateBookingOptions = {
  config?: MutationConfig<typeof createBooking>;
};

export const useCreateBooking = ({ config }: UseCreateBookingOptions = {}) => {
  return useMutation({
    onMutate: async newBooking => {
      await queryClient.cancelQueries('bookings');

      const previousBookings = queryClient.getQueryData<any>('bookings');
      queryClient.setQueryData('bookings', [...(previousBookings?.data || []), newBooking.data]);

      return { previousBookings };
    },
    onError: (_, __, context: any) => {
      if (context?.previousBookings) {
        queryClient.setQueryData('bookings', context.previousBookings);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('bookings');
    },
    ...config,
    mutationFn: createBooking,
  });
};
