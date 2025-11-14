import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { getAuth } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { db } from './firebaseConfig';

export default function ConfigSensor() {
  const [deviceUID, setDeviceUID] = useState('');

  const handleVincular = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        Alert.alert('Erro', 'Usuário não está logado.');
        return;
      }

      if (!deviceUID.trim()) {
        Alert.alert('Aviso', 'Digite o nome do sensor antes de salvar.');
        return;
      }

      await set(ref(db, `usuarios/${user.uid}/config/deviceUID`), deviceUID.trim());

      Alert.alert('Sucesso', `Sensor "${deviceUID}" vinculado com sucesso!`);
      setDeviceUID('');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.header}>
        <Text style={styles.titleHeader}>Vincular Sensor</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={500} style={styles.formContainer}>
        <Text style={styles.label}>Nome do Sensor</Text>

        <TextInput
          placeholder="ex: planta01"
          placeholderTextColor="#777"
          style={styles.input}
          value={deviceUID}
          onChangeText={setDeviceUID}
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleVincular}>
          <Text style={styles.textButton}>Salvar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#8fbc8f' 
  },

  header: { 
    marginTop: '15%',
    marginBottom: '8%', 
    paddingStart: '5%' 
  },

  titleHeader: { 
    color: '#fff',
    fontSize: 28, 
    fontWeight: 'bold' 
  },

  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: '5%',
    paddingTop: 30,
  },

  label: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },

  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#8fbc8f',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  textButton: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
});
