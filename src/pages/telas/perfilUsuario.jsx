import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { db } from '../telas/firebaseConfig';
import { ref, onValue } from 'firebase/database';

class PerfilUsuario extends Component {
  state = {
    nome: '',
    email: '',
    temperatura: '--',
    umidade: '--',
    solo: '--',
    chuva: '--',
  };

  componentDidMount() {
    const user = getAuth().currentUser;
    if (user) {
      this.setState({
        nome: user.displayName || 'Usuário sem nome',
        email: user.email,
      });
    }

    // 🔥 Lendo os dados do Firebase em tempo real
    const sensoresRef = ref(db, '/usuarios/sensor_teste/');
    onValue(sensoresRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.setState({
          temperatura: data.temperatura ?? '--',
          umidade: data.umidade ?? '--',
          solo: data.solo ?? '--',
          chuva: data.chuva ?? '--',
        });
      }
    });
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
    const { nome, email, temperatura, umidade, solo, chuva } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.conteudo}>
            <Image
              source={require('../../../imagens/pngwing.com.png')}
              style={styles.imagem}
            />
            <Text style={styles.titulo}>{nome}</Text>
            <Text style={styles.subtitulo}>{email}</Text>

            <View style={styles.card}>
              <Text style={styles.sensor}>🌡️ Temperatura: {temperatura} °C</Text>
              <Text style={styles.sensor}>💧 Umidade: {umidade} %</Text>
              <Text style={styles.sensor}>🌱 Solo: {solo}</Text>
              <Text style={styles.sensor}>🌧️ Chuva: {chuva === 1 ? 'Com chuva' : 'Sem chuva'}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={this.logout}>
            <Text style={styles.textButton}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 40,
  },
  container: {
    alignItems: 'center',
    width: '90%',
  },
  conteudo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagem: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  titulo: {
    color: 'white',
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 5,
  },
  subtitulo: {
    color: 'green',
    fontSize: 18,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1c1c1c',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    marginTop: 10,
  },
  sensor: {
    color: 'white',
    fontSize: 18,
    marginBottom: 8,
  },
  button: {
    backgroundColor: 'green',
    height: 45,
    width: '80%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PerfilUsuario;
