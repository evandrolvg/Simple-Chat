import React from "react";
import {
  Text,
	View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Icon,
  Button,
  TouchableHighlight,
  SafeAreaView,
  Image,
} from "react-native";
import { IconButton, List, Divider, Avatar } from 'react-native-paper';
import styles from "../styles/SalasPaginaStyle";
import firebaseRD from "../../FirebaseRD";
import { Col, Row, Grid } from "react-native-easy-grid";

class SalasPagina extends React.Component {
	constructor(props) {
    super(props);
    this.iniData = [];
    this.descricaoTextInputRef = React.createRef();

    this.state = {
      name: this.props.navigation.state.params.name,
      email: this.props.navigation.state.params.email,
      avatar: this.props.navigation.state.params.avatar,
      image: this.props.navigation.state.params.email,
      salas: this.iniData,
      modalVisivel: false,
      inputTextSalaNome: '',
      inputTextSalaDescricao: '',
      itemEdita: 0, 
      menuVisivel: false,
    };
  }
  
  modalVisivel = (bool) => {
    this.setState({ modalVisivel: bool })
  }

  setInputTexto = (salaNome, salaDescricao) => {
    this.setState({ 
                  inputTextSalaNome: salaNome,
                  inputTextSalaDescricao: salaDescricao,
    })
  }

  setItemEdita = (key) => {
    this.setState({ itemEdita: key })
  }

  editar = (itemEdita) => {
    const novoDado = this.state.salas.map( item => {
        if (item.key === itemEdita ) {
            item.nome = this.state.inputTextSalaNome;
            item.descricao = this.state.inputTextSalaDescricao;
            // firebaseRD.editaSala(this.state.inputTextSalaNome,this.state.inputTextSalaDescricao);
            firebaseRD.editaSala(item);
            return item;
        }
        return item;
    })

    this.setState({ salas: novoDado });
  }

  menuVisivel = (bool) => {
    this.setState({ menuVisivel: bool })
  }
  
  componentDidMount() {
    this.listenSalas(firebaseRD.refSalas);
  }

  listenSalas(refSalas) {
    refSalas.on("value", dataSnapshot => {
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

  logout = () => {
		const response = firebaseRD.logout(
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
  
  renderSala = ({item}) => (
    <TouchableOpacity onPress={() => this.props.navigation.navigate("Chat", {
      name: this.state.name,
      email: this.state.email,
      avatar: this.state.avatar,
      salaKey: item.key,
      salaNome: item.nome
                                                                  })}>

        <Grid>
          <Col size={20} style={styles.btnEdit}>
            <Image source={require('../img/chatimg.png')} resizeMode='contain' style={styles.imgSala} />
          </Col>
          <Col size={70}>
              <Row>
                  <Text style={styles.textTitle}> {item.nome} </Text>
              </Row>
              <Row>
                  <Text style={styles.textSub}> {item.descricao} </Text>
              </Row>
          </Col>
          <Col size={10} style={styles.btnEdit}>
            <IconButton icon='square-edit-outline' size={32} color='#b9babb' onPress={() => {this.modalVisivel(true); this.setInputTexto(item.nome, item.descricao), this.setItemEdita(item.key)}} />
          </Col>
        </Grid>
        <Divider />
      </TouchableOpacity>
    
    )
    
    render() {
        return (
          <View style={styles.container}>
              <FlatList 
                  data={this.state.salas}
                  keyExtractor={(item) => item.key.toString()}
                  renderItem={this.renderSala}
              />
                <Modal transparent={true}  animationType="fade" visible={this.state.modalVisivel} 
                  onRequestClose={() => this.modalVisivel(false)} style={styles.modalContainer}>
                  <View style={styles.modalView}>
                      <View style={styles.footerView}>
                        <Text style={styles.footerText}>
                          <Text>
                            Informe os dados da nova sala
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.menuContView}>
                        <Image source={require('../img/room.png')} resizeMode='contain' style={styles.imgEdit} />
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

                      <TouchableOpacity style={styles.button} onPress={() => {this.editar(this.state.itemEdita); this.modalVisivel(false)}} >
                        <Text style={styles.buttonTitle}>Confirmar</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.buttonCancel} onPress={() => {this.modalVisivel(false)}} >
                        <Text style={styles.buttonTitle}>Cancelar</Text>
                      </TouchableOpacity>
                    </View>           
                </Modal> 

                <Modal transparent={true}  animationType="fade" visible={this.state.menuVisivel} 
                  onRequestClose={() => this.menuVisivel(false)} style={styles.modalContainer}>
                  <View style={styles.menuView}>
                      <TouchableOpacity style={styles.buttonClose} onPress={() => {this.menuVisivel(false)}} >
                        <Text style={styles.buttonTitle}>X</Text>
                      </TouchableOpacity>
                      
                      <View style={styles.menuContView}>
                        <TouchableOpacity style={styles.btnMenu} onPress={() => {this.menuVisivel(false); this.props.navigation.navigate('AddSala')}}>
                          <Grid>
                              <Col size={40} style={styles.btnMenu}>
                                <Row>
                                  <Image source={require('../img/room.png')} resizeMode='contain' style={styles.imgBtnMenu} />
                                </Row>
                              </Col>
                              <Col size={60} style={styles.btnMenu}>
                                <Row>
                                  <Text>Adicionar sala</Text>
                                </Row>
                              </Col>
                            </Grid>
                        </TouchableOpacity>
                      </View>

                      <View style={styles.menuContView, styles.borderBottom}>
                        
                      </View>                                      
                      <View style={styles.menuContView}>
                        <TouchableOpacity style={styles.btnMenu} onPress={() => {this.menuVisivel(false); this.props.navigation.navigate('Registro')}}>
                          <Grid>
                              <Col size={40} style={styles.btnMenu}>
                                <Image source={require('../img/user.png')} resizeMode='contain' style={styles.imgBtnMenu} />
                              </Col>
                              <Col size={60} style={styles.btnMenu}>
                                  <Text>Meu perfil</Text>
                              </Col>
                            </Grid>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.menuContView}>
                        <TouchableOpacity style={styles.buttonLogout} onPress={() => {this.menuVisivel(false); this.logout()}} >
                          <Image source={require('../img/logout.png')} resizeMode='contain' style={styles.imgBtnMenu} />
                        </TouchableOpacity>
                      </View>
                    </View>           
                </Modal> 
              
                <TouchableOpacity  activeOpacity={0.7} style={styles.floatButton}>
                  <IconButton icon='dots-vertical' size={32} color='#fff' onPress={() => {this.menuVisivel(true)}} />
                </TouchableOpacity>
            </View>
        )
    }
}

export default SalasPagina;
