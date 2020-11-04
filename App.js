import React from "react";
import { TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import firebaseRD from "./FirebaseRD";
import Login from "./src/pages/LoginPage";
import Registro from "./src/pages/RegistroPage";
import Chat from "./src/pages/ChatPage";
import AddSala from "./src/pages/AddRoomScreen";
import Salas from "./src/pages/SalasPagina";

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
		AddSala: {
			screen: AddSala,
			navigationOptions: {
				title: "Cadastro",
				headerTitleStyle: {
					textAlign: "left",
					fontSize: 20,
				},
			},
		},
		Salas: {
			screen: Salas,
			navigationOptions: {
				title: "Salas",
				headerTitleStyle: {
					textAlign: "left",
					fontSize: 20,
				},
			},
		},
		Chat: {
			screen: Chat,
			navigationOptions: ({ navigate, navigation }) => ({
				// title: this.props.navigation.state.params.salaNome,
				
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