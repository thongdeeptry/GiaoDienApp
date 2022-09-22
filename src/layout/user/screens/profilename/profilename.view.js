import {
  View,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  ToastAndroid,
} from "react-native";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";
const ProfilenameView = () => {
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={styles.MOBILE}>
        <Text style={styles.MOBILEText}>Bỏ qua</Text>
      </View>
      <View style={styles.themif}>
        <Text style={styles.themiftext}>Thêm Thông Tin</Text>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View style={styles.imageContainer}>
          {image == null ? (
            <Image
              style={styles.image}
              resizeMethod="auto"
              source={require("../../../image/avt.jpg")}
            />
          ) : (
            image && (
              <Image
                style={styles.image}
                resizeMethod="auto"
                source={{ uri: image }}
              />
            )
          )}
          <TouchableOpacity onPress={pickImage}>
            <Image
              style={{ position: "relative", right: 10, top: 70 }}
              source={require("../../../image/camera.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <View style={styles.khunghinh}>
          <View style={styles.khung}>
            <TextInput
              style={{ fontSize: 20 }}
              placeholder="Họ"
              multiline={true}
              maxLength={100}
              value={ho}
              onChangeText={setho}
            ></TextInput>
          </View>

          <View style={styles.khung4}>
            <TextInput
              style={{ fontSize: 20 }}
              placeholder="Tên"
              multiline={true}
              maxLength={100}
              value={ten}
              onChangeText={setten}
            ></TextInput>
          </View>
          <View style={styles.mailnut1}>
            <TouchableOpacity style={styles.nut1} onPress={showDatePicker}>
              <Image
                style={{ position: "relative", left: 30 }}
                source={require("../../../image/Calendarlich.png")}
              />
              <Text style={styles.nutText1}>{`${
                selectedDate
                  ? moment(selectedDate).format("DD/MM/YYYY")
                  : "Chọn ngày sinh"
              }`}</Text>
            </TouchableOpacity>
          </View>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      </View>

      <View style={styles.mailnut}>
        <TouchableOpacity
          style={styles.nut}
          onPress={() => uploadImageToBucket(image, makeid(60))}
        >
          <Text style={styles.nutText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default React.memo(ProfilenameView);
