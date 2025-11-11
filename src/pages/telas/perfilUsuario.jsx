import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getAuth, signOut, updateEmail, updateProfile } from 'firebase/auth';
import { db } from '../telas/firebaseConfig';
import { ref, onValue, set } from 'firebase/database';
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function PerfilUsuario({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [foto, setFoto] = useState(null);
  const [temperatura, setTemperatura] = useState('--');
  const [umidadeAr, setUmidadeAr] = useState('--');
  const [umidadeSolo, setUmidadeSolo] = useState('--');
  const [chuva, setChuva] = useState('--');
  const [luz, setLuz] = useState('--');
  const [editando, setEditando] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      setNome(user.displayName || 'Usuário sem nome');
      setEmail(user.email || '');
      setFoto(user.photoURL || null);
    }

    // 🔥 Primeiro, busca o UID do sensor associado ao usuário
    const deviceUIDRef = ref(db, `usuarios/${user.uid}/config/deviceUID`);
    onValue(deviceUIDRef, (snapshot) => {
      if (snapshot.exists()) {
        const deviceUID = snapshot.val();

        // Agora lê os dados do sensor correto
        const sensoresRef = ref(db, `usuarios/${deviceUID}`);
        onValue(sensoresRef, (snap) => {
          const data = snap.val();
          if (data) {
            setTemperatura(data.temperatura ?? '--');
            setUmidadeAr(data.umidadeAr ?? '--');
            setUmidadeSolo(data.umidadeSolo ?? '--');
            setChuva(data.chuva ?? '--');
            setLuz(data.luz ?? '--');

            // ⚠️ Alerta apenas se o solo estiver SECO (1)
            if (data.umidadeSolo === 1) {
              Alert.alert(
                '🌵 Solo seco!',
                'A umidade do solo está baixa. É hora de regar sua planta 💧🌿',
                [{ text: 'OK', style: 'default' }]
              );
            }
          }
        });
      } else {
        console.log('⚠️ Nenhum sensor configurado para este usuário.');
      }
    });
  }, []);

  // === Escolher foto da galeria ===
  async function escolherFoto() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  }

  // === Salvar alterações ===
  async function salvarAlteracoes() {
    try {
      let fotoUrl = foto;
      const storage = getStorage();

      // Se escolheu nova foto local
      if (foto && foto.startsWith('file://')) {
        const response = await fetch(foto);
        const blob = await response.blob();
        const storageRef = sRef(storage, `usuarios/${user.uid}/perfil.jpg`);
        await uploadBytes(storageRef, blob);
        fotoUrl = await getDownloadURL(storageRef);
      }

      // Atualiza perfil no Firebase Auth
      await updateProfile(user, { displayName: nome, photoURL: fotoUrl });

      // Atualiza email (requer login recente)
      if (email && email !== user.email) {
        await updateEmail(user, email);
      }

      // Salva no Realtime Database
      await set(ref(db, `usuarios/${user.uid}/info`), {
        nome,
        email,
        foto: fotoUrl,
      });

      Alert.alert('✅ Sucesso', 'Perfil atualizado com sucesso!');
      setEditando(false);
    } catch (error) {
      console.log('Erro ao atualizar perfil:', error);
      Alert.alert('Erro', error.message || 'Não foi possível salvar as alterações.');
    }
  }

  // === Logout ===
  function sair() {
    signOut(auth)
      .then(() => {
        navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
      })
      .catch((error) => {
        Alert.alert('Erro ao sair', error.message);
      });
  }

  // 🧠 Interpretação correta dos sensores:
  const textoSolo = umidadeSolo === 1 ? 'Seco' : 'Úmido';
  const textoChuva = chuva == 1 ? ' Sem chuva' : ' Chovendo';
  const textoLuz = luz === 1 ? 'Claro' : 'Escuro';

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={escolherFoto}>
          <Image
            source={foto ? { uri: foto } : require('../../../imagens/pngwing.com.png')}
            style={styles.imagem}
          />
        </TouchableOpacity>

        {editando ? (
          <>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Nome"
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity style={styles.button} onPress={salvarAlteracoes}>
              <Text style={styles.textButton}>Salvar Alterações</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.titulo}>{nome}</Text>
            <Text style={styles.subtitulo}>{email}</Text>

            <View style={styles.card}>
              <Text style={styles.sensor}>🌡️ Temperatura: {temperatura} °C</Text>
              <Text style={styles.sensor}>💧 Umidade do Ar: {umidadeAr} %</Text>
              <Text style={styles.sensor}>🌱 Solo: {textoSolo}</Text>
              <Text style={styles.sensor}>☀️ Luminosidade: {textoLuz}</Text>
              <Text style={styles.sensor}>🌧️ Chuva: {textoChuva}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => setEditando(true)}>
              <Text style={styles.textButton}>Editar Perfil</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity style={styles.buttonSair} onPress={sair}>
          <Text style={styles.textButton}>Sair</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  container: { alignItems: 'center', width: '90%' },
  imagem: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: 'green',
  },
  titulo: { color: '#fff', fontSize: 26, fontWeight: 'bold' },
  subtitulo: { color: 'green', fontSize: 16, marginBottom: 20 },
  input: {
    width: '100%',
    backgroundColor: '#1c1c1c',
    color: '#fff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  card: {
    backgroundColor: '#1c1c1c',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    marginVertical: 15,
  },
  sensor: { color: 'white', fontSize: 18, marginBottom: 8 },
  button: {
    backgroundColor: 'green',
    width: '80%',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonSair: {
    backgroundColor: '#02640a85',
    width: '80%',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  textButton: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
