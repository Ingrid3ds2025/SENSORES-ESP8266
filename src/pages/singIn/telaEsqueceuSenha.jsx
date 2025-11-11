import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
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
      navigation.navigate('SignIn'); // volta pra tela de login
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível enviar o email. Verifique o endereço digitado.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}> Esqueceu sua senha?</Text>
      <Text style={styles.subtitulo}>
        Digite seu e-mail para receber um link de redefinição.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.botao} onPress={enviarEmailRecuperacao}>
        <Text style={styles.textoBotao}>Enviar link</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.voltar}>Voltar ao login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitulo: {
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#1c1c1c',
    color: 'white',
    borderRadius: 8,
    width: '100%',
    padding: 12,
    marginBottom: 15,
  },
  botao: {
    backgroundColor: 'green',
    borderRadius: 8,
    width: '100%',
    padding: 12,
    alignItems: 'center',
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
