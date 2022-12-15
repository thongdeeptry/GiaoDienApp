import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// import Home from "../product/Home/Main";
import { Profile } from "../product/Profile";
import { PostStatus } from "./PostStatus";
import { Camxuc } from "./Camxuc";
import { ProfileFriend } from "./ProfileFriend";
import Messenger from "./Messenger/Messenger";
import Chat from "./Chat/Chat";
import notifiCation from "./notifiCation";
import Home from "../../../components/Home";
import { AllUser } from "./AllUser";
import Chinhsua from "./Chinhsua";
import { CaiDat } from "./CaiDat";
import Timkiem from "./Timkiem";
import Binhluan from "./Binhluan";
import Story from "../../layout/product/Story";
import ChangePass from "./changePass";
import { BanBe } from "./BanBe";
import { AnhUser } from "./AnhUser";
import { XemAnh } from "./XemAnh";
import CallVideo from "./Call/screens/CallScreen";
import LiveVideo from "./Call/screens/LiveScreen";
import JoinLive from "./Call/screens/JoinLive";
import RoomCall from "./Call/screens/RoomScreen";
import JoinRoom from "./Call/screens/JoinRoom";
import { AllRoomCall } from "./AllRoomCall";
import { SayHello } from "../user/screens/SayHello";
import hotro from "./hotro";
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{ tabBarShowLabel: false, headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PostStatus" component={PostStatus} />
      <Stack.Screen name="Camxuc" component={Camxuc} />
      {/* <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="IndexCall" component={IndexCall} /> */}
      <Stack.Screen name="ProfileFriend" component={ProfileFriend} />
      <Stack.Screen name="Messenger" component={Messenger} />
      <Stack.Screen name="Timkiem" component={Timkiem} />
      <Stack.Screen name="Story" component={Story} />
      <Stack.Screen name="AllUser" component={AllUser} />
      <Stack.Screen name="Chinhsua" component={Chinhsua} />
      <Stack.Screen name="CaiDat" component={CaiDat} />
      <Stack.Screen name="Binhluan" component={Binhluan} />
      <Stack.Screen name="ChangePass" component={ChangePass} />
      <Stack.Screen name="BanBe" component={BanBe} />
      <Stack.Screen name="AnhUser" component={AnhUser} />
      <Stack.Screen name="XemAnh" component={XemAnh} />
      <Stack.Screen name="CallVideo" component={CallVideo} />
      <Stack.Screen name="LiveVideo" component={LiveVideo} />
      <Stack.Screen name="JoinLive" component={JoinLive} />
      <Stack.Screen name="RoomCall" component={RoomCall} />
      <Stack.Screen name="JoinRoom" component={JoinRoom} />
      <Stack.Screen name="AllRoomCall" component={AllRoomCall} />
      <Stack.Screen name="SayHello" component={SayHello} />
      <Stack.Screen name="hotro" component={hotro} />
    </Stack.Navigator>
  );
}
function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{ tabBarShowLabel: false, headerShown: false }}
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PostStatus" component={PostStatus} />
      <Stack.Screen name="Camxuc" component={Camxuc} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="notifiCation" component={notifiCation} />
      <Stack.Screen name="ProfileFriend" component={ProfileFriend} />
      <Stack.Screen name="Messenger" component={Messenger} />
      <Stack.Screen name="Timkiem" component={Timkiem} />
      <Stack.Screen name="Story" component={Story} />
      <Stack.Screen name="AllUser" component={AllUser} />
      <Stack.Screen name="CaiDat" component={CaiDat} />
      <Stack.Screen name="Binhluan" component={Binhluan} />
      <Stack.Screen name="ChangePass" component={ChangePass} />
      <Stack.Screen name="BanBe" component={BanBe} />
      <Stack.Screen name="AnhUser" component={AnhUser} />
      <Stack.Screen name="XemAnh" component={XemAnh} />
      <Stack.Screen name="CallVideo" component={CallVideo} />
      <Stack.Screen name="LiveVideo" component={LiveVideo} />
      <Stack.Screen name="JoinLive" component={JoinLive} />
      <Stack.Screen name="RoomCall" component={RoomCall} />
      <Stack.Screen name="JoinRoom" component={JoinRoom} />
      <Stack.Screen name="AllRoomCall" component={AllRoomCall} />
      <Stack.Screen name="SayHello" component={SayHello} />
      <Stack.Screen name="hotro" component={hotro} />
    </Stack.Navigator>
  );
}
function AllUserStack() {
  return (
    <Stack.Navigator
      screenOptions={{ tabBarShowLabel: false, headerShown: false }}
    >
      <Stack.Screen name="AllUser" component={AllUser} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PostStatus" component={PostStatus} />
      <Stack.Screen name="Camxuc" component={Camxuc} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="notifiCation" component={notifiCation} />
      <Stack.Screen name="ProfileFriend" component={ProfileFriend} />
      <Stack.Screen name="Messenger" component={Messenger} />
      <Stack.Screen name="Story" component={Story} />
      <Stack.Screen name="Chinhsua" component={Chinhsua} />
      <Stack.Screen name="CaiDat" component={CaiDat} />
      <Stack.Screen name="Timkiem" component={Timkiem} />
      <Stack.Screen name="Binhluan" component={Binhluan} />
      <Stack.Screen name="ChangePass" component={ChangePass} />
      <Stack.Screen name="BanBe" component={BanBe} />
      <Stack.Screen name="AnhUser" component={AnhUser} />
      <Stack.Screen name="XemAnh" component={XemAnh} />
      <Stack.Screen name="CallVideo" component={CallVideo} />
      <Stack.Screen name="LiveVideo" component={LiveVideo} />
      <Stack.Screen name="JoinLive" component={JoinLive} />
      <Stack.Screen name="RoomCall" component={RoomCall} />
      <Stack.Screen name="JoinRoom" component={JoinRoom} />
      <Stack.Screen name="AllRoomCall" component={AllRoomCall} />
      <Stack.Screen name="SayHello" component={SayHello} />
      <Stack.Screen name="hotro" component={hotro} />
    </Stack.Navigator>
  );
}
function ChatStack() {
  return (
    <Stack.Navigator
      screenOptions={{ tabBarShowLabel: false, headerShown: false }}
    >
      <Stack.Screen name="Chat" component={Chat} />
      {/* <Stack.Screen name=Chinhsua"Home" component={Home} /> */}
      <Stack.Screen name="PostStatus" component={PostStatus} />
      <Stack.Screen name="Camxuc" component={Camxuc} />
      <Stack.Screen name="Profile" component={Profile} />
      {/* <Stack.Screen name="notifiCation" component={notifiCation} /> */}
      <Stack.Screen name="ProfileFriend" component={ProfileFriend} />
      <Stack.Screen name="Messenger" component={Messenger} />
      <Stack.Screen name="Story" component={Story} />
      <Stack.Screen name="AllUser" component={AllUser} />
      <Stack.Screen name="Chinhsua" component={Chinhsua} />
      <Stack.Screen name="CaiDat" component={CaiDat} />
      <Stack.Screen name="Timkiem" component={Timkiem} />
      <Stack.Screen name="Binhluan" component={Binhluan} />
      <Stack.Screen name="ChangePass" component={ChangePass} />
      <Stack.Screen name="BanBe" component={BanBe} />
      <Stack.Screen name="AnhUser" component={AnhUser} />
      <Stack.Screen name="XemAnh" component={XemAnh} />
      <Stack.Screen name="CallVideo" component={CallVideo} />
      <Stack.Screen name="LiveVideo" component={LiveVideo} />
      <Stack.Screen name="JoinLive" component={JoinLive} />
      <Stack.Screen name="RoomCall" component={RoomCall} />
      <Stack.Screen name="JoinRoom" component={JoinRoom} />
      <Stack.Screen name="AllRoomCall" component={AllRoomCall} />
      <Stack.Screen name="SayHello" component={SayHello} />
      <Stack.Screen name="hotro" component={hotro} />
    </Stack.Navigator>
  );
}
function NotiStack() {
  return (
    <Stack.Navigator
      screenOptions={{ tabBarShowLabel: false, headerShown: false }}
    >
      <Stack.Screen name="notifiCation" component={notifiCation} />
      {/* <Stack.Screen name="Home" component={Home} /> */}
      <Stack.Screen name="PostStatus" component={PostStatus} />
      <Stack.Screen name="Camxuc" component={Camxuc} />
      {/* <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Profile" component={Profile} /> */}
      <Stack.Screen name="ProfileFriend" component={ProfileFriend} />
      <Stack.Screen name="Messenger" component={Messenger} />
      <Stack.Screen name="Story" component={Story} />
      <Stack.Screen name="AllUser" component={AllUser} />
      <Stack.Screen name="Chinhsua" component={Chinhsua} />
      <Stack.Screen name="CaiDat" component={CaiDat} />
      <Stack.Screen name="Timkiem" component={Timkiem} />
      <Stack.Screen name="Binhluan" component={Binhluan} />
      <Stack.Screen name="ChangePass" component={ChangePass} />
      <Stack.Screen name="BanBe" component={BanBe} />
      <Stack.Screen name="AnhUser" component={AnhUser} />
      <Stack.Screen name="XemAnh" component={XemAnh} />
      <Stack.Screen name="CallVideo" component={CallVideo} />
      <Stack.Screen name="LiveVideo" component={LiveVideo} />
      <Stack.Screen name="JoinLive" component={JoinLive} />
      <Stack.Screen name="RoomCall" component={RoomCall} />
      <Stack.Screen name="JoinRoom" component={JoinRoom} />
      <Stack.Screen name="AllRoomCall" component={AllRoomCall} />
      <Stack.Screen name="SayHello" component={SayHello} />
      <Stack.Screen name="hotro" component={hotro} />
    </Stack.Navigator>
  );
}
export default ProductNavigation = (props) => {
  // const CustomBar = ({ children, onPress }) => (
  //   <TouchableOpacity
  //     style={{
  //       top: -30,
  //       justifyContent: "center",
  //       alignItems: "center",
  //     }}
  //     onPress={onPress}
  //   >
  //     <View
  //       style={{
  //         width: 60,
  //         height: 60,
  //         borderRadius: 35,
  //         backgroundColor: "#E94057",
  //       }}
  //     >
  //       {children}
  //     </View>
  //   </TouchableOpacity>
  // );
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            position: "absolute",
            backgroundColor: "#FFFFFF",
            height: 50,
            alignItems: "center",
          },
          tabBarIcon: ({ focused }) => {
            if (route.name == "Home") {
              return (
                <Image
                  style={{
                    resizeMode: "cover",

                    width: 30,
                    height: 30,
                  }}
                  source={require("../../image/home.png")}
                />
              );
            }
            if (route.name == "Chat") {
              return (
                <Image
                  style={{
                    resizeMode: "cover",

                    width: 30,
                    height: 30,
                  }}
                  source={require("../../image/chat.png")}
                />
              );
            }
            if (route.name == "Profile") {
              return (
                <Image
                  style={{
                    resizeMode: "cover",

                    width: 30,
                    height: 30,
                  }}
                  source={require("../../image/woman.png")}
                />
              );
            }
            if (route.name == "notifiCation") {
              return (
                <Image
                  style={{
                    resizeMode: "cover",

                    width: 30,
                    height: 30,
                  }}
                  source={require("../../image/notify.png")}
                />
              );
            }
            if (route.name == "AllUser") {
              return (
                <Image
                  style={{
                    resizeMode: "cover",

                    width: 30,
                    height: 30,
                  }}
                  source={require("../../assets/friends.png")}
                />
              );
            }
          },
          headerShown: false,
          //tabBarShowLabel:false,
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="AllUser" component={AllUserStack} />
        <Tab.Screen name="Chat" component={ChatStack} />
        <Tab.Screen name="notifiCation" component={NotiStack} />
        <Tab.Screen name="Profile" component={ProfileStack} />
      </Tab.Navigator>
    </View>
  );
};
