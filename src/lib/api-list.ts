export const API = {
  login: `/auth/login`,
  getUserProfile: `/auth/profile`,
  getAllBookingsAdmin: `bookings/admin`,
  updateBookingAdmin: (id: string) => `bookings/admin/${id}`,
  getAllBookingsUser: ({ userId }: { userId: string }) => `bookings?userId=${userId}`,
  createNewBooking: `bookings`,
  deleteBooking: (id: string, userId: string) => `bookings/${id}?userId=${userId}`,
};
