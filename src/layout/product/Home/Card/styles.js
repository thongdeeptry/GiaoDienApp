import { StyleSheet } from "react-native";
import { CARD } from "../utils/constants";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "78%",
    bottom: 95,
  },
  image: {
    width: CARD.WIDTH,

    height: "100%",
    borderRadius: CARD.BORDER_RADIUS,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 160,
    borderRadius: CARD.BORDER_RADIUS,
  },
  name: {
    position: "absolute",
    bottom: 80,
    left: 22,
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  diachi: {
    position: "absolute",
    bottom: 50,
    left: 22,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  choiceContainer: {
    position: "absolute",
    top: 100,
  },
  likeContainer: {
    left: 45,
    transform: [{ rotate: "-30deg" }],
  },
  nopeContainer: {
    right: 45,
    transform: [{ rotate: "30deg" }],
  },
});
