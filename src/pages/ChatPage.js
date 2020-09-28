import React from "react";
import { GiftedChat } from "react-native-gifted-chat"; // 0.3.0

import firebaseRD from "../../FirebaseRD";

// type props = {
// 	name?: string,
// 	email?: string,
// 	avatar?: string,
// };

class Chat extends React.Component {
	constructor(props) {
		super(props);
	}
	static navigationOptions = ({ navigation }) => ({
		title: (navigation.state.params || {}).name || "Chat!",
	});

	state = {
		messages: [],
	};

	get user() {
		return {
			name: this.props.navigation.state.params.name,
			email: this.props.navigation.state.params.email,
			avatar: this.props.navigation.state.params.avatar,
			id: firebaseRD.uid,
			_id: firebaseRD.uid, // need for gifted-chat
		};
	}

	render() {
		return (
			<GiftedChat
				messages={this.state.messages}
				onSend={firebaseRD.send}
				user={this.user}
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
}

export default Chat;
