import React from "react";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import ImageEditor from "@react-native-community/image-editor";

import {
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	View,
	KeyboardAvoidingView,
	Image,
	
} from "react-native";
import styles from "../styles/PerfilPaginaStyle";
import firebaseRD from "../../FirebaseRD";

class Registro extends React.Component {
	constructor(props) {
		super(props);
		this.nomeTextInputRef = React.createRef();

		this.state = {
			user: this.props.navigation.state.params.user,
		};
	}

	onChangeTextName = (name) => this.setState({ name });
	
	onImageUpload = async () => {
		const { status: cameraRollPerm } = await Permissions.askAsync(
			Permissions.CAMERA_ROLL
		);
		try {
		// only if user allows permission to camera roll
			if (cameraRollPerm === 'granted') {
			let pickerResult = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
				aspect: [4, 3],
			});
			// console.log(
			// 	'ready to upload... pickerResult json:' + JSON.stringify(pickerResult)
			// );

			var wantedMaxSize = 150;
			var rawheight = pickerResult.height;
			var rawwidth = pickerResult.width;
			
			var ratio = rawwidth / rawheight;
			var wantedwidth = wantedMaxSize;
			var wantedheight = wantedMaxSize/ratio;
			// check vertical or horizontal
			if(rawheight > rawwidth){
				wantedwidth = wantedMaxSize*ratio;
				wantedheight = wantedMaxSize;
			}

			firebaseRD.uploadImage(pickerResult.uri)
				.then(resp => {
					console.log(`Sucesso: ${resp}`);
					this.setState({ avatar: resp });		
				})
				.catch(err => console.log(err));
			
				// console.log(pickerResult.uri);
			// const uploadUrl = await firebaseRD.uploadImage(pickerResult.uri);
			// if (!this._unmounted) {
			// 	  const url = uploadUrl;
			// 	  console.log(uploadUrl);
			// 	// this.setState({ user: user });
			// 	this.setState({ avatar: url });
			// }
			// //let uploadUrl = await firebaseRD.uploadImageAsync(resizedUri);
			// console.log(" - await upload successful url:" + uploadUrl);
			// console.log(" - await upload successful avatar state:" + this.state.avatar);
			// await firebaseRD.updateAvatar(uploadUrl); //might failed
      		}
		} catch (err) {
			console.log('onImageUpload error:' + err.message);
			alert('Upload image error:' + err.message);
		}
  };


	render() {
		console.log(this.state.avatar);
		return (
			<View style={styles.container}>
				<KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
					<ScrollView style={styles.container}>
						<View style={styles.logoView}>
							{typeof  this.state.avatar != 'undefined' && (
								// <Text>Results Found</Text>
								<Image style={styles.logo} source={{uri: this.state.avatar}} />
							)}
							{typeof this.state.avatar == 'undefined' && (
								<Image style={styles.logo} source={require("../img/chat.png")} />
							)}
						</View>

						<View style={(styles.container, styles.mt)}>
							<TextInput
								style={styles.input}
								placeholder="Nome"
								placeholderTextColor="#aaaaaa"
								onChangeText={this.onChangeTextName}
								value={this.state.user.name}
								underlineColorAndroid="transparent"
								autoCapitalize="words"
								ref={this.nomeTextInputRef}
							/>

							<View style={styles.footerView}>
								<Text style={styles.footerTextEsqueci}>
									<Text onPress={() => this.props.navigation.navigate("EsqueciSenha")} >
										Alterar senha
									</Text>
								</Text>

								<Text style={styles.footerText}>
									<Text onPress={this.onImageUpload}>
										Upload foto de perfil
									</Text>
								</Text>
							</View>

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
