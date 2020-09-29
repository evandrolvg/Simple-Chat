import React from "react";
import { Constants, ImagePicker, Permissions } from "expo";
import {
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Button,
	ImageEditor,
	KeyboardAvoidingView,
	ActivityIndicator,
	Image
} from "react-native";

import styles from "../styles/LoginPageStyle";
import firebaseRD from "../../FirebaseRD";
import firebase from "firebase";
import { auth, initializeApp, storage } from "firebase";
import uuid from "uuid";

class Login extends React.Component {
	static navigationOptions = {
		title: "Simple Chat",
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
				<KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
					<View style={styles.logoView}>
						<Image style={styles.logo} source={require("../img/chat.png")} />
					</View>

					<View style={(styles.container, styles.mt)}>
						<TextInput
							style={styles.input}
							placeholder="E-mail"
							placeholderTextColor="#aaaaaa"
							onChangeText={this.onChangeTextEmail}
							value={this.state.email}
							underlineColorAndroid="transparent"
							autoCapitalize="none"
						/>
						<TextInput
							style={styles.input}
							placeholderTextColor="#aaaaaa"
							secureTextEntry
							placeholder="Password"
							onChangeText={this.onChangeTextPassword}
							value={this.state.password}
							underlineColorAndroid="transparent"
							autoCapitalize="none"
						/>

						<TouchableOpacity style={styles.button} onPress={this.onPressLogin}>
							<Text style={styles.buttonTitle}>Log in</Text>
						</TouchableOpacity>

						<View style={styles.footerView}>
							<Text style={styles.footerText}>
								<Text
									onPress={() => this.props.navigation.navigate("Registro")}
								>
								Não possui conta? Cadastre-se
								</Text>
							</Text>
						</View>

						
					</View>
				</KeyboardAvoidingView>
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
