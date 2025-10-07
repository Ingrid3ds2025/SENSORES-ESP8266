import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../telas/firebaseConfig';
import { updateProfile } from 'firebase/auth';


export default function SignIn() {
  const navigation = useNavigation();

  // Estados
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validação e cadastro
  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword || !username) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Atualiza o nome do usuário no perfil
      await updateProfile(user, {
        displayName: username,
      });

      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      navigation.navigate('TelaInicial');
    } catch (error) {
      Alert.alert('Erro ao cadastrar', error.message);
    }
  };


  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Cadastre-se!</Text>
      </Animatable.View>

      {/* Formulário */}
      <Animatable.View animation="fadeInUp" delay={500} style={styles.containerForm}>

        <Text style={styles.titulo}>Nome de Usuário</Text>
        <TextInput
          placeholder="Digite seu nome"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.titulo}>Email</Text>
        <TextInput
          placeholder="Digite um e-mail"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
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
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="gray" />
          </TouchableOpacity>
        </View>

        <Text style={styles.titulo}>Confirme sua senha</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Confirme sua senha"
            style={styles.input}
            secureTextEntry={!showConfirmPassword}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.iconContainer}
          >
            <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={22} color="gray" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.textButton}>Cadastrar</Text>
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
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: '5%',
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
    paddingRight: 40, // Espaço para o ícone
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 8,
  },
  button: {
    backgroundColor: '#8fbc8f',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
