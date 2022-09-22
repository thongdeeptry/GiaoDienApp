import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
const FriendView = () => {
  return (
    <View>
      <View style={styles.textMat}>
        <Text style={styles.matText}>Matches</Text>
      </View>
      <TouchableOpacity style={styles.khungsort}>
        <Image
          style={styles.textBen}
          source={require("../../image/sorttwo.png")}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.textThis}>
          This is a list of people who have liked you and your matches.
        </Text>
      </View>
      <View style={styles.LineContainer}>
        <Image style={styles.line} source={require("../../image/line1.png")} />
        <Text style={styles.textToday}>Today</Text>
        <Image style={styles.line1} source={require("../../image/line1.png")} />
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageNen}
          source={require("../../image/avt.jpg")}
        />

        <Text style={styles.textTen}>Leilani, 19</Text>
        <Image
          style={styles.imageX}
          source={require("../../image/close.png")}
        />
        <Image
          style={styles.imageThanh}
          source={require("../../image/thanh.png")}
        />
        <Image
          style={styles.imageTim}
          source={require("../../image/love.png")}
        />
      </View>
    </View>
  );
};
export default React.memo(FriendView);
