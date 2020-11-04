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
import styles from "../styles/RegistroPageStyle";
import firebaseRD from "../../FirebaseRD";

class Registro extends React.Component {
	state = {
		name: "Teste1",
		email: "teste1@teste1.com",
		password: "123456",
		avatar: "",
	};

	registrar = async () => {
		try {
			const user = {
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
				avatar: this.state.avatar,
			};
			await firebaseRD.registro(user);
			this.goLogin();
		} catch ({ message }) {
			console.log("ERROR:" + message);
		}
	};

	goLogin() {
		this.props.navigation.replace("Login");
	}

	onChangeTextEmail = (email) => this.setState({ email });
	onChangeTextPassword = (password) => this.setState({ password });
	onChangeTextName = (name) => this.setState({ name });

	 onImageUpload = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    try {
      // only if user allows permission to camera roll
      if (cameraRollPerm === 'granted') {
        console.log('choosing image granted...');
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
        console.log(
          'ready to upload... pickerResult json:' + JSON.stringify(pickerResult)
        );

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
        console.log("scale image to x:" + wantedwidth + " y:" + wantedheight);
        // let resizedUri = await new Promise((resolve, reject) => {
        //   ImageEditor.cropImage(pickerResult.uri,
        //   {
        //       offset: { x: 0, y: 0 },
        //       size: { width: pickerResult.width, height: pickerResult.height },
        //       displaySize: { width: wantedwidth, height: wantedheight },
        //       resizeMode: 'contain',
        //   },
        //   (uri) => resolve(uri),
        //   () => reject(),
        //   );
		// });
		console.log('------------------');
		console.log(pickerResult.uri);
        let uploadUrl = await firebaseRD.uploadImage(pickerResult.uri);
        //let uploadUrl = await firebaseRD.uploadImageAsync(resizedUri);
        await this.setState({ avatar: uploadUrl });
        console.log(" - await upload successful url:" + uploadUrl);
        console.log(" - await upload successful avatar state:" + this.state.avatar);
        await firebaseRD.updateAvatar(uploadUrl); //might failed
      }
    } catch (err) {
      console.log('onImageUpload error:' + err.message);
      alert('Upload image error:' + err.message);
    }
  };


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
								placeholder="Nome"
								placeholderTextColor="#aaaaaa"
								onChangeText={this.onChangeTextName}
								value={this.state.name}
								underlineColorAndroid="transparent"
								autoCapitalize="words"
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

							<TouchableOpacity
								style={styles.button}
								onPress={this.registrar}>
								<Text style={styles.buttonTitle}>Confirmar</Text>
							</TouchableOpacity>

							<View style={styles.footerView}>
								<Text style={styles.footerText}>
									<Text onPress={this.onImageUpload}>
										Upload foto de perfil
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

export default Registro;
