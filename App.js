import React from "react";
import { Text, Button, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Login from "./src/pages/LoginPage";
import Registro from "./src/pages/RegistroPage";
import Chat from "./src/pages/ChatPage";

const AppNavigator = createStackNavigator(
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
		Chat: {
			screen: Chat,
			navigationOptions: ({ navigate, navigation }) => ({
				title: "Chat",
				headerRight: (
					<TouchableOpacity onPress={() => navigation.navigate("Login")}>
						<IconButton icon='logout' size={32} color='white' />
					</TouchableOpacity>
				),
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

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;