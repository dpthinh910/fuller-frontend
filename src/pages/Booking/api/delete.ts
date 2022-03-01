import { useMutation } from 'react-query';

import { axios } from 'src/lib/axios';
import { MutationConfig, queryClient } from 'src/lib/react-query';
import { API } from 'src/lib/api-list';

import { BookingResponse } from '../types';

export const deleteBooking = async ({ id, userId }: { id: string; userId: string }): Promise<BookingResponse> => {
  return await axios.delete(API.deleteBooking(id, userId));
};

type UseDeleteBooking = {
  config?: MutationConfig<typeof deleteBooking>;
};

export const useDeleteBooking = ({ config }: UseDeleteBooking = {}) => {
  return useMutation({
    onMutate: async deleteBooking => {
      await queryClient.cancelQueries('bookingsUser');

      const previousBookings = queryClient.getQueryData<BookingResponse[]>('bookingsUser');

      queryClient.setQueryData(
        'bookingsUser',
        previousBookings?.filter(booking => booking._id.toString() !== deleteBooking.id)
      );
      return { previousBookings };
    },
    onError: (_, __, context: any) => {
      if (context?.previousBookings) {
        queryClient.setQueryData('bookingsUser', context.previousBookings);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('bookingsUser');
    },
    ...config,
    mutationFn: deleteBooking,
  });
};
