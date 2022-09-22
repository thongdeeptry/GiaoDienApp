import { View, Text } from "react-native";
import React from "react";

const CustomItemSoThich = ({ number1, onPress, image, tilte, ...props }) => {
  return (
    <View>
      <TouchableOpacity
        style={[styles.khung, number1 > 0 ? styles.khungmau : null]}
        onPress={onPress}
      >
        <Image style={{ position: "relative", right: 10 }} source={image} />
        <View
          style={{
            fontSize: 20,
            width: "100%",
            height: "100%",
            flexDirection: "row",
            alignItems: "center",
          }}
          placeholder=""
          multiline={true}
          maxLength={0}
        >
          <Text
            style={[
              {
                fontSize: 19,
                fontStyle: "normal",
                fontWeight: "400",
                alignItems: "center",
              },
              number1 > 0
                ? {
                    fontSize: 19,
                    fontStyle: "normal",
                    fontWeight: "400",
                    alignItems: "center",
                    color: "white",
                  }
                : null,
            ]}
          >
            {tilte}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomItemSoThich;
