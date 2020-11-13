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
import Loader from "../components/Loading";
import styles from "../styles/PerfilPaginaStyle";
import firebaseRD from "../../FirebaseRD";
import firebase from "firebase";

class PerfilPagina extends React.Component {
	_isMounted = false;

	constructor(props) {
		super(props);
		this.nomeTextInputRef = React.createRef();

		this.state = {
			// user: this.props.navigation.state.params.user,
			avatar: this.props.navigation.state.params.user.avatar

		};
	}

	editaUsuario = async () => {
		this.setState({ loading: true })
		try {
			const user = {
				name: this.state.name,
			};
			firebaseRD.editaUsuario(user);
			this.setState({ loading: false });
		} catch ({ message }) {
			this.setState({ loading: false });
			console.log("ERROR:" + message);
		}
	};

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
				aspect: [4, 4],
			});
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
					if (this._isMounted) {
						this.setState({ avatar: resp });

						var userf = firebase.auth().currentUser;
            			userf.updateProfile({ photoURL: resp }).then(
							function () {
                				console.log("Avatar OK");  
							},
							function (error) {
								console.log("Erro avatar");
							}
						);
					}
				})
				.catch(err => console.log(err));
      		}
		} catch (err) {
			console.log('onImageUpload error:' + err.message);
			alert('Upload image error:' + err.message);
		}
  	};

	componentDidMount() {
		this.setState({ loading: false })
		this._isMounted = true;

		var userf = firebase.auth().currentUser;
						
		if (this._isMounted) {
			this.setState({ name: userf.displayName, avatar:userf.photoURL });
		}
		console.log(this.state.avatar);
	}

	componentWillUnmount() {
    	this._isMounted = false;
  	}

	render() {
		return (
			<View style={styles.container}>
				<Loader loading={this.state.loading} />
				<KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
					<ScrollView style={styles.container}>
						<View style={styles.logoView}>
							{typeof this.state.avatar != 'undefined' && this.state.avatar != null && (
								<Image style={styles.logo} source={{uri: this.state.avatar}} />
							)}
							{typeof this.state.avatar == 'undefined' || this.state.avatar == null && (
								<Image style={styles.logo} source={require("../img/chat.png")} />
							)}

							<Text style={styles.footerText}>
								<Text style={styles.link} onPress={this.onImageUpload}>
									Editar imagem
								</Text>
							</Text>
						</View>

						<View style={(styles.container, styles.mt)}>
							<TextInput
								style={styles.input}
								placeholder="Nome"
								placeholderTextColor="#aaaaaa"
								onChangeText={this.onChangeTextName}
								defaultValue={this.state.name}
                        		editable = {true}
								underlineColorAndroid="transparent"
								autoCapitalize="words"
								ref={this.nomeTextInputRef}
							/>

							<View style={styles.footerView}>
								<Text style={styles.link} onPress={() => this.props.navigation.navigate("AlterarSenha", { alterar_senha: this.state.user.email })} >
									Alterar senha
								</Text>
							</View>

							<TouchableOpacity
								style={styles.button}
								onPress={this.editaUsuario}>
								<Text style={styles.buttonTitle}>Confirmar</Text>
							</TouchableOpacity>

						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</View>
		);
	}
}

export default PerfilPagina;
