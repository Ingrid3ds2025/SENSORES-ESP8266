import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { db } from './firebaseConfig'; // 🔥 Certifique-se de que o caminho está correto

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

      console.log('UID do usuário:', user.uid);
      console.log('Salvando deviceUID:', deviceUID);

      // Salva o nome do sensor vinculado ao usuário
      await set(ref(db, `usuarios/${user.uid}/config/deviceUID`), deviceUID.trim());

      Alert.alert('✅ Sucesso', `Sensor "${deviceUID}" vinculado com sucesso!`);
      setDeviceUID(''); // limpa o campo
    } catch (error) {
      console.error('Erro ao salvar deviceUID:', error);
      Alert.alert('❌ Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔧 Vincular Sensor</Text>

      <TextInput
        placeholder="Digite o nome do sensor (ex: usuario01)"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={deviceUID}
        onChangeText={setDeviceUID}
      />

      <TouchableOpacity style={styles.button} onPress={handleVincular}>
        <Text style={styles.textButton}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: 'green',
    color: 'white',
    width: '80%',
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
