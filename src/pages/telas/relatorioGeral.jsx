import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { db } from './firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

class RelatorioGeral extends Component {
  state = {
    temperatura: '--',
    umidade: '--',
    solo: '--',
    chuva: false,
    deviceUID: null,
    historico: [],
  };

  componentDidMount() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Erro', 'Você precisa estar logado.');
      return;
    }

    // 🔹 Busca o deviceUID configurado
    const deviceUIDRef = ref(db, `usuarios/${user.uid}/config/deviceUID`);
    onValue(deviceUIDRef, (snapshot) => {
      if (snapshot.exists()) {
        const deviceUID = snapshot.val();
        this.setState({ deviceUID });

        // 🔹 Escuta os dados atuais
        const sensorRef = ref(db, `usuarios/${deviceUID}`);
        onValue(sensorRef, (sensorSnap) => {
          const data = sensorSnap.val();
          if (data) {
            const novaLeitura = {
              temperatura: data.temperatura ?? 0,
              umidade: data.umidade ?? 0,
              timestamp: new Date().toLocaleTimeString().slice(0, 5),
            };

            this.setState((prev) => ({
              temperatura: data.temperatura ?? '--',
              umidade: data.umidade ?? '--',
              solo: data.solo ?? '--',
              chuva: data.chuva === 1,
              historico: [...prev.historico.slice(-9), novaLeitura], // guarda as últimas 10 leituras
            }));
          }
        });
      } else {
        Alert.alert('Aviso', 'Nenhum sensor configurado. Vá em "Configurar Sensor" para vincular um.');
      }
    });
  }

  render() {
    const { temperatura, umidade, solo, chuva, deviceUID, historico } = this.state;

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.titulo}>Relatório Geral</Text>

        {deviceUID ? (
          <>
            <Text style={styles.subtitulo}>📡 Sensor vinculado: <Text style={styles.valor}>{deviceUID}</Text></Text>

            <View style={styles.card}>
              <Text style={styles.dado}>🌡️ Temperatura: <Text style={styles.valor}>{temperatura} °C</Text></Text>
              <Text style={styles.dado}>💧 Umidade: <Text style={styles.valor}>{umidade} %</Text></Text>
              <Text style={styles.dado}>🌱 Solo: <Text style={styles.valor}>{solo}</Text></Text>
              <Text style={styles.dado}>☔ Chuva: <Text style={styles.valor}>{chuva ? 'Chovendo' : 'Sem chuva'}</Text></Text>
            </View>

            {historico.length > 1 && (
              <View style={styles.graficoContainer}>
                <Text style={styles.graficoTitulo}>📈 Histórico de Temperatura</Text>
                <LineChart
                  data={{
                    labels: historico.map(item => item.timestamp),
                    datasets: [
                      {
                        data: historico.map(item => item.temperatura),
                        color: () => '#00ff9d',
                        strokeWidth: 2,
                      },
                      {
                        data: historico.map(item => item.umidade),
                        color: () => '#0088ff',
                        strokeWidth: 2,
                      },
                    ],
                    legend: ['Temperatura', 'Umidade'],
                  }}
                  width={Dimensions.get('window').width - 30}
                  height={250}
                  yAxisSuffix="°C"
                  chartConfig={{
                    backgroundColor: '#000',
                    backgroundGradientFrom: '#111',
                    backgroundGradientTo: '#000',
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(0, 255, 157, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: { borderRadius: 16 },
                    propsForDots: {
                      r: '4',
                      strokeWidth: '2',
                      stroke: '#00ff9d',
                    },
                  }}
                  bezier
                  style={{ marginVertical: 8, borderRadius: 16 }}
                />
              </View>
            )}
          </>
        ) : (
          <Text style={styles.aviso}>⚠️ Nenhum sensor vinculado ainda.</Text>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  titulo: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitulo: {
    color: 'green',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    elevation: 5,
  },
  dado: {
    color: 'white',
    fontSize: 18,
    marginBottom: 8,
  },
  valor: {
    color: '#00ff9d',
    fontWeight: 'bold',
  },
  graficoContainer: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 10,
  },
  graficoTitulo: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
  },
  aviso: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 60,
    fontSize: 18,
  },
});

export default RelatorioGeral;
