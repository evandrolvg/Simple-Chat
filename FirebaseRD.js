import firebase from "firebase";
import uuid from "uuid";

const config = {
	apiKey: "AIzaSyClR7ubaWldDWozskw2Ku7FDxEjStmbkTk",
	authDomain: "rn-trabalho01.firebaseapp.com",
	databaseURL: "https://rn-trabalho01.firebaseio.com",
	projectId: "rn-trabalho01",
	storageBucket: "rn-trabalho01.appspot.com",
	messagingSenderId: "231948386994",
	appId: "1:231948386994:web:ceea3ced6136225d4c3fab",
	measurementId: "G-VREQ016WDE",
};

class FirebaseRD {
	constructor() {
		if (!firebase.apps.length) {
			firebase.initializeApp(config);
		}
	}

	login = async (user, success_callback, failed_callback) => {
		console.log("LOGIN");
		const output = await firebase
			.auth()
			.signInWithEmailAndPassword(user.email, user.password)
			.then(success_callback, failed_callback);
	};

	observeAuth = () =>
		firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

	onAuthStateChanged = (user) => {
		if (!user) {
			try {
				this.login(user);
			} catch ({ message }) {
				console.log("Failed:" + message);
			}
		}
	};

	registro = async (user) => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(user.email, user.password)
			.then(
					function () {
						console.log(
							"USUÁRIO CRIADO. EMAIL:" + user.email + " NAME:" + user.name
						);

						var userf = firebase.auth().currentUser;
						userf.updateProfile({ displayName: user.name }).then(
							function () {
								alert(
									"Usuário " + user.name + " criado com sucesso. Faça login."
								);
								
							},
							function (error) {
								console.warn("Error");
							}
						);
					}
			)
			.catch((error) => {
				console.error("ERROR:" + typeof error + " string:" + error.message);

				alert(
					"Falha ao criar conta. (" +
						this.getMsgByErrorCode(error.code) +
						")"
				);
			})

			// .then(
			// 	function () {
			// 		console.log(
			// 			"USUÁRIO CRIADO. EMAIL:" + user.email + " NAME:" + user.name
			// 		);

			// 		var userf = firebase.auth().currentUser;
			// 		userf.updateProfile({ displayName: user.name }).then(
			// 			function () {
			// 				alert(
			// 					"User " + user.name + " was created successfully. Please login."
			// 				);
			// 			},
			// 			function (error) {
			// 				console.warn("Error");
			// 			}
			// 		);
			// 	},
			// 	function (error) {
			// 		console.error("ERROR:" + typeof error + " string:" + error.message);
			// 		alert("Falha ao criar conta. (Error: " + error.message + ")");
			// 	}
			// );
	};

	uploadImage = async (uri) => {
		console.log("Imagem upload. URI:" + uri);
		try {
			const response = await fetch(uri);
			const blob = await response.blob();
			const ref = firebase.storage().ref("avatar").child(uuid.v4());
			const task = ref.put(blob);

			return new Promise((resolve, reject) => {
				task.on(
					"state_changed",
					() => {
						/* noop but you can track the progress here */
					},
					reject /* this is where you would put an error callback! */,
					() => resolve(task.snapshot.downloadURL)
				);
			});
		} catch (err) {
			console.log("UPLOAD IMAGE ERROR: " + err.message); //Cannot load an empty url
		}
	};

	updateAvatar = (url) => {
		//await this.setState({ avatar: url });
		var userf = firebase.auth().currentUser;
		if (userf != null) {
			userf.updateProfile({ avatar: url }).then(
				function () {
					console.log("Imagem. URL:" + url);
					alert("Imagem salva com sucesso.");
				},
				function (error) {
					console.warn("Erro update imagem.");
					alert("Erro update imagem:" + error.message);
				}
			);
		} else {
			alert(
				"Não foi possível realizar o upload da imagem. Faça login e tente novamente."
			);
		}
	};

	
	logout = (user) => {
		firebase
			.auth()
			.signOut()
			.then(success_callback, failed_callback);
	};

	get uid() {
		return (firebase.auth().currentUser || {}).uid;
	}

	get ref() {
		return firebase.database().ref("Messages");
	}

	parse = (snapshot) => {
		const { timestamp: numberStamp, text, user } = snapshot.val();
		const { key: id } = snapshot;
		const { key: _id } = snapshot; //needed for giftedchat
		const timestamp = new Date(numberStamp);

		const message = {
			id,
			_id,
			timestamp,
			text,
			user,
		};
		// console.log("MENSAGEM: " + message);
		return message;
	};

	refOn = (callback) => {
		this.ref
			.limitToLast(100)
			.on("child_added", (snapshot) => callback(this.parse(snapshot)));
	};

	get timestamp() {
		return firebase.database.ServerValue.TIMESTAMP;
	}

	// send the message to the Backend
	send = (messages) => {
		for (let i = 0; i < messages.length; i++) {
			const { text, user } = messages[i];
			const message = {
				text,
				user,
				createdAt: this.timestamp,
			};
			this.ref.push(message);
		}
	};

	refOff() {
		this.ref.off();
	}

	getMsgByErrorCode(errorCode) {
		switch (errorCode) {
			case "auth/wrong-password":
				return "Senha incorreta!";
			case "auth/invalid-email":
				return "E-mail inválido!";
			case "auth/user-not-found":
				return "Usuário não encontrado!";
			case "auth/user-disabled":
				return "Usuário desativado!";
			case "auth/email-already-in-use":
				return "Usuário já está em uso!";
			case "auth/operation-not-allowed":
				return "Operação não permitida!";
			case "auth/weak-password":
				return "Senha muito fraca!";
			default:
				return "Erro desconhecido!";
		}
	}
}

const firebaseRD = new FirebaseRD();
export default firebaseRD;
