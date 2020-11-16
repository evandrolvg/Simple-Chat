import React from "react";
import {
  Image,
  View,
} from "react-native";
import { IconButton } from "react-native-paper";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from "./src/pages/LoginPage";
import Registro from "./src/pages/RegistroPage";
// import Chat from "./src/pages/chat/Chats";
import Chat from "./src/pages/ChatPage";
import AddSala from "./src/pages/AddSalaPagina";
import Salas from "./src/pages/SalasPagina";
import Perfil from "./src/pages/PerfilPagina";
import EsqueciSenha from "./src/pages/EsqueciSenhaPagina";

const AppStack = createStackNavigator(
		{
		Salas: {
			screen: Salas,
			navigationOptions: ({ navigate, navigation }) => ({
				header: () =>	<View
									style={{
										height: 60,
										marginTop: 24,
										backgroundColor:'#005cc5',
										flexDirection: 'row',
										alignItems:'center',
										justifyContent:'center',
										alignSelf: 'stretch',
										textAlign: 'center',
									}}
								>
									<Image source={require('./src/img/chatTab.png')} resizeMode='contain' style={{ height: 50 }} />
								</View>
				
			}),
		},
		Chat: {
			screen: Chat,
			navigationOptions: ({ navigate, navigation }) => ({
				title: navigation.getParam('salaNome'),
			}),
		},
		AddSala: {
			screen: AddSala,
			navigationOptions: ({ navigate, navigation }) => ({
				title: "Nova sala",
				
				headerTitleStyle: {
					textAlign: "left",
					fontSize: 20,
				},
			}),
		},
		Perfil: {
			screen: Perfil,
			navigationOptions: {
				title: "Perfil",
				headerTitleStyle: {
					textAlign: "left",
					fontSize: 20,
				},
			},
		},
		AlterarSenha: {
			screen: EsqueciSenha,
			navigationOptions: ({ navigate, navigation }) => ({
				title: "Recuperação de senha",
				
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
		EsqueciSenha: {
			screen: EsqueciSenha,
			navigationOptions: ({ navigate, navigation }) => ({
				title: "Recuperação de senha",
				
				headerTitleStyle: {
					textAlign: "left",
					fontSize: 20,
				},
			}),
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