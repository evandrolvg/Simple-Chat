import React from 'react';
import {  Text,
          TextInput, 
          View, 
          TouchableOpacity, 
          KeyboardAvoidingView, 
          ScrollView, 
          Image,
          Alert} from 'react-native';
import firebaseRD from "../../FirebaseRD";
import styles from "../styles/AddSalaPaginaStyle";

class AddSalaPagina extends React.Component {

  constructor(props) {
		super(props);
		this.descricaoTextInputRef = React.createRef();
	} 

  state = {
		nome: "",
		descricao: ""
	};
  
	onChangeTextNome = (nome) => this.setState({ nome });
  onChangeTextDescricao = (descricao) => this.setState({ descricao });
  
  salvarSala = async () => {
    if (this.state.nome.length > 0 && this.state.descricao.length > 0 ) {
      firebaseRD.criarSala(this.state.nome, this.state.descricao);
      this.props.navigation.navigate("Salas");
    }else{
      Alert.alert(
      		"Informe os dados",
      		"Tente novamente.",
      		[
				{ text: "OK", onPress: () => console.log("OK Pressed") }
			],
			{ cancelable: false }
	    );
    }
  }
  
  render() {
		return (
      <View style={styles.container}>
        <KeyboardAvoidingView keyboardVerticalOffset = {-500} behavior="padding" enabled style={{ flex: 1 }}>
					<ScrollView style={styles.container}>
						<View style={styles.logoView}>
							<Image style={styles.logo} source={require("../img/room.png")} />
						</View>

						<View style={(styles.container, styles.mt)}>
              <View style={styles.footerView}>
								<Text style={styles.footerText}>
									<Text>
										Informe os dados da nova sala
									</Text>
								</Text>
							</View>

              <TextInput
                style={styles.input}
                placeholder="Nome"
                placeholderTextColor="#aaaaaa"
                onChangeText={this.onChangeTextNome}
                value={this.state.nome}
                underlineColorAndroid="transparent"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => { this.descricaoTextInputRef.current.focus(); }}
              />

              <TextInput
                style={styles.input}
                placeholder="Descrição"
                placeholderTextColor="#aaaaaa"
                onChangeText={this.onChangeTextDescricao}
                value={this.state.descricao}
                underlineColorAndroid="transparent"
                multiline = {true}
                autoCapitalize="sentences"
                ref={this.descricaoTextInputRef}
              />

              <TouchableOpacity style={styles.button} onPress={this.salvarSala}>
								<Text style={styles.buttonTitle}>Confirmar</Text>
							</TouchableOpacity>
							
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</View>
  	
	);
	}
}

export default AddSalaPagina;
