import React from "react";
import {
	Text,
	TextInput,
	ScrollView,
	TouchableOpacity,
	View,
	Button,
	ImageEditor,
	KeyboardAvoidingView,
	ActivityIndicator,
	Image,
  Alert,
  FlatList,
} from "react-native";
import { List, Divider } from 'react-native-paper';

import styles from "../styles/SalasPaginaStyle";
import NavigationBar from "react-native-navbar";
import { IconButton } from "react-native-paper";
import firebaseRD from "../../FirebaseRD";
import time from "../../Timer";

// type props = {
// 	name?: string,
// 	email?: string,
// 	avatar?: string,
// };

class SalasPagina extends React.Component {
	constructor(props) {
    super(props);
    // this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      	name: this.props.navigation.state.params.name,
			email: this.props.navigation.state.params.email,
			avatar: this.props.navigation.state.params.avatar,
			image: this.props.navigation.state.params.email,
			// salaKey: this.props.navigation.state.params.salaKey,
      //       salaNome: this.props.navigation.state.params.salaNome,
      salas: [],
    };
  }

  
  componentDidMount() {
    // start listening for firebase updates
    this.listenSalas(firebaseRD.refSalas);
  }

  listenSalas(tasksRef) {
    tasksRef.on("value", dataSnapshot => {
      var salas = [];
      dataSnapshot.forEach(child => {
        salas.push({
          nome: child.val().nome,
          key: child.key
        });
      });

      
      this.setState({
        salas: salas
      });
    });
  }

  
  
  
  // componentWillUnmount() {
  //   firebaseRD.getSalas().off("value", this.onDataChange);
  // }

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
              description="Item description"
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
      </View>
     
    //  <View style={styles.container}>
	  //     <ScrollView style={styles.container}>
		// 				<View style={styles.logoView}></View>
            
    //         {this.state.salas &&
    //           this.state.salas.map((sala, index) => (
                
    //             <Text
    //               key={index} onPress={() => this.props.navigation.navigate("Chat", {
    //                                                                                     name: this.state.name,
    //                                                                                     email: this.state.email,
    //                                                                                     avatar: this.state.avatar,
    //                                                                                     salaKey: sala.key,
    //                                                                                     salaNome: sala.nome
    //                                                                                   })}
    //             >
    //               {sala.nome}
    //             </Text>
    //           ))}
            

          
    //     </ScrollView>
    //     </View>
    );
  }

}

export default SalasPagina;
