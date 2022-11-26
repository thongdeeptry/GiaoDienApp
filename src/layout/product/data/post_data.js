import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "../../../../config";
const app = initializeApp(firebaseConfig);
const data = [];
if (!app.length) {
  console.log("Kết nối thành công");
}
const user = getAuth().currentUser.uid;
const db = getDatabase();
const reference = ref(db, "post/" + user);
onValue(reference, (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const id = childSnapshot.child("id").exportVal();
    const name = childSnapshot.child("name").exportVal();
    const avt = childSnapshot.child("avt").exportVal();
    const noidung = childSnapshot.child("noidung").exportVal();
    const trangthai = childSnapshot.child("trangthai").exportVal();
    data.push({
      id: id,
      name: name,
      avt: avt,
      noidung: noidung,
      trangthai: trangthai,
    });
  });
});
export const posts = data;
