import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
		  flex: 1,
    },
    floatButton: {
      borderWidth:1,
      borderColor:'rgba(0,0,0,0.2)',
      alignItems:'center',
      justifyContent:'center',
      width:70,
      position: 'absolute',                                          
      bottom: 10,                                                    
      right: 10,
      height:70,
      backgroundColor:'#005cc5',
      borderRadius:100,
    },
    item: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: 'grey',
      alignItems: 'center',
    },
    text: {
      marginVertical: 30,
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 10,    
    },
    // MODAL
    modalView: {
      flex: 1,
      backgroundColor: "#88cbf0",
      margin: 10,
      borderRadius: 5,
      paddingBottom: 30,
    },
    modalContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      height: 48,
      borderRadius: 5,
      overflow: "hidden",
      backgroundColor: "white",
      marginTop: 20,
      marginBottom: 10,
      marginLeft: 30,
      marginRight: 30,
      paddingLeft: 16,
    },
    button: {
      backgroundColor: "#005cc5",
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      height: 48,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonTitle: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    footerView: {
      flex: 1,
      alignItems: "center",
      marginTop: 20,
    },
    footerText: {
      fontSize: 16,
      color: "#2e2e2d",
    },
});
