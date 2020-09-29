import React from "react";
import { GiftedChat, Send } from "react-native-gifted-chat"; // 0.3.0
import {
	View,
	Text,
	Platform,
	PermissionsAndroid,
	Dimensions,
	ActivityIndicator,
	Alert,
	KeyboardAvoidingView,
	StyleSheet
} from "react-native";
import NavigationBar from "react-native-navbar";
import { IconButton } from "react-native-paper";
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
					onSend={firebaseRD.send}
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

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	sendingContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	bottomComponentContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	systemMessageWrapper: {
		backgroundColor: "#6646ee",
		borderRadius: 4,
		padding: 5,
	},
	systemMessageText: {
		fontSize: 14,
		color: "#fff",
		fontWeight: "bold",
	},
});

export default Chat;
