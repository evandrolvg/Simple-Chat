import React from "react";
import {
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	View,
	KeyboardAvoidingView,
 	Image,
  	ToastAndroid
} from "react-native";
import styles from "../styles/RegistroPageStyle";
import firebaseRD from "../../FirebaseRD";

class EsqueciSenha extends React.Component {
	state = {
		email: "",
		alterar_senha: this.props.navigation.state.params.alterar_senha,
	};
  
	esqueciSenha = async () => {
		if (this.state.email != '') {
			try {
				await firebaseRD.esqueciSenha(this.state.email);
			} catch ({ message }) {
				console.log("ERROR:" + message);
			}
		}else{
			ToastAndroid.showWithGravity(
				"Informe um e-mail válido",
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM
			);
		}
	};

	onChangeTextEmail = (email) => this.setState({ email });
	  
	componentDidMount() {
		if (typeof this.state.alterar_senha != undefined && this.state.alterar_senha != '') {
			this.setState({ email: this.state.alterar_senha })
		}
	}
  
	render() {
		return (
			<View style={styles.container}>
				<KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
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
							/>

							<TouchableOpacity
								style={styles.button}
								onPress={this.esqueciSenha}>
								<Text style={styles.buttonTitle}>Confirmar</Text>
							</TouchableOpacity>
							
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</View>
		);
	}
}

export default EsqueciSenha;
