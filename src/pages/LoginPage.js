import React from "react";
import { Constants, ImagePicker, Permissions } from "expo";
import {
	Text,
	TextInput,
	ScrollView,
	TouchableOpacity,
	View,
	Button,
	ImageEditor,
	KeyboardAvoidingView,
	ActivityIndicator,
	Image,
	Alert
} from "react-native";

import styles from "../styles/LoginPageStyle";
import firebaseRD from "../../FirebaseRD";
import firebase from "firebase";
import { auth, initializeApp, storage } from "firebase";
import uuid from "uuid";



class Login extends React.Component {
	constructor(props) {
		super(props);
		this.passwordTextInputRef = React.createRef();
		this.observeAuth();
	} 

	state = {
		name: "Teste1",
		email: "teste1@teste1.com",
		password: "123456",
		avatar: "",
	};

	// state = {
	// 	name: "",
	// 	email: "",
	// 	password: "",
	// 	avatar: "",
	// };

	//se logado antes
	observeAuth = () =>
		firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
	
	onAuthStateChanged = (user) => {
		// console.log(user);
		if (user) {
			console.log('Usuário logado');
			this.loginSucesso();
		}
	};

	logar = async () => {
		const user = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			avatar: this.state.avatar,
		};

		const response = firebaseRD.login(user, this.loginSucesso, this.loginFalha);
	};

	loginSucesso = async () => {
		var ref = firebase.storage().ref(`avatar/${firebaseRD.uid}`);
		const avatar = await ref.getDownloadURL();

		this.props.navigation.navigate("Salas", {
			name: this.state.name,
			email: this.state.email,
			avatar: avatar,
			user: this.state
		});
	};

	loginFalha = () => {
		Alert.alert(
      		"Erro ao logar",
      		"Tente novamente.",
      		[
				{ text: "OK", onPress: () => console.log("OK Pressed") }
			],
			{ cancelable: false }
	    );
	};

	onChangeTextEmail = (email) => this.setState({ email });
	onChangeTextPassword = (password) => this.setState({ password });

	componentDidMount() {
	}

	render() {
		return (
			<View style={styles.container}>
				<KeyboardAvoidingView keyboardVerticalOffset = {-500} behavior="padding" enabled style={{ flex: 1 }}>
					<ScrollView style={styles.container}>
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
								// autoFocus={true} 
								returnKeyType="next"
                				onSubmitEditing={() => { this.passwordTextInputRef.current.focus(); }}
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
								ref={this.passwordTextInputRef}
							/>

							<TouchableOpacity style={styles.button} onPress={this.logar}>
								<Text style={styles.buttonTitle}>Entrar</Text>
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
					</ScrollView>
				</KeyboardAvoidingView>
			</View>
		);
	}
}

export default Login;
