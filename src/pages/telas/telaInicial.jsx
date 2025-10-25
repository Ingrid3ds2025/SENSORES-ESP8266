import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ActivityIndicator } from 'react-native';
import { db } from './firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

class TelaInicial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuAberto: false,
      temperatura: '--',
      umidade: '--',
      chuva: false,
      carregando: true,
    };
  }

  componentDidMount() {
    const auth = getAuth();

    // Espera o login do usuário antes de ler o banco
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log('Usuário não autenticado ainda');
        this.setState({ carregando: false });
        return;
      }

      console.log('Usuário logado:', user.uid);

      // Busca o deviceUID salvo na configuração do usuário
      const deviceUIDRef = ref(db, `usuarios/${user.uid}/config/deviceUID`);
      onValue(deviceUIDRef, (snapshot) => {
        if (snapshot.exists()) {
          const deviceUID = snapshot.val();
          console.log('DeviceUID encontrado:', deviceUID);

          // Agora escuta os sensores do NodeMCU
          const baseRef = ref(db, `usuarios/${deviceUID}`);
          onValue(baseRef, (snap) => {
            if (snap.exists()) {
              const data = snap.val();
              console.log('Dados recebidos:', data);
              this.setState({
                temperatura: data.temperatura ?? '--',
                umidade: data.umidade ?? '--',
                chuva: data.chuva ?? false,
                carregando: false,
              });
            } else {
              console.log('Nenhum dado encontrado para este sensor.');
              this.setState({ carregando: false });
            }
          });
        } else {
          console.log('⚠️ Nenhum sensor configurado ainda.');
          this.setState({ carregando: false });
        }
      });
    });
  }

  toggleMenu = () => {
    this.setState({ menuAberto: !this.state.menuAberto });
  };

  handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    this.props.navigation.replace('Login');
  };

  render() {
    const { width } = Dimensions.get('window');
    const { temperatura, umidade, chuva, menuAberto, carregando } = this.state;

    if (carregando) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="green" />
          <Text style={{ color: 'white', marginTop: 20 }}>Carregando dados...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.conteudo1}>
          <TouchableOpacity onPress={this.toggleMenu} style={styles.botaoMenu}>
            <Text style={styles.iconeMenu}>☰</Text>
          </TouchableOpacity>

          <View style={styles.containerTemperatura}>
            <Text style={styles.textoTempo}>Temperatura:{temperatura}°C</Text>
            <Text style={styles.textoTempo}>{chuva ? '🌧️ Chovendo' : '☀️ Sem chuva'}</Text>
          </View>
        </View>

        <View style={styles.conteudo2}>
          <Text style={styles.textoUmidade}>Umidade do solo</Text>
          <Text style={styles.porcentagemUmidade}>{umidade}%</Text>
          <Text style={styles.textoIrrigacao}>Irrigação realizada 0 vezes em 2 dias.</Text>
        </View>

        <View style={styles.conteudo3}>
          <Image source={require('../../../imagens/planta.png')} style={{ width: 300, height: 300 }} />
        </View>

        {menuAberto && (
          <View style={[styles.menuFullscreen, { width }]}>
            <TouchableOpacity onPress={this.toggleMenu} style={styles.botaoFecharMenu}>
              <Text style={styles.iconeMenu}>✕</Text>
            </TouchableOpacity>

            <View style={styles.menuContent}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('PerfilUsuario')}>
                <Text style={styles.menuItem}>Perfil</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.navigate('RelatorioGeral')}>
                <Text style={styles.menuItem}>Relatório Geral</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.navigate('ConfigSensor')}>
                <Text style={styles.menuItem}>Configurar Sensor</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: 
    { flex: 1,
      backgroundColor: 'black', 
      padding: 10, 
      justifyContent: 'center', 
      alignItems: 'center' 
    },

  conteudo1: { 
    flex: 1, 
    width: '100%', 
    alignItems: 'flex-end' 
  },

  iconeMenu: { 
    fontSize: 50, 
    color: 'green', 
    marginRight: 20, 
    marginTop: 10 
  },

  containerTemperatura: { 
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 20
  },
 
  textoTempo: { 
    fontSize: 20, 
    color: 'white' 
  },

  conteudo2: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },

  textoUmidade: { 
    fontSize: 25, 
    color: 'white', 
    fontWeight: '900' 
  },

  porcentagemUmidade: { 
    fontSize: 100, 
    color: 'white', 
    fontWeight: '900' 
  },

  textoIrrigacao:  { 
    fontSize: 15, 
    color: 'white' 
  },
  
  conteudo3: {
     flex: 1, 
     justifyContent: 'center', 
     alignItems: 'center', 
     marginTop: 40 
    },
      
  menuFullscreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  botaoFecharMenu: {
    position: 'absolute',
    top: 50,
    right: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    padding: 10,
  },

  menuContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20, // (ou use marginVertical em cada item)
  },

  menuItemButton: {
    backgroundColor: 'rgba(0, 128, 0, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
    marginVertical: 8,
  },

  menuItem: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});

export default TelaInicial;
