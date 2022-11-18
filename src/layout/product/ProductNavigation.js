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
      <Stack.Screen name="notifiCation" component={notifiCation} /> */}
      <Stack.Screen name="ProfileFriend" component={ProfileFriend} />
      <Stack.Screen name="Messenger" component={Messenger} />
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
    </Stack.Navigator>
  );
}
function ChatStack() {
  return (
    <Stack.Navigator
      screenOptions={{ tabBarShowLabel: false, headerShown: false }}
    >
      <Stack.Screen name="Chat" component={Chat} />
      {/* <Stack.Screen name="Home" component={Home} /> */}
      <Stack.Screen name="PostStatus" component={PostStatus} />
      <Stack.Screen name="Camxuc" component={Camxuc} />

      <Stack.Screen name="Profile" component={Profile} />
      {/* <Stack.Screen name="notifiCation" component={notifiCation} /> */}
      <Stack.Screen name="ProfileFriend" component={ProfileFriend} />
      <Stack.Screen name="Messenger" component={Messenger} />
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
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Chat" component={ChatStack} />
        <Tab.Screen name="Profile" component={ProfileStack} />
        <Tab.Screen name="notifiCation" component={NotiStack} />
      </Tab.Navigator>
    </View>
  );
};
