import React from "react";
import {
	Text,
	TextInput,
	ScrollView,
	TouchableOpacity,
	View,
	KeyboardAvoidingView,
	Image,
	ToastAndroid,
	Alert
} from "react-native";

import styles from "../styles/LoginPageStyle";
import Loader from "../components/Loading";
import firebaseRD from "../../FirebaseRD";
import firebase from "firebase";

class Login extends React.Component {
	_isMounted = false;

	constructor(props) {
		super(props);
		this.passwordTextInputRef = React.createRef();
		this.observeAuth();

		this.state = {
			loading: true,
			name: "",
			email: "evandrolvg@gmail.com",
			password: "123456",
			avatar: "",
			// name: "",
			// email: "",
			// password: "",
			// avatar: "",
		}
	}

	//se logado antes
	observeAuth = () =>
		firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
	
	onAuthStateChanged = (user) => {
		console.log(user);
		if (typeof firebaseRD.uid != undefined) {
			if (user && typeof user != undefined) {
				console.log('Usuário logado');
				this.loginSucesso();
			}
		}else{
			this.props.navigation.navigate("Login");
		}
	};

	logar = async () => {
		this.setState({ loading: true })
		const user = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			avatar: this.state.avatar,
		};

		const response = firebaseRD.login(user, this.loginSucesso, this.loginFalha);
	};

	loginSucesso = async () => {
		var userf = firebase.auth().currentUser;
						
		if (this._isMounted) {
			this.setState({ name: userf.displayName, avatar:userf.photoURL });

			this.props.navigation.navigate("Salas", {
				name: this.state.name,
				email: this.state.email,
				avatar: this.state.avatar,
				user: this.state
			});
		}

		// try {
		// 	var ref = firebase.storage().ref(`avatar/${firebaseRD.uid}`);
		// 	// avatar = await ref.getDownloadURL();
		// 	ref.getDownloadURL()
		// 		.then(result => {
		// 			if (this._isMounted) {
		// 				this.setState({ avatar: result })
						
						
		// 			}
		// 			this.setState({ loading: false })
		// 		}),
		// 		function (error) {
		// 			console.log('teste error');
		// 		}
		// 		// .catch(err = {
		// 		// 	// do something with err
		// 		// });
		// } catch (err) {
		// 	ToastAndroid.showWithGravity(
		// 		"Ocorreu algum erro ao logar (avatar).",
		// 		ToastAndroid.SHORT,
		// 		ToastAndroid.BOTTOM
		// 	);
		// }
			
	
	};

	loginFalha = () => {
		this.setState({ loading: false })
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
		this._isMounted = true;
		this.setState({ loading: false })
	}

	componentWillUnmount() {
		this._isMounted = false;
		firebase.database().ref(`Usuario/${firebaseRD.uid}`).off();
  	}

	render() {
		return (
			<View style={styles.container}>
				<KeyboardAvoidingView keyboardVerticalOffset = {-500} behavior="padding" enabled style={{ flex: 1 }}>
					<ScrollView style={styles.container}>
						<Loader
          					loading={this.state.loading} />
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
								keyboardType="email-address"
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
								<Text style={styles.footerTextEsqueci}>
									<Text onPress={() => this.props.navigation.navigate("EsqueciSenha", { alterar_senha: '' })} >
										Esqueci minha senha
									</Text>
								</Text>
								<Text style={styles.footerText}>
									<Text onPress={() => this.props.navigation.navigate("Registro")} >
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
