import { useQuery } from 'react-query';

import { axios } from 'src/lib/axios';
import { QueryConfig } from 'src/lib/react-query';
import { API } from 'src/lib/api-list';

import { BookingResponse } from '../types';

export const getAllBookingsByUser = async (userId: string): Promise<BookingResponse[]> => {
  return await axios.get(API.getAllBookingsUser({ userId }));
};

type UseBookingsOptions = {
  userId: string;
  config?: QueryConfig<typeof getAllBookingsByUser>;
};

export const useGetAllBookingsAdmin = ({ config, userId }: UseBookingsOptions) => {
  return useQuery({
    queryKey: ['bookingsUser'],
    queryFn: () => getAllBookingsByUser(userId),
    ...config,
  });
};
