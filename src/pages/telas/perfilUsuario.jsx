import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';

class PerfilUsuario extends Component {
  state = {
    nome: '',
    email: '',
  };

  componentDidMount() {
    const user = getAuth().currentUser;

    if (user) {
      this.setState({
        nome: user.displayName || 'Usuário sem nome',
        email: user.email,
      });
    }
  }

  logout = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn' }], 
        });
      })
      .catch((error) => {
        Alert.alert('Erro ao sair', error.message);
      });
  };

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

        <TouchableOpacity style={styles.button} onPress={this.logout}>
          <Text style={styles.textButton}>Sair</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PerfilUsuario;
