import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#06C167",
  },
  contentAlert: {
    marginTop: 150,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  warningAlert: {
      paddingLeft: 10,
      color: "#bdbdbd",
      fontSize: 16
  },
  Tasks:{
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5
  },
  deleteTask:{
    justifyContent: "center",
    paddingLeft: 15,
    left: 20
  },
  DescriptionTask:{
    width: "75%",
    alignContent: "flex-start",
    backgroundColor: "#f5f5f5cf",
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 5,
    marginRight: 15,
    color: "#282b2db5",
    overflow: "hidden"
  },
  buttonNewTask:{
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 60,
    left: 35,
    backgroundColor: "#06C167",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  iconButton:{
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold"
  },
  buttonCompleted:{
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 135,
    left: 35,
    backgroundColor: "#06C167",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonLogout:{
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginRight: -5
  },
  locationText:{
    textAlign: "center"
  },
});

export default styles;