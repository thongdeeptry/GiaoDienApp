import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: 60,

    borderTopColor: "#ABABAB",
    borderTopWidth: 0.6,
  },

  iconmain: {
    width: "100%",
    height: 60,
    borderTopColor: "#ABABAB",
    borderTopWidth: 1,
    borderBottomColor: "#ABABAB",
    borderBotomWidth: 1,
    flexDirection: "row",
  },
  btnicon: {
    width: "100%",
    height: 60,
    alignItems: "center",

    flexDirection: "row",
  },
  icontext: {
    fontSize: 15,
    opacity: 0.7,
    left: 20,
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
});
