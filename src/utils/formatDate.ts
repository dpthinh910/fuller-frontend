import { default as dayjs } from 'dayjs';

export const formatDate = (date: Date | undefined) => dayjs(date).format('MMM D, YYYY');

export const formatTime = (date: Date | undefined) => dayjs(date).format('hh:mm A');

export const convertToUnix = (date: Date | string) => dayjs(date).valueOf();

export const compareToNow = (date: Date) => dayjs(date) < dayjs();
