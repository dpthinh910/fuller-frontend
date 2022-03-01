import { useQuery } from 'react-query';

import { axios } from 'src/lib/axios';
import { QueryConfig } from 'src/lib/react-query';
import { API } from 'src/lib/api-list';

import { BookingResponse } from '../types';

export const getAllBookingsByAdmin = async (): Promise<BookingResponse[]> => {
  return await axios.get(API.getAllBookingsAdmin);
};

type UseBookingsOptions = {
  config?: QueryConfig<typeof getAllBookingsByAdmin>;
};

export const useGetAllBookingsAdmin = ({ config }: UseBookingsOptions = {}) => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: () => getAllBookingsByAdmin(),
    ...config,
  });
};
