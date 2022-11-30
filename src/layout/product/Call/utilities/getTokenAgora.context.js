/** @format */

import { getTokenAgora } from "./getTokenAgora.service";
export const ongetTokenAgora = async (channel, role, tokend, uid, time) => {
  try {
    const res = await getTokenAgora(channel, role, tokend, uid, time);
    const { rtcToken } = res;
    console.log(rtcToken);
    if (rtcToken != "") {
      return rtcToken;
    }
  } catch (error) {
    console.log("ongetTokenAgora error ", error);
  }
  return false;
};
