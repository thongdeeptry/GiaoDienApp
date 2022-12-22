/** @format */

import axiosInstance from './axios';
export const getTokenAgora = async (channel, role, tokend, uid, time) => {
  const response = await axiosInstance.get(
    channel + '/' + role + '/' + tokend + '/' + uid + '/?expiry=' + time,
  );
  console.log(response);
  return response;
};
