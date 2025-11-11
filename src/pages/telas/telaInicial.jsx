import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ActivityIndicator, Alert } from 'react-native';
import { db } from './firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

class TelaInicial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuAberto: false,
      temperatura: '--',
      umidadeAr: '--',
      umidadeSolo: '--',
      luz: '--',
      chuva: '--',
      carregando: true,
    };
  }

  componentDidMount() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        this.setState({ carregando: false });
        return;
      }

      const deviceUIDRef = ref(db, `usuarios/${user.uid}/config/deviceUID`);
      onValue(deviceUIDRef, (snapshot) => {
        if (snapshot.exists()) {
          const deviceUID = snapshot.val();
          const baseRef = ref(db, `usuarios/${deviceUID}`);
          onValue(baseRef, (snap) => {
            if (snap.exists()) {
              const data = snap.val();
              this.setState({
                temperatura: data.temperatura ?? '--',
                umidadeAr: data.umidadeAr ?? '--',
                umidadeSolo: data.umidadeSolo ?? '--',
                luz: data.luz ?? '--',
                chuva: data.chuva ?? '--',
                carregando: false,
              });

              // 🔔 Mostra alerta SOMENTE se o solo estiver SECO (1)
              if (data.umidadeSolo === 1) {
                Alert.alert("🌵 Solo seco detectado!", "Sua planta precisa de água 💧");
              }
            } else this.setState({ carregando: false });
          });
        } else this.setState({ carregando: false });
      });
    });
  }

  toggleMenu = () => this.setState({ menuAberto: !this.state.menuAberto });

  render() {
    const { width } = Dimensions.get('window');
    const { temperatura, umidadeAr, umidadeSolo, luz, chuva, menuAberto, carregando } = this.state;

    if (carregando) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Carregando dados...</Text>
        </View>
      );
    }

    // 🟢 Interpretação correta dos sensores
    const soloTexto = umidadeSolo == 1 ? '🌵 Seco' : '💧 Úmido';
    const luzTexto = luz == 1 ? '🌞 Claro' : '🌙 Escuro';
    const chuvaTexto = chuva == 1 ? '☀️ Sem chuva' : '';

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={this.toggleMenu}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Monitor de Plantas 🌿</Text>
        </View>

        {/* Cards */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}> Temperatura</Text>
            <Text style={styles.cardValue}>{temperatura}°C</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}> Umidade do Ar</Text>
            <Text style={styles.cardValue}>{umidadeAr}%</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}> Umidade do Solo</Text>
            <Text style={[styles.cardValue, { color: umidadeSolo == 1 ? '#FF7043' : '#4CAF50' }]}>
              {soloTexto}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}> Luminosidade</Text>
            <Text style={[styles.cardValue, { color: luz == 1 ? '#9FA8DA' : '#FFEB3B' }]}>
              {luzTexto}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}> Chuva</Text>
            <Text style={[styles.cardValue, { color: chuva == 1 ? '#4FC3F7' : '#FDD835' }]}>
              {chuvaTexto}
            </Text>
          </View>
        </View>

        {/* Plant Image */}
        <Image source={require('../../../imagens/planta.png')} style={styles.image} />

        {/* Menu lateral */}
        {menuAberto && (
          <View style={[styles.menuOverlay, { width }]}>
            <TouchableOpacity onPress={this.toggleMenu} style={styles.closeButton}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>

            <View style={styles.menuItems}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('PerfilUsuario')}>
                <Text style={styles.menuItem}> Perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('RelatorioGeral')}>
                <Text style={styles.menuItem}> Relatório Geral</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ConfigSensor')}>
                <Text style={styles.menuItem}> Configurar Sensor</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    );
  }
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0d0d', paddingTop: 40 },
  contentContainer: { alignItems: 'center' },
  header: {
    width: '100%', flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 10,
  },
  menuIcon: { fontSize: 38, color: '#4CAF50' },
  headerTitle: { color: '#E8F5E9', fontSize: 20, fontWeight: '700' },
  cardContainer: {
    width: '90%', marginTop: 20, flexWrap: 'wrap',
    flexDirection: 'row', justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#1B1B1B', borderRadius: 15, width: '48%',
    paddingVertical: 18, paddingHorizontal: 10, marginVertical: 8,
    alignItems: 'center', borderWidth: 1, borderColor: '#2E7D32',
  },
  cardTitle: { color: '#A5D6A7', fontSize: 15, fontWeight: '600' },
  cardValue: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', marginTop: 5 },
  image: { width: 220, height: 220, marginTop: 20, opacity: 0.9 },
  menuOverlay: {
    position: 'absolute', top: 0, bottom: 0, left: 0,
    backgroundColor: 'rgba(0,0,0,0.96)', zIndex: 100,
    alignItems: 'center', justifyContent: 'center',
  },
  closeButton: { position: 'absolute', top: 50, right: 30 },
  closeIcon: { fontSize: 36, color: '#81C784' },
  menuItems: { alignItems: 'center', gap: 30 },
  menuItem: { color: '#FFFFFF', fontSize: 22, fontWeight: '600' },
  loadingContainer: {
    flex: 1, backgroundColor: '#0d0d0d',
    justifyContent: 'center', alignItems: 'center',
  },
  loadingText: { color: '#E8F5E9', marginTop: 10, fontSize: 16 },
});

export default TelaInicial;
