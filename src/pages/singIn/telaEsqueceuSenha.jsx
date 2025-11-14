import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export default function TelaEsqueceuSenha({ navigation }) {
  const [email, setEmail] = useState('');

  async function enviarEmailRecuperacao() {
    if (!email) {
      Alert.alert('Atenção', 'Por favor, insira seu e-mail.');
      return;
    }

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        '📩 Email enviado!',
        'Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.'
      );
      navigation.navigate('SignIn');
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível enviar o email. Verifique o endereço digitado.');
    }
  }

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.tituloHeader}>Esqueceu a senha?</Text>
      </Animatable.View>

      <Animatable.View
        animation="fadeInUp"
        delay={500}
        style={styles.containerForm}
      >
        <Text style={styles.subtitulo}>
          Digite seu e-mail para receber um link de redefinição.
        </Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style={styles.botao} onPress={enviarEmailRecuperacao}>
          <Text style={styles.textoBotao}>Enviar link</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.voltar}>Voltar ao login</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8fbc8f',
  },
  containerHeader: {
    marginTop: '15%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  tituloHeader: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: '5%',
    paddingTop: 20,
    alignItems: 'center',
  },
  subtitulo: {
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
  },
  label: {
    width: '100%',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#f5f5f5',
    color: '#000',
    borderRadius: 8,
    width: '100%',
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  botao: {
    backgroundColor: '#8fbc8f',
    borderRadius: 8,
    width: '100%',
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  voltar: {
    color: '#4CAF50',
    marginTop: 20,
    fontSize: 16,
  },
});
