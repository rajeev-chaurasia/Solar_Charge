import { StyleSheet } from "react-native"
import {
    Dimensions,
  } from "react-native";
const device = Dimensions.get("window");
export default StyleSheet.create({
  imageBackground:{
    width: device.width,
    height: device.height + 35,
  },
  imageBackground2:{
    width: device.width,
    height: device.height-65,
  },
  layout:{
    flex: 1,
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 30,
  },
  container:{
    flex: 1,
    width: "90%",
    borderRadius: 30,
    borderWidth: 0.3,
    borderColor: "black",
    backgroundColor: "#00000090",
    padding: 10,
  },
  text22:{
    fontWeight: "800",
    letterSpacing: 0,
    color: "yellow",
    fontSize: 25,
    opacity: 1,
    zIndex: 1,
    marginTop:10,
  },
  text20:{
    fontWeight: "600",
    letterSpacing: 2,
    color: "white",
    fontSize: 20,
    opacity: 1,
    zIndex: 1,
  },
  text16:{
    color: "white",
    fontSize: 16,
    fontWeight: "300",
    letterSpacing: 2,
  },
  text12:{
    fontSize: 12,
    color: "#f50",
    letterSpacing: 0.8,
    opacity: 0.8,
  },
  text10:{
    paddingLeft: 10,
    color: "white",
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: "100",
  },
  inputContainerStyle:{
    backgroundColor: "white",
    paddingHorizontal: 10,
    borderRadius: 7,
    borderBottomColor: "transparent",
    height: 45,
  },
  inputStyle:{
    fontSize: 14,
    color: "#000000",
    letterSpacing: 0.5,
    paddingLeft: 5,
  },
  errorStyle:{ 
      color: "red",
      marginTop: 0, 
      fontSize: 10
     },
     btn1:{
        opacity: 0.8,
        marginTop: 50,
        paddingVertical: 10,
        backgroundColor: "purple",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20,
      },
      btn2:{
        opacity: 0.8,
        marginTop: 20,
        paddingVertical: 10,
        backgroundColor: "#10414f",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        borderRadius:5
      },
      rowCenter:{
        flexDirection: "row",
        justifyContent: "center",
      },
})