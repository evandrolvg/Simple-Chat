import React from "react";
import { TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import firebaseRD from "./FirebaseRD";
import Login from "./src/pages/LoginPage";
import Registro from "./src/pages/RegistroPage";
import Chat from "./src/pages/ChatPage";
import AddSala from "./src/pages/AddRoomScreen";
import Salas from "./src/pages/SalasPagina";

const AppStack = createStackNavigator(
		{
		

		Salas: {
			screen: Salas,
			navigationOptions: ({ navigate, navigation }) => ({
				title: "Salas",
				headerRight: (
					<TouchableOpacity onPress={() => navigation.navigate('AddSala')}>
						<IconButton icon='message-plus' size={32} color='white' />
					</TouchableOpacity>
				),
				headerTitleStyle: {
					textAlign: "left",
					fontSize: 20,
				},
			}),
		},
		Chat: {
			screen: Chat,
			navigationOptions: ({ navigate, navigation }) => ({
				title: navigation.getParam('salaNome'),
				
				headerRight: (
					<TouchableOpacity onPress={() => firebaseRD.logout()}>
						<IconButton icon='logout' size={32} color='white' />
					</TouchableOpacity>
				),
				headerTitleStyle: {
					textAlign: "left",
					fontSize: 20,
				},
			}),
		},
		AddSala: {
			screen: AddSala,
			navigationOptions: ({ navigate, navigation }) => ({
				title: "AddSala",
				
				headerTitleStyle: {
					textAlign: "left",
					fontSize: 20,
				},
			}),
		},
	},
	{
		defaultNavigationOptions: {
			headerTintColor: "white",
			headerStyle: {
				backgroundColor: "#005cc5",
			},
			headerTitleStyle: {
				color: "white",
				fontSize: 20,
				flexGrow: 1,
				textAlign: "center",
			},
		},
	}
);

const AuthStack = createStackNavigator(
	{  
		Login: {
			screen: Login,
			navigationOptions: {
				headerShown: false,
			},
		},
		Registro: {
			screen: Registro,
			navigationOptions: {
				title: "Cadastro",
				headerTitleStyle: {
					textAlign: "left",
					fontSize: 20,
				},
			},
		},	
	});

export default createAppContainer(
  createSwitchNavigator(
    {
    //   AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Auth',
    }
  )
);