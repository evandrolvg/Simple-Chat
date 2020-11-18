import React from "react";

import {
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	View,
	KeyboardAvoidingView,
	Image,
	
} from "react-native";
import styles from "../styles/RegistroPageStyle";
import firebaseRD from "../../FirebaseRD";
import Loader from "../components/Loading";

class Registro extends React.Component {
	_isMounted = false;

	constructor(props) {
		super(props);
		this.nomeTextInputRef = React.createRef();
		this.emailTextInputRef = React.createRef();
		this.passwordTextInputRef = React.createRef();

		this.state = {
			loading: true,
			name: "",
			email: "",
			password: "",
			avatar: "",
		}
	} 

	registrar = async () => {
		if (this._isMounted) {
			this.setState({ loading: true })
			try {
				const user = {
					name: this.state.name,
					email: this.state.email,
					password: this.state.password,
					avatar: this.state.avatar,
				};
				await firebaseRD.registro(user);
				setTimeout(() => {this.setState({ loading: false })}, 5000)
			} catch ({ message }) {
				this.setState({ loading: false })
				console.log("ERROR:" + message);
			}
		}
	};

	onChangeTextEmail = (email) => this.setState({ email });
	onChangeTextPassword = (password) => this.setState({ password });
	onChangeTextName = (name) => this.setState({ name });

	componentDidMount() {
		this._isMounted = true;
		this.setState({ loading: false })
	}

	componentWillUnmount() {
		this._isMounted = false;
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
								placeholder="Nome"
								placeholderTextColor="#aaaaaa"
								onChangeText={this.onChangeTextName}
								value={this.state.name}
								underlineColorAndroid="transparent"
								autoCapitalize="words"
								returnKeyType="next"
								onSubmitEditing={() => { this.emailTextInputRef.current.focus(); }}
								ref={this.nomeTextInputRef}
							/>
							<TextInput
								style={styles.input}
								placeholder="E-mail"
								placeholderTextColor="#aaaaaa"
								onChangeText={this.onChangeTextEmail}
								value={this.state.email}
								underlineColorAndroid="transparent"
								autoCapitalize="none"
								keyboardType="email-address"
								returnKeyType="next"
                				onSubmitEditing={() => { this.passwordTextInputRef.current.focus(); }}
								ref={this.emailTextInputRef}
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

							<TouchableOpacity
								style={styles.button}
								onPress={this.registrar}>
								<Text style={styles.buttonTitle}>Confirmar</Text>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</View>
		);
	}
}

export default Registro;
