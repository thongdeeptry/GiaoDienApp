import { StyleSheet, Text, View, Image, TextInput } from "react-native";
const Mesview = () => {
  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
      <View style={styles.imageBack}>
        <Image
          style={styles.backImage}
          source={require("../../image/backArrow.png")}
        />
        <Image
          style={styles.avatarImage}
          source={require("../../image/placeholder.png")}
        />
        <Image
          style={styles.onlineImage}
          source={require("../../image/activeIcon.png")}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textTen}>AdminText</Text>
        <Text style={styles.textOnline}>Đang Hoạt Động</Text>
        <Image
          style={styles.iconImage}
          source={require("../../image/iconOption.png")}
        />
      </View>
      <View>
        <Image
          style={styles.mesImage}
          source={require("../../image/background.png")}
        />
        <Text style={styles.textView}>Hey, Tell me something i don’t know</Text>
        <Text style={styles.textHours}>4.30 AM</Text>
      </View>
      <View>
        <Image
          style={styles.pictureImage}
          source={require("../../image/picture.png")}
        />
        <Image
          style={styles.loveImage}
          source={require("../../image/love.png")}
        />
        <Text style={styles.textHours1}>4.31 AM</Text>
      </View>
      <View>
        <Image
          style={styles.backgroud1Image}
          source={require("../../image/background1.png")}
        />
        <Text style={styles.textView1}>Awesome</Text>
        <Text style={styles.textHours2}>9.30 AM</Text>
      </View>
      <View>
        <TextInput
          style={styles.background2Image}
          placeholder="Type message..."
        ></TextInput>
        <Image
          style={styles.nhanImage}
          source={require("../../image/icon.png")}
        />
        <Text style={styles.textView2}></Text>
        <Image
          style={styles.sendImage}
          source={require("../../image/btnSend.png")}
        />
      </View>
    </View>
  );
};
export default React.memo(Mesview);
