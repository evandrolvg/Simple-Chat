import React from "react";
import { GiftedChat } from "react-native-gifted-chat"; // 0.3.0

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
		//  LogBox.ignoreLogs(["Setting a timer"]);
		// console.ignoredYellowBox = ["Setting a timer"];
	}
	
	// static navigationOptions = ({ navigation }) => ({
	// 	title: (navigation.state.params || {}).name || "Chat!",
	// });

	state = {
		messages: [],
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
		return (
			// <GiftedChat
			// 	messages={this.state.messages}
			// 	onSend={(messages) => this.onSend(messages, this.state.image)}
			// 	user={this.user}
			// 	text={this.state.messages}
			// 	alwaysShowSend={
			// 		this.state.messages ? true : false || this.state.image ? true : false
			// 	}
			// 	onInputTextChanged={(text) => this.setState({ text })}
			// 	renderLoading={() => <Loading />}
			// 	// onLoadEarlier={this.loadMessages.bind(this, userParams)}
			// 	isLoadingEarlier={loading}
			// 	isAnimated
			// 	renderAvatarOnTop
			// 	loadEarlier={this.state.messages.length >= 20}
			// 	scrollToBottom
			// 	scrollToBottomComponent={() => (
			// 		<Ionic name="ios-arrow-round-down" size={30} color="#000" />
			// 	)}
			// 	extraData={this.state}
			// 	renderBubble={(props) => {
			// 		const color = props.currentMessage.read ? "#0084ff" : "#389bff";
			// 		return (
			// 			<Bubble
			// 				{...props}
			// 				wrapperStyle={{ right: { backgroundColor: color } }}
			// 			/>
			// 		);
			// 	}}
			// 	renderActions={() => (
			// 		<Feather
			// 			style={styles.uploadImage}
			// 			onPress={this.uploadImage}
			// 			name="image"
			// 			size={30}
			// 			color="#000"
			// 		/>
			// 	)}
			// />

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





  onSend(messages = [], image) {
    const { socket, user, navigation } = this.props;
    const { friendMsgs } = this.props.messages;

    const receiver = navigation.getParam('user');

    if (socket && socket.readyState === 1) {
      const msg = {
        ...messages[0],
        image
      };

      const sendMsg = GiftedChat.append(friendMsgs, msg);

      const data = {
        senderId: user && user.id,
        receiverType: 'user',
        messageType: 'text',
        receiverId: receiver.id,
        read: false,
        content: messages[0].text
      };

      this.props.sendMsg(data, sendMsg);
    }
  }
}

export default Chat;
