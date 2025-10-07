import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert,} from 'react-native';
import { getAuth, updatePassword } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
 

class PerfilUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      email: '',
    };
  }

  componentDidMount() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      this.setState({
        nome: user.displayName || 'Usuário sem nome',
        email: user.email,
      });
    }
  }

  render() {
    const { nome, email } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.conteudo}>
          <Image
            source={require('../../../imagens/pngwing.com.png')}
            style={{ width: 200, height: 200 }}
          />

          <Text style={styles.titulo}>{nome}</Text>
          <Text style={styles.subtitulo}>{email}</Text>
        </View>

        <View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
  },
  conteudo: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    marginTop: 70,
  },
  titulo: {
    color: 'white',
    fontSize: 30,
    fontWeight: '600',
    marginTop: 20,
  },
  subtitulo: {
    color: 'green',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'green',
    height: 40,
    width: 200,
    borderRadius: 10,
  }

});

export default PerfilUsuario;
