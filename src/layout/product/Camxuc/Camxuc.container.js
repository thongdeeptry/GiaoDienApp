import React, { useState, useEffect } from "react";
const CamXucContainer = () => {
  const [hoatdong, sethoatdong] = useState();
  const [noidung1, setnoidung1] = useState();
  const [nhapnd, setnhapnd] = useState();
  const ThemHoatDong = (hd) => {
    sethoatdong(hd);
  };
  const ChuyenNoiDung = () => {
    setnoidung1(hoatdong + " " + nhapnd);
    navigation.navigate("PostStatus", { noidung1 });
  };
};
export default CamXucContainer;
