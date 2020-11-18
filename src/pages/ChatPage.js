import React from "react";
import { 
		GiftedChat,
		Send, 
		Bubble,
		MessageText
} from "react-native-gifted-chat";
import {
	View,
	Text,
	PermissionsAndroid,
	Dimensions,
	ActivityIndicator,
	Alert,
	KeyboardAvoidingView,
	Icon,
	Image
} from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import styles from "../styles/ChatPageStyle";
import NavigationBar from "react-native-navbar";
import ImageModal from 'react-native-image-modal';
import { IconButton } from "react-native-paper";
import firebase from "firebase";
import firebaseRD from "../../FirebaseRD";
import { Col, Row, Grid } from "react-native-easy-grid";
import time from "../../Timer";

class Chat extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		messages: [],
	};

	get user() {
		var userf = firebase.auth().currentUser;

		return {
			name: userf.displayName,
			email: this.props.navigation.state.params.email,
			avatar: userf.photoURL,
			
			salaKey: this.props.navigation.state.params.salaKey,
            salaNome: this.props.navigation.state.params.salaNome,
			id: firebaseRD.uid,
			_id: firebaseRD.uid, // for gifted-chat
		};
	}

	onImageUploadChat = async () => {
		const { status: cameraRollPerm } = await Permissions.askAsync(
			Permissions.CAMERA_ROLL
		);
		try {
		// only if user allows permission to camera roll
			if (cameraRollPerm === 'granted') {
				let pickerResult = await ImagePicker.launchImageLibraryAsync({
					allowsEditing: false,
			});

			firebaseRD.uploadImageChat(pickerResult.uri, this.user.salaKey)
				.then(resp => {
					if (this._isMounted) {
						if (typeof resp != undefined && resp != undefined) {
							console.log(`Imagem: ${resp}`);
							
							const message = [];
							message._id = firebaseRD.guidGenerator();
							message.createdAt = Date.now();
							message.user = this.user
							message.image = resp;
							message.text = '';

							let message_img = [
								message
							];

							// this.setState(prevState => ({
							// 	messages: [...prevState.messages, message_img]
							// }))

							// this.setState((previousState) => ({
							// 	messages: GiftedChat.append(previousState.messages, message_img),
							// }))
							
							firebaseRD.enviarMsg(message_img)
						}
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
		this._isMounted = true;
		firebaseRD.refOnMensagens(this.user.salaKey, (message) =>
			this.setState((previousState) => ({
				messages: GiftedChat.append(previousState.messages, message),
			}))
		);
	}

	componentWillUnmount() {
		this.setState({
			messages: [],
        });
		firebaseRD.refOffMensagens(this.user.salaKey);
	}
	
	renderLoading() {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size='large' color='#6646ee' />
			</View>
		);
	}
	
	renderSend(props) {
		return (
			<Send {...props}>
				<View style={styles.sendingContainer}>
					<IconButton icon='send-circle' size={50} color='#263A44' />
				</View>
			</Send>
		);
	}

	renderBubble(props) {
		return (

			<Bubble
				{...props}
				wrapperStyle={{
					right: {
						backgroundColor: '#88cbf0'
					},
					left: {
						backgroundColor: '#263A44'
					},
				}}
				textStyle={{
					right: {
						color: '#fff'
					},
					left: {
						color: '#fff'
					}
				}}
			/>
		);
	}
	
	scrollToBottomComponent() {
		return (
			<View style={styles.bottomComponentContainer}>
				<IconButton icon='chevron-double-down' size={36} color='#263A44' />
			</View>
		);
	}

   	renderSystemMessage(props) {
		return (
			<SystemMessage
				{...props}
				wrapperStyle={styles.systemMessageWrapper}
				textStyle={styles.systemMessageText}
			/>
		);
	}
	
	renderMessageImage  = (props) => {
		if (props.currentMessage.image) {
			return (
				<View style={props.containerStyle}>
					{/* <Image source={{uri: props.currentMessage.image}} style={{width: 200, height:200, resizeMode : 'contain', margin: 10 }} /> */}
					<ImageModal
						resizeMode="contain"
						imageBackgroundColor="#ffffff00"
						style={{
							width: 200,
							height: 200,
						}}
						source={{
							uri: props.currentMessage.image,
						}}
					/>
				</View>
			);
		}
		return null
	}

	renderMessageText = (props) => (
		<MessageText
			{...props}
			
			textStyle={{
				left: { color: '#fff' },
				right: { color: '#fff' },
			}}
			linkStyle={{
				left: { color: '#B7DEFF' },
				right: { color: 'blue' },
			}}
			// customTextStyle={{ fontSize: 24, lineHeight: 24 }}
		/>
	  );
	
	render() {
		return (
			<View style={{ flex: 1 }}>
				<View style={styles.sendingContainer}>
					<View style={{flexDirection:"row"}}>
						<View style={{flex:1}}>
							<IconButton icon='camera' size={32} color='#263A44' style={styles.options} onPress={this.onImageUploadChat} />
						</View>
					</View>
				</View>
				<GiftedChat
					messages={this.state.messages}
					// onSend={firebaseRD.enviarMsg()}
					onSend={messages => firebaseRD.enviarMsg(messages, this.state.image)}
					user={this.user}
					renderSend={this.renderSend}
					renderBubble={this.renderBubble}
					renderLoading={this.renderLoading}
					renderMessageText ={this.renderMessageText}
					renderMessageImage={this.renderMessageImage}
					scrollToBottomComponent={this.scrollToBottomComponent}
					timeFormat={'H:M'}
					renderUsernameOnMessage
					alwaysShowSend
					placeholder="Escreva sua mensagem..."
					showUserAvatar
					isAnimated
					showAvatarForEveryMessage
					scrollToBottom
				/>
			</View>
		);
	}
}

export default Chat;
