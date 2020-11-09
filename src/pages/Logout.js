import firebaseRD from "../../FirebaseRD";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export function logout ({navigation}) {
	const response = firebaseRD.logout(
		logoutSucesso(navigation),
		logoutFalha()
    );
    
    return response;
}

	function logoutSucesso (navigation) {
		console.log('logoutSucesso');
		navigation.navigate("Login");
	};

	function logoutFalha () {
		Alert.alert(
      		"Erro ao deslogar",
      		"Tente novamente.",
      		[
				{ text: "OK", onPress: () => console.log("OK Pressed") }
			],
			{ cancelable: false }
	    );	
	};

