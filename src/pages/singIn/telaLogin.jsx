import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../pages/telas/firebaseConfig'; // ajuste o caminho conforme seu projeto

export default function SignIn() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function Acessar() {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha email e senha');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Sucesso', 'Login realizado!');
      navigation.navigate('TelaInicial');
    } catch (error) {
      console.log('Erro ao logar:', error);
      Alert.alert('Erro', error.message || 'Erro desconhecido ao fazer login');
    }
  }

  function Cadastrar() {
    navigation.navigate('CadastroUsuario');
  }

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Bem-vindo (a)!</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={500} style={styles.containerForm}>
        <Text style={styles.titulo}>Email</Text>
        <TextInput
          placeholder="Digite um e-mail"
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <Text style={styles.titulo}>Senha</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Digite uma senha"
            style={styles.input}
            secureTextEntry={!showPassword}
            onChangeText={setPassword}
            value={password}
            autoCapitalize="none"
            autoComplete="password"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="gray" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={Acessar}>
          <Text style={styles.textButton}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegistrar} onPress={Cadastrar}>
          <Text style={styles.textRegistrar}>Não possui uma conta?</Text>
          <Text style={styles.textRegistrarCadastrar}> Cadastre-se</Text>
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
  message: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  containerForm: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  titulo: {
    fontSize: 20,
    marginTop: 28,
    fontWeight: 'bold',
  },
  inputContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
    marginTop: 5,
    paddingRight: 40, 
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  button: {
    backgroundColor: '#8fbc8f',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonRegistrar: {
    marginTop: 14,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  textRegistrar: {
    color: '#a1a1A1',
  },
  textRegistrarCadastrar: {
    color: 'green',
    marginLeft: 5,
  },
});
