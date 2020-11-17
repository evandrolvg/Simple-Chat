import firebase from "firebase";
import { auth, initializeApp, storage } from 'firebase';
import uuid from "uuid";
import { ToastAndroid } from "react-native";

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
	
	guidGenerator() {
		var S4 = function() {
		   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		};
		return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
	}

	// ------------- LOGIN -------------
	login = async (user, success_callback, failed_callback) => {
		const output = await firebase
			.auth()
			.signInWithEmailAndPassword(user.email, user.password)
			.then(success_callback, failed_callback);
	};

	logout = async (success_callback, failed_callback) => {
		firebase
			.auth()
			.signOut()
			.then(success_callback, failed_callback);
	};

	get uid() {
		return (firebase.auth().currentUser || {}).uid;
	}

	get currentUser() {
		return (firebase.auth().currentUser || {});
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
	// ------------- FIM LOGIN -------------

	// ------------- REGISTRO USUÁRIO -------------
	registro = async (user) => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(user.email, user.password)
			.then(
					function () {
						
						// firebase.auth().signOut();
						console.log(
							"USUÁRIO CRIADO. EMAIL:" + user.email
						);
						
						var userf = firebase.auth().currentUser;
						
						userf.updateProfile({ displayName: user.name }).then(
							function () {
								firebase.storage().ref("avatar").child(userf.uid);
								// firebase.database()
								// .ref(`Usuario/${userf.uid}`)
								// .set({
								// 	name: user.name,
								// })
								// .then(() => console.log('Usuario gravado'));
								console.log('Usuario gravado')
							},
							function (error) {
								console.log("Erro registro");
							}
						);
					}
			)
			.catch((error) => {
				console.log(error);
				alert(
					"Falha ao criar conta. (" +
						this.getMsgByErrorCode(error.code) +
					")"
				);
			})
	};

	editaUsuario(item){
		var userf = firebase.auth().currentUser;
		userf.updateProfile({ displayName: item.name }).then(
			function () {
				ToastAndroid.showWithGravity(
					"Dados alterados",
					ToastAndroid.SHORT,
					ToastAndroid.BOTTOM
				);
			},
			function (error) {
				ToastAndroid.showWithGravity(
					"Erro ao alterar dados",
					ToastAndroid.SHORT,
					ToastAndroid.BOTTOM
				);
			}
		);
	}

	esqueciSenha = async (email) => {
		firebase
			.auth()
			.sendPasswordResetEmail(email)
			.then(
					function () {
						console.log(
							"Email enviado"
						);
						ToastAndroid.showWithGravity(
							"Email enviado",
							ToastAndroid.SHORT,
							ToastAndroid.BOTTOM
						);
					}
			)
			.catch((error) => {
				alert(
						"Falha ao resetar senha. (" +
							this.getMsgByErrorCode(error.code) +
						")"
				);
			})
	};

	uploadImage = async (uri) => {
		// console.log("Imagem upload. URI:" + uri);
		try {
			const response = await fetch(uri);
			const blob = await response.blob();
			const ref = firebase.storage().ref("avatar").child(this.uid);
			const task = ref.put(blob);

			return new Promise((resolve, reject) => {
				task.on(
					"state_changed",
					() => {
						/* noop but you can track the progress here */
					},
					reject /* this is where you would put an error callback! */,
					() => 
					{
						ref.getDownloadURL()
							.then(url => {
								// console.log('[completed. Dowload URL]' + url);
								resolve(url);
							}); 
					}
					// resolve(task.snapshot.getDownloadURL)
				);
			});
		} catch (err) {
			console.log("UPLOAD IMAGE ERROR: " + err.message); //Cannot load an empty url
		}
	};

	updateAvatar = (url) => {
		var userf = firebase.auth().currentUser;
		if (userf != null) {
			userf.updateProfile({ avatar: url }).then(
				function () {
					// console.log("Imagem. URL:" + url);
					alert("Imagem salva com sucesso.");
				},
				function (error) {
					// console.warn("Erro update imagem.");
					alert("Erro update imagem:" + error.message);
				}
			);
		} else {
			alert(
				"Não foi possível realizar o upload da imagem. Faça login e tente novamente."
			);
		}
	};

	refUsuario(uid) {
		return firebase.database().ref(`Usuario/${uid}`);
		
	}
	// ------------- FIM REGISTRO USUÁRIO -------------

	// ------------- SALAS -------------
	get refSalas() {
		return firebase.database().ref("Salas");
	}

	parseSala = (snapshot) => {
		const { key: id } = snapshot;
		const { key: _id } = snapshot; //needed for giftedchat

		const sala = {
			id,
			_id,
			nome
		};
		console.log("SALA: " + sala);
		return sala;
	};

	getSalas = (callback) => {
		this.refSalas
			.limitToLast(100)
			.on("child_added", (snapshot) => callback(this.parseSala(snapshot)));
	};

	refSalasOff() {
		this.refSalas.off();
	}

	criarSala = (salaNome, salaDescricao) => {
		const newReference = firebase.database()
  			.ref('/Salas')
  			.push();

		// console.log('Auto generated key: ', newReference.key);
		newReference
		.set({
				nome: salaNome,
				descricao: salaDescricao,
				// latestMessage: {
				// 	text: `You have joined the room ${salaNome}.`,
				// 	createdAt: new Date().getTime()
				// }
		})
		.then(() => console.log('Sala criada.'));
	};

	editaSala(item){
		firebase.database()
  			.ref('Salas/' + item.key).update({nome: item.nome, descricao: item.descricao});
    	
	}
	// ------------- FIM SALAS -------------

	// ------------- MENSAGENS -------------
	refMensagens(sala) {
		return firebase.database().ref(`Messages/${sala}`);
	}

	parseMensagens = (snapshot) => {
		// console.log(snapshot.val());
		const { createdAt, text, user, image } = snapshot.val();
		const { key: id } = snapshot;
		const { key: _id } = snapshot; //needed for giftedchat
		
		const message = {
			id,
			_id,
			// timestamp,
			createdAt,
			text,
			user,
			image
		};
		// console.log("MENSAGEM: " + message);
		return message;
	};

	refOnMensagens = async (sala, callback) => {
		this.refMensagens(sala)
			.limitToLast(100)
			.on("child_added", (snapshot) => callback(this.parseMensagens(snapshot)));
	};

	get timestamp() {
		return firebase.database.ServerValue.TIMESTAMP;
	}

	enviarMsg = (messages, img) => {
		// console.log('------------------------------------------');
		console.log(messages);
		for (let i = 0; i < messages.length; i++) {
			const { text, user, image } = messages[i];
			if (image == undefined) {
				image = '';
			}
			const message = {
				text,
				user,
				image,
				// createdAt: new Date()
				
				createdAt: this.timestamp,
			};
			// console.log(message);
			firebase.database().ref(`Messages/${user.salaKey}`).push(message);
		}
	};

	refOffMensagens(sala) {
		this.refMensagens(sala).off();
	}

	uploadImageChat = async (uri, sala) => {
		// console.log("Imagem upload. URI:" + uri);
		console.log(sala +'_'+ this.guidGenerator());
		try {
			const response = await fetch(uri);
			const blob = await response.blob();
			const ref = firebase.storage().ref("chat").child(sala +'_'+ this.guidGenerator());
			const task = ref.put(blob);

			return new Promise((resolve, reject) => {
				task.on(
					"state_changed",
					() => {
						/* noop but you can track the progress here */
					},
					reject /* this is where you would put an error callback! */,
					() => 
					{
						ref.getDownloadURL()
							.then(url => {
								// console.log('[completed. Dowload URL]' + url);
								resolve(url);
							}); 
					}
					// resolve(task.snapshot.getDownloadURL)
				);
			});
		} catch (err) {
			console.log("UPLOAD IMAGE ERROR: " + err.message); //Cannot load an empty url
		}
	};
	// ------------- FIM MENSAGENS -------------
	
}

const firebaseRD = new FirebaseRD();
export default firebaseRD;
