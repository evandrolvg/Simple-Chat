import React from "react";
import {
	View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { IconButton, List, Divider } from 'react-native-paper';
import styles from "../styles/SalasPaginaStyle";
import firebaseRD from "../../FirebaseRD";

class SalasPagina extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      name: this.props.navigation.state.params.name,
      email: this.props.navigation.state.params.email,
      avatar: this.props.navigation.state.params.avatar,
      image: this.props.navigation.state.params.email,
      salas: [],
    };
		
    // console.log('--------SALAS PAGINA-------------');
  }
  
  componentDidMount() {
    this.listenSalas(firebaseRD.refSalas);
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
  
  componentWillUnmount() {
		firebaseRD.refSalasOff();
	}

  render() {
    // const { salas, currentSala, currentIndex } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.salas}
          keyExtractor={item => item.key}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item }) => (
            <List.Item
              title={item.nome}
              description={item.descricao}
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
              onPress={() => this.props.navigation.navigate("Chat", {
                                                                      name: this.state.name,
                                                                      email: this.state.email,
                                                                      avatar: this.state.avatar,
                                                                      salaKey: item.key,
                                                                      salaNome: item.nome
                                                                    })}
            />
          )}
        />
        
        <TouchableOpacity style={styles.floatButton}>
          <IconButton icon='message-plus' size={32} color='#fff' onPress={() => this.props.navigation.navigate('AddSala')} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default SalasPagina;
