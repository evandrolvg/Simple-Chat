import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
		  flex: 1,
    },
    // MENU
    menuView: {
      flex: 1,
      position:"absolute",
      bottom: 80,
      backgroundColor: "white",
      // margin: 50,
      borderRadius: 5,
      right: 30,
      left: 30,
      height: 230,
      padding:20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    menuContView: {
      flex: 0.6,
      flexDirection:'row',
      alignItems: "center",
      justifyContent: "center",
      height: 48,
    },
    borderBottom: {
      borderBottomWidth: 1,
      borderBottomColor: '#b9babb',
    },
    mtop: {
      marginTop: 20,
    },

    btnMenu: {
      marginLeft: 0,
      marginRight: 0,
      // marginTop: 50,
      // height: 48,
      
      // borderRadius: 5,
      flexDirection:'row',
      // flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "space-between",
      // flexWrap: 'wrap', 
        
        
      //  alignItems:'center',
      //  justifyContent:'center'
    },
    imgBtnMenu : {
      // marginLeft: 20,
      // marginRight: 20,
      // // marginTop: 20,
      height: 35,
      
      // // borderRadius: 5,
      // // flexDirection:'row',
     flex: 1,
      // backgroundColor: "white",
      // alignItems: "center",
      // justifyContent: "center",
    },
    txtBtnMenu : {
      flex:.8
    },
    
    buttonLogout: {
      flex: 1, flexDirection: 'row',
      // borderWidth:1,
      // borderColor:'red',
      alignItems:'center',
      justifyContent:'center',
      width:70,
      // right: -20,
      position: 'absolute',                                          
      bottom: 0,                  
      height:70,
      // backgroundColor:'red',
      // borderRadius:100,
      zIndex:99,
    },
    buttonClose: {
      borderWidth:1,
      borderColor:'rgba(0,0,0,0.2)',
      alignItems:'center',
      justifyContent:'center',
      width:50,
      right: -20,
      position: 'absolute',                                          
      top: -20,                  
      flexDirection:'row',   
      height:50,
      backgroundColor:'red',
      borderRadius:100,
      zIndex:99,
    },

    floatButton: {
      borderWidth:1,
      borderColor:'rgba(0,0,0,0.2)',
      alignItems:'center',
      justifyContent:'center',
      width:60,
      position: 'absolute',                                          
      bottom: 10,                                                    
      right: 10,
      height:60,
      backgroundColor:'#005cc5',
      borderRadius:100,
      zIndex:999
    },
    //LISTA
    item: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#b9babb',
      alignItems: 'center',
    },
    btnEdit:{
       width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      marginVertical: 10,
      fontSize: 15,
      // fontWeight: 'bold',
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
    imgEdit: {
      height:100,
    },
    footerView: {
      // flex: 1,
      alignItems: "center",
      marginTop: 20,
    },
    footerText: {
      fontSize: 16,
      color: "#2e2e2d",
    },
    

});
