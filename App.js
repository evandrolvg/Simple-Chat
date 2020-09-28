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
				title: "Hábitos",
				headerTitleStyle: {
					textAlign: "left",
					fontSize: 20,
				},
			},
		},
		Chat: {
			screen: Chat,
			navigationOptions: {
				title: "Hábitos",
				headerTitleStyle: {
					textAlign: "left",
					fontSize: 20,
				},
			},
		},
	},
	{
		defaultNavigationOptions: {
			title: "MyHabitTimeline",
			headerTintColor: "white",
			headerStyle: {
				backgroundColor: "#6542f4",
				borderBottomColor: "#f4f2ff",
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