import React from "react";
import { Constants, ImagePicker, Permissions } from "expo";
import {
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Button,
	ImageEditor,

} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../styles/LoginPageStyle";
import firebaseRD from "../../FirebaseRD";
import firebase from "firebase";
import { auth, initializeApp, storage } from "firebase";
import uuid from "uuid";

class Login extends React.Component {
	static navigationOptions = {
		title: "Scv Chatter",
	};

	state = {
		name: "Alex B",
		email: "test3@gmail.com",
		password: "test123",
		avatar: "",
	};

	// using Fire.js
	onPressLogin = async () => {
		console.log("pressing login... email:" + this.state.email);
		const user = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			avatar: this.state.avatar,
		};

		const response = firebaseRD.login(
			user,
			this.loginSuccess,
			this.loginFailed
		);
	};

	loginSuccess = () => {
		console.log("login successful, navigate to chat.");
		this.props.navigation.navigate("Chat", {
			name: this.state.name,
			email: this.state.email,
			avatar: this.state.avatar,
		});
	};
	loginFailed = () => {
		console.log("login failed ***");
		alert("Login failure. Please tried again.");
	};

	onChangeTextEmail = (email) => this.setState({ email });
	onChangeTextPassword = (password) => this.setState({ password });

	render() {
		return (
			<View style={styles.container}>
				<KeyboardAwareScrollView
					style={{ flex: 1, width: "100%" }}
					keyboardShouldPersistTaps="always"
				>
					<Image
						style={styles.logo}
						source={require("../../../assets/icon.png")}
					/>

					<TextInput
						style={styles.input}
						placeholder="E-mail"
						placeholderTextColor="#aaaaaa"
						onChangeText={this.onChangeTextEmail}
						value={this.state.email}
						underlineColorAndroid="transparent"
						autoCapitalize="none"
					/>

					
					<Text style={styles.title}>Password:</Text>
					<TextInput
						style={styles.nameInput}
						onChangeText={this.onChangeTextPassword}
						value={this.state.password}
					/>
					<Button
						title="Login"
						style={styles.buttonText}
						onPress={this.onPressLogin}
					/>

					<Button
						title="Go to create new account"
						style={styles.buttonText}
						onPress={() => this.props.navigation.navigate("Registro")}
					/>
				</KeyboardAwareScrollView>
			</View>
		);
	}
}

// const offset = 16;
// const styles = StyleSheet.create({
// 	title: {
// 		marginTop: offset,
// 		marginLeft: offset,
// 		fontSize: offset,
// 	},
// 	nameInput: {
// 		height: offset * 2,
// 		margin: offset,
// 		paddingHorizontal: offset,
// 		borderColor: "#111111",
// 		borderWidth: 1,
// 		fontSize: offset,
// 	},
// 	buttonText: {
// 		marginLeft: offset,
// 		fontSize: 42,
// 	},
// });

export default Login;
