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

return (
  <View style={{ width: "100%", height: "100%" }}>
    <View style={styles.MOBILE}>
      <Text style={styles.MOBILEText}>Bỏ qua</Text>
    </View>
    <View style={styles.themif}>
      <Text style={styles.themiftext}>Tôi là</Text>
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
          <TouchableOpacity
            onPress={SetNum1}
            style={[
              {
                fontSize: 20,
                width: "100%",
                height: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 8,
              },
              number1 > 0
                ? {
                    fontSize: 20,
                    width: "100%",
                    height: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#E94057",
                    borderRadius: 8,
                  }
                : null,
            ]}
            placeholder=""
            multiline={true}
            maxLength={100}
          >
            <Text
              style={[
                { fontSize: 20, alignItems: "center", paddingLeft: 20 },
                number1 > 0
                  ? {
                      fontSize: 20,
                      alignItems: "center",
                      paddingLeft: 20,
                      color: "#ffffff",
                    }
                  : null,
              ]}
            >
              Nữ
            </Text>
            <Image
              style={{ position: "relative", paddingRight: 20, right: 20 }}
              source={require("../../../image/tit.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.khung4}>
          <TouchableOpacity
            onPress={SetNum}
            style={[
              {
                fontSize: 20,
                width: "100%",
                height: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 8,
              },
              number > 0
                ? {
                    fontSize: 20,
                    width: "100%",
                    height: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#E94057",
                    borderRadius: 8,
                  }
                : null,
            ]}
            placeholder="Tên"
            multiline={true}
            maxLength={100}
          >
            <Text
              style={[
                { fontSize: 20, alignItems: "center", paddingLeft: 20 },
                number > 0
                  ? {
                      fontSize: 20,
                      alignItems: "center",
                      paddingLeft: 20,
                      color: "#ffffff",
                    }
                  : null,
              ]}
            >
              Nam
            </Text>
            <Image
              style={{ position: "relative", paddingRight: 20, right: 20 }}
              source={require("../../../image/tit.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.mailnut1}>
          <TouchableOpacity
            style={[
              {
                fontSize: 20,
                width: "100%",
                height: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 8,
              },
              number2 > 0
                ? {
                    fontSize: 20,
                    width: "100%",
                    height: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#E94057",
                    borderRadius: 8,
                  }
                : null,
            ]}
            onPress={SetNum2}
          >
            <Text
              style={[
                { fontSize: 20, alignItems: "center", paddingLeft: 20 },
                number2 > 0
                  ? {
                      fontSize: 20,
                      alignItems: "center",
                      paddingLeft: 20,
                      color: "#ffffff",
                    }
                  : null,
              ]}
            >
              Khác
            </Text>
            <Image
              style={{ position: "relative", paddingRight: 20, right: 20 }}
              source={require("../../../image/tit.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>

    <View style={styles.mailnut}>
      <TouchableOpacity style={styles.nut} onPress={AddData}>
        <Text style={styles.nutText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.lui}>
      <TouchableOpacity onPress={() => navigation.navigate("Possions")}>
        <Image
          style={{ position: "relative", paddingRight: 10, right: 10 }}
          source={require("../../../image/lui.png")}
        />
      </TouchableOpacity>
    </View>
  </View>
);
