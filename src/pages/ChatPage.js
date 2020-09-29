import React from "react";
import { GiftedChat } from "react-native-gifted-chat"; // 0.3.0
import {
	View,
	Text,
	Platform,
	PermissionsAndroid,
	Dimensions,
	ActivityIndicator,
	Alert,
	KeyboardAvoidingView,
} from "react-native";
import NavigationBar from "react-native-navbar";
import firebaseRD from "../../FirebaseRD";
import time from "../../Timer";

// type props = {
// 	name?: string,
// 	email?: string,
// 	avatar?: string,
// };

class Chat extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		messages: [],
		hasPermission: false,
		fetchChats: false,
	};
	// state = {
	// 	messages: [],
	// };

	handleAddPicture = () => {
		const { user } = this.props; // wherever you user data is stored;
		const options = {
			title: "Select Profile Pic",
			mediaType: "photo",
			takePhotoButtonTitle: "Take a Photo",
			maxWidth: 256,
			maxHeight: 256,
			allowsEditing: true,
			noData: true,
		};
		ImagePicker.showImagePicker(options, (response) => {
			console.log("Response = ", response);
			if (response.didCancel) {
				// do nothing
			} else if (response.error) {
				// alert error
			} else {
				const { uri } = response;
				const extensionIndex = uri.lastIndexOf(".");
				const extension = uri.slice(extensionIndex + 1);
				const allowedExtensions = ["jpg", "jpeg", "png"];
				const correspondingMime = ["image/jpeg", "image/jpeg", "image/png"];
				const options = {
					keyPrefix: AwsConfig.keyPrefix,
					bucket: AwsConfig.bucket,
					region: AwsConfig.region,
					accessKey: AwsConfig.accessKey,
					secretKey: AwsConfig.secretKey,
				};
				const file = {
					uri,
					name: `${this.messageIdGenerator()}.${extension}`,
					type: correspondingMime[allowedExtensions.indexOf(extension)],
				};
				RNS3.put(file, options)
					.progress((event) => {
						console.log(`percent: ${event.percent}`);
					})
					.then((response) => {
						console.log(response, "response from rns3");
						if (response.status !== 201) {
							alert(
								"Something went wrong, and the profile pic was     not uploaded."
							);
							console.error(response.body);
							return;
						}
						const message = {};
						message._id = this.messageIdGenerator();
						message.createdAt = Date.now();
						message.user = {
							_id: user._id,
							name: `${user.firstName} ${user.lastName}`,
							avatar: user.avatar,
						};
						message.image = response.headers.Location;
						message.messageType = "image";

						this.chatsFromFB.update({
							messages: [message, ...this.state.messages],
						});
					});
				if (!allowedExtensions.includes(extension)) {
					return alert("That file type is not allowed.");
				}
			}
		});
	};

	get user() {
		return {
			name: this.props.navigation.state.params.name,
			email: this.props.navigation.state.params.email,
			avatar: this.props.navigation.state.params.avatar,
			image: this.props.navigation.state.params.email,
			id: firebaseRD.uid,
			_id: firebaseRD.uid, // need for gifted-chat
		};
	}

	render() {
		// const rightButtonConfig = {
		// 	title: "Add photo",
		// 	handler: () => this.handleAddPicture(),
		// };
		return (
			<View style={{ flex: 1 }}>
				{/* <NavigationBar title={{ title: "" }} rightButton={rightButtonConfig} /> */}
				<GiftedChat
					messages={this.state.messages}
					onSend={firebaseRD.send}
					user={this.user}
					// 	renderBubble={(props) => {
					// 		const color = props.currentMessage.read ? "#0084ff" : "#389bff";
					// 		return (
					// 			<Bubble
					// 				{...props}
					// 				wrapperStyle={{ right: { backgroundColor: color } }}
					// 			/>
					// 		);
					// 	}}
				/>
			</View>
		);
	}

	componentDidMount() {
		firebaseRD.refOn((message) =>
			this.setState((previousState) => ({
				messages: GiftedChat.append(previousState.messages, message),
			}))
		);
	}
	componentWillUnmount() {
		firebaseRD.refOff();
	}

	
}

export default Chat;
