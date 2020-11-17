import React from "react";
import { GiftedChat, Send, Bubble, Actions,
	ActionsProps  } from "react-native-gifted-chat"; // 0.3.0
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
import { IconButton } from "react-native-paper";
import firebase from "firebase";
import firebaseRD from "../../FirebaseRD";
import time from "../../Timer";

class Chat extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		// messages: [{user: null, text: null, image: null}],
		messages: [],
		image: ''
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
				<IconButton icon='send-circle' size={32} color='#6646ee' />
			</View>
		</Send>
		);
	}

	renderBubble(props) {
		// console.log('---------------------------------------------------------');
		// console.log(props.currentMessage.image);
		return (
		// Step 3: return the component
		
		<Bubble
			{...props}
			wrapperStyle={{
			right: {
				// Here is the color change
				backgroundColor: 'blue'
			}
			}}
			textStyle={{
			right: {
				color: '#fff'
			}
			}}
		/>
				
		);
	}
	
	scrollToBottomComponent() {
		return (
			<View style={styles.bottomComponentContainer}>
				<IconButton icon='chevron-double-down' size={36} color='#6646ee' />
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
			image: ''
        });
		firebaseRD.refOffMensagens(this.user.salaKey);
	}
	
	onImageUploadChat = async () => {
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
			
			firebaseRD.uploadImageChat(pickerResult.uri, this.user.salaKey)
				.then(resp => {
					console.log(`Sucesso: ${resp}`);
					if (this._isMounted) {
						console.log('+++++++++++++++++');
						// this.setState({image: resp });
						const message = [];
						// let message = [
						// 	['_id', firebaseRD.guidGenerator()],
						// 	['createdAt', Date.now()],
						// 	['user', this.user],
						// 	['image', resp],
						// 	['text', 'teste']
						// ];
						
						message._id = firebaseRD.guidGenerator();
                        message.createdAt = Date.now();
                        message.user = this.user
						message.image = resp;
						message.text = 'teste';

						let message_img = [
							message
						];
						this.setState(prevState => ({
							messages: [...prevState.messages, message_img]
						}))
						// console.log(this.state.messages);
						firebaseRD.enviarMsg(message_img)
					}

				})
				.catch(err => console.log(err));
      		}
		} catch (err) {
			console.log('onImageUpload error:' + err.message);
			alert('Upload image error:' + err.message);
		}
	};

	renderCustomView = (props) => {
		return (
			<View style={props.containerStyle}>
			</View>
		);
	}
	
	renderMessageImage  = (props) => {
		if (props.currentMessage.image) {
			return (
				<View style={props.containerStyle}>
					<Image source={{uri: props.currentMessage.image}} style={{width: 200, height:200, resizeMode : 'contain', margin: 5 }} />
				</View>
			);
		}
		return null
	}

	render() {
		const rightButtonConfig = {
			title: "Add photo",
			handler: () => this.onImageUploadChat().then(resp => {//firebaseRD.enviarMsg(this.state.messages, this.state.image),
				//  this.setState({ image: '' })
				}),
		};
		return (
			<View style={{ flex: 1 }}>
				<NavigationBar title={{ title: "" }} rightButton={rightButtonConfig} />
				<GiftedChat
					messages={this.state.messages}
					// onSend={firebaseRD.enviarMsg()}
					onSend={messages => firebaseRD.enviarMsg(messages, this.state.image)}
					user={this.user}
					renderSend={this.renderSend}
					renderLoading={this.renderLoading}
					renderUsernameOnMessage
					renderCustomView={this.renderCustomView}
					renderMessageImage={this.renderMessageImage}
					
					renderBubble={this.renderBubble}
					placeholder="Escreva sua mensagem..."
					showUserAvatar
					isAnimated
					showAvatarForEveryMessage
					scrollToBottomComponent={this.scrollToBottomComponent}
      				// renderSystemMessage={this.renderSystemMessage}
					scrollToBottom
					// renderBubble={(props) => {
					// 	const color = props.currentMessage.read ? "#0084ff" : "#389bff";
					// 	return (
					// 		<Bubble
					// 			{...props}
					// 			wrapperStyle={{ right: { backgroundColor: color } }}
					// 		/>
					// 	);
					// }}
				/>
			</View>
		);
	}

	
}

export default Chat;
