import React from "react";
import {
  Text,
	View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  TouchableHighlight
} from "react-native";
import { IconButton, List, Divider } from 'react-native-paper';
import { useNavigation } from 'react-navigation';
import styles from "../styles/SalasPaginaStyle";
import firebaseRD from "../../FirebaseRD";

class SalasPagina extends React.Component {
	constructor(props) {
    super(props);
    this.initData = [];
    this.descricaoTextInputRef = React.createRef();

    this.state = {
      name: this.props.navigation.state.params.name,
      email: this.props.navigation.state.params.email,
      avatar: this.props.navigation.state.params.avatar,
      image: this.props.navigation.state.params.email,
      salas: this.initData,
      isModalVisible: false,
      inputTextSalaNome: '',
      inputTextSalaDescricao: '',
      editedItem: 0, 
    };
		
    // console.log('--------SALAS PAGINA-------------');
  }

  


  
   setModalVisible = (bool) => {
        this.setState({ isModalVisible: bool })
    }

    setInputText = (salaNome, salaDescricao) => {
        this.setState({ 
                        inputTextSalaNome: salaNome,
                        inputTextSalaDescricao: salaDescricao,
         })
    }

    setEditedItem = (key) => {
        this.setState({ editedItem: key })
    }

    handleEditItem = (editedItem) => {
        const newData = this.state.salas.map( item => {
            if (item.key === editedItem ) {
                item.nome = this.state.inputTextSalaNome;
                item.descricao = this.state.inputTextSalaDescricao;
                // firebaseRD.editaSala(this.state.inputTextSalaNome,this.state.inputTextSalaDescricao);
                firebaseRD.editaSala(item);
                return item;
            }
            return item;
        })

        this.setState({ salas: newData });
    }
  
  componentDidMount() {
    this.listenSalas(firebaseRD.refSalas);
    //  useNavigation().setOptions({
    //   headerRight: () => this.setHeaderRight(),
    // });
    // this.props.navigation.setParams({title: 'teste' });
    // this.props.navigation.setParams({
    //   headerRight: this.setHeaderRight()
    // });

    // this.props.navigation.setOptions({ title: 'Updated!' });
  }

  listenSalas(tasksRef) {
    tasksRef.on("value", dataSnapshot => {
      var salas = [];
      dataSnapshot.forEach(child => {
        salas.push({
          nome: child.val().nome,
          descricao: child.val().descricao,
          key: child.key
        });
      });
      
      this.setState({
        salas: salas
      });
    });
  }

  setHeaderRight = () => {
    //console.log("setHeaderRight", this.state.secureTextEntry);
    return (
     		
					<TouchableOpacity onPress={() => this.logout()}>
						<IconButton icon='logout' size={32} color='white' />
					</TouchableOpacity>
    );
  };
  

  logout = (user) => {
	// static logout ) {
		console.log(user);
		// const user = {
		// 	name: this.state.name,
		// 	email: this.state.email,
		// 	password: this.state.password,
		// 	avatar: this.state.avatar,
		// };

		const response = firebaseRD.logout(
			user,
			this.logoutSucesso,
			this.logoutFalha
		);
	};

	logoutSucesso = () => {
		console.log('logoutSucesso');
		this.props.navigation.navigate("Login");
	};

	logoutFalha = () => {
		Alert.alert(
      		"Erro ao deslogar",
      		"Tente novamente.",
      		[
				{ text: "OK", onPress: () => console.log("OK Pressed") }
			],
			{ cancelable: false }
	    );	
	};
  
  componentWillUnmount() {
		firebaseRD.refSalasOff();
  }
  
  renderItem = ({item}) => (
        <View style={styles.item}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Chat", {
                                                                    name: this.state.name,
                                                                    email: this.state.email,
                                                                    avatar: this.state.avatar,
                                                                    salaKey: item.key,
                                                                    salaNome: item.nome
                                                                  })}>
            <Text style={styles.text}> {item.nome} </Text>
            <Text style={styles.text}> {item.descricao} </Text>
            
            <IconButton icon='message-plus' size={32} color='#fff' onPress={() => {this.setModalVisible(true); this.setInputText(item.nome, item.descricao), this.setEditedItem(item.key)}} />
            
          </TouchableOpacity>                          
        </View>
    )
    
    render() {
        return (
            <View style={styles.container}>
              <FlatList 
                  data={this.state.salas}
                  keyExtractor={(item) => item.key.toString()}
                  renderItem={this.renderItem}
              />
               <Modal transparent={true}  animationType="fade" visible={this.state.isModalVisible} 
                    onRequestClose={() => this.setModalVisible(false)} style={styles.modalContainer}>
                    <View style={styles.modalView}>
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
                          onChangeText={(salaNome) => {
                                                          this.setState({inputTextSalaNome: salaNome}); 
                                                          // console.log('state ', this.state.inputTextSalaNome)
                                                        }}
                          defaultValue={this.state.inputTextSalaNome}
                          underlineColorAndroid="transparent"
                          editable = {true}
                          multiline = {false}
                          autoCapitalize="words"
                          returnKeyType="next"
                          onSubmitEditing={() => { this.descricaoTextInputRef.current.focus(); }}
                        />

                        <TextInput
                          style={styles.input}
                          placeholder="Descrição"
                          placeholderTextColor="#aaaaaa"
                          onChangeText={(salaDescricao) => { 
                                                                this.setState({inputTextSalaDescricao: salaDescricao}); 
                                                                //console.log('state ', this.state.inputTextSalaDescricao)
                                                              }}
                          defaultValue={this.state.inputTextSalaDescricao}
                          editable = {true}
                          multiline = {true}
                          underlineColorAndroid="transparent"
                          autoCapitalize="sentences"
                          ref={this.descricaoTextInputRef}
                        />

                        <TouchableOpacity style={styles.button} onPress={() => {this.handleEditItem(this.state.editedItem); this.setModalVisible(false)}} >
                          <Text style={styles.buttonTitle}>Confirmar</Text>
                        </TouchableOpacity>
                    
                    </View>           
                </Modal> 
              <TouchableOpacity style={styles.floatButton}>
                <IconButton icon='message-plus' size={32} color='#fff' onPress={() => this.props.navigation.navigate('AddSala')} />
              </TouchableOpacity>

              <IconButton icon='message-plus' size={32} color='#fff' onPress={() => this.logout()} />
            </View>
        )
    }
}

export default SalasPagina;
