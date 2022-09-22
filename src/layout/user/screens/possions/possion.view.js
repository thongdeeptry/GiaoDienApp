import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import CustomItemSoThich from "../../../../components/CustomItemSoThich";
import { images } from "../../../../contains/images";
const PossionView = () => {
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={styles.imagelui}>
        <TouchableOpacity
          style={{ position: "relative", paddingRight: 20, right: 20 }}
          source={require("../../../image/lui.png")}
        />
      </View>
      <View style={styles.Skiptext}>
        <Text style={styles.textSkip}>Skip</Text>
      </View>
      <View style={styles.sothichText}>
        <Text style={styles.Textsothich}>Sở thích của bạn</Text>
        <Text style={{ width: "100%", textAlign: "left", left: 40 }}>
          Chọn một vài sở thích của bạn và cho mọi người biết bạn đam mê điều
          gì.
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "90%",
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            justifyContent: "space-around",
            top: 220,
          }}
        >
          <CustomItemSoThich
            number1={number}
            tilte={"Quan Vot"}
            image={images.QUANVOT}
            onPress={SetNum}
          />
          <CustomItemSoThich
            number1={number1}
            tilte={"Mua Sam"}
            image={images.QUANVOT}
            onPress={SetNum1}
          />
        </View>
      </View>

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "90%",
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            justifyContent: "space-around",
            top: 280,
          }}
        >
          <CustomItemSoThich
            number1={number2}
            tilte={"Hat Ho"}
            image={images.VOICE}
            onPress={SetNum2}
          />

          <CustomItemSoThich
            number1={number3}
            tilte={"Tap Yoga"}
            image={images.YOGA}
            onPress={SetNum3}
          />
        </View>
      </View>

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "90%",
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            justifyContent: "space-around",
            top: 340,
          }}
        >
          <CustomItemSoThich
            number1={number4}
            tilte={"Nau An"}
            image={images.COOKING}
            onPress={SetNum4}
          />
          <CustomItemSoThich
            number1={number5}
            tilte={"Quan Vot"}
            image={images.TENIS}
            onPress={SetNum5}
          />
        </View>
      </View>

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "90%",
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            justifyContent: "space-around",
            top: 400,
          }}
        >
          <CustomItemSoThich
            number1={number6}
            tilte={"Chay Bo"}
            image={images.RUN}
            onPress={SetNum6}
          />
          <CustomItemSoThich
            number1={number7}
            tilte={"Boi Loi"}
            image={images.BOI}
            onPress={SetNum7}
          />
        </View>
      </View>

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "90%",
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            justifyContent: "space-around",
            top: 460,
          }}
        >
          <TouchableOpacity
            style={[styles.khung, number8 > 0 ? styles.khungmau : null]}
            onPress={SetNum8}
          >
            <Image
              style={{ position: "relative", right: 10 }}
              source={require("../../../image/ve.png")}
            />

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
                  number8 > 0
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
                Vẽ tranh
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.khung, number9 > 0 ? styles.khungmau : null]}
            onPress={SetNum9}
          >
            <Image
              style={{ position: "relative", right: 10 }}
              source={require("../../../image/leonui.png")}
            />
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
                  number9 > 0
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
                Leo núi
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "90%",
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            justifyContent: "space-around",
            top: 520,
          }}
        >
          <TouchableOpacity
            style={[styles.khung, number10 > 0 ? styles.khungmau : null]}
            onPress={SetNum10}
          >
            <Image
              style={{ position: "relative", right: 10 }}
              source={require("../../../image/nhaydu.png")}
            />

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
                  number10 > 0
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
                Nhảy dù
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.khung, number11 > 0 ? styles.khungmau : null]}
            onPress={SetNum11}
          >
            <Image
              style={{ position: "relative", right: 10 }}
              source={require("../../../image/music.png")}
            />
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
                  number11 > 0
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
                Nghe nhạc
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "90%",
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            justifyContent: "space-around",
            top: 580,
          }}
        >
          <TouchableOpacity
            style={[styles.khung, number12 > 0 ? styles.khungmau : null]}
            onPress={SetNum12}
          >
            <Image
              style={{ position: "relative", right: 10 }}
              source={require("../../../image/drink.png")}
            />

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
                  number12 > 0
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
                Uống nước
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.khung, number13 > 0 ? styles.khungmau : null]}
            onPress={SetNum13}
          >
            <Image
              style={{ position: "relative", right: 10 }}
              source={require("../../../image/game-handle.png")}
            />
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
                  number13 > 0
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
                Chơi game
              </Text>
            </View>
          </TouchableOpacity>
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
            style={{ position: "relative", right: 5 }}
            source={require("../../../image/lui.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default React.memo(PossionView);
