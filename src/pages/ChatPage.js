import React from "react";
import { GiftedChat, Send } from "react-native-gifted-chat"; // 0.3.0
import {
	View,
	Text,
	PermissionsAndroid,
	Dimensions,
	ActivityIndicator,
	Alert,
	KeyboardAvoidingView,
} from "react-native";
import styles from "../styles/ChatPageStyle";
import NavigationBar from "react-native-navbar";
import { IconButton } from "react-native-paper";
import firebase from "firebase";
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
	};

	get user() {
		return {
			name: this.props.navigation.state.params.name,
			email: this.props.navigation.state.params.email,
			avatar: this.props.navigation.state.params.avatar,
			image: this.props.navigation.state.params.email,
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
					onSend={firebaseRD.enviarMsg}
					user={this.user}
					renderSend={this.renderSend}
					renderLoading={this.renderLoading}
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
		// firebase.database().ref("Messages");
		// firebase.database().ref(`Messages/${user.salaKey}`)(message) =>;
		// console.log('sala->'+this.user.salaKey);
		firebaseRD.refOn(this.user.salaKey, (message) =>
			this.setState((previousState) => ({
				messages: GiftedChat.append(previousState.messages, message),
			}))
		);
	}
	componentWillUnmount() {
		firebaseRD.refOff(this.user.salaKey);
	}
}

export default Chat;
