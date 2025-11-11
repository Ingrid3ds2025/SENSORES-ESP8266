import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { db } from './firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

export default function RelatorioGeral() {
  const [deviceUID, setDeviceUID] = useState(null);
  const [dados, setDados] = useState({
    temperatura: '--',
    umidadeAr: '--',
    umidadeSolo: '--',
    chuva: '--',
    luz: '--',
    historico: [],
  });

  const [telaAtual, setTelaAtual] = useState(0);

  // 🔁 Alterna telas automaticamente
  useEffect(() => {
    const intervalo = setInterval(() => {
      setTelaAtual((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(intervalo);
  }, []);

  // 🔥 Firebase listener
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return alert('Você precisa estar logado.');

    const deviceRef = ref(db, `usuarios/${user.uid}/config/deviceUID`);
    onValue(deviceRef, (snap) => {
      if (snap.exists()) {
        const id = snap.val();
        setDeviceUID(id);
        const sensorRef = ref(db, `usuarios/${id}`);
        onValue(sensorRef, (sensorSnap) => {
          const data = sensorSnap.val();
          if (data) {
            const novaLeitura = {
              temperatura: parseFloat(data.temperatura ?? 0),
              umidadeAr: parseFloat(data.umidadeAr ?? 0),
              umidadeSolo: parseFloat(data.umidadeSolo ?? 0),
              chuva: parseInt(data.chuva ?? 0),
              luz: parseInt(data.luz ?? 0),
              timestamp: new Date().toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              }),
            };

            setDados((prev) => ({
              ...data,
              historico: [...prev.historico.slice(-9), novaLeitura],
            }));
          }
        });
      } else {
        alert('Nenhum sensor vinculado.');
      }
    });
  }, []);

  // ========= CONFIGURAÇÃO DOS GRÁFICOS =========
  const chartConfig = [
    {
      titulo: '🌡️ Temperatura e 💧 Umidade do Ar',
      datasets: [
        {
          label: 'Temperatura (°C)',
          data: dados.historico.map((d) => d.temperatura),
          borderColor: 'rgba(255,99,132,1)',
          backgroundColor: 'rgba(255,99,132,0.25)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
        },
        {
          label: 'Umidade do Ar (%)',
          data: dados.historico.map((d) => d.umidadeAr),
          borderColor: 'rgba(54,162,235,1)',
          backgroundColor: 'rgba(54,162,235,0.25)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
        },
      ],
    },
    {
      titulo: '🌱 Solo e ☔ Chuva',
      datasets: [
        {
          label: 'Solo (1 = seco)',
          data: dados.historico.map((d) => d.umidadeSolo),
          borderColor: 'rgba(0,255,128,1)',
          backgroundColor: 'rgba(0,255,128,0.25)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Chuva (1 = sim)',
          data: dados.historico.map((d) => d.chuva),
          borderColor: 'rgba(0,200,255,1)',
          backgroundColor: 'rgba(0,200,255,0.25)',
          fill: true,
          tension: 0.4,
        },
      ],
    },
    {
      titulo: '☀️ Luminosidade',
      datasets: [
        {
          label: 'Luz (1 = claro)',
          data: dados.historico.map((d) => d.luz),
          borderColor: 'rgba(255,255,100,1)',
          backgroundColor: 'rgba(255,255,100,0.25)',
          fill: true,
          tension: 0.4,
        },
      ],
    },
  ];

  const chartData = {
    labels: dados.historico.map((d) => d.timestamp),
    datasets: chartConfig[telaAtual].datasets,
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#fff',
          font: { size: 14, family: 'Arial' },
        },
      },
      title: {
        display: true,
        text: chartConfig[telaAtual].titulo,
        color: '#00ff9d',
        font: { size: 18, family: 'Arial', weight: 'bold' },
      },
    },
    scales: {
      x: {
        ticks: { color: '#aaa' },
        grid: { color: '#222' },
      },
      y: {
        ticks: { color: '#aaa' },
        grid: { color: '#222' },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuad',
    },
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Relatório Geral </Text>

        {deviceUID ? (
          <>
            <Text style={styles.subtitulo}>
              Sensor vinculado: <Text style={styles.valor}>{deviceUID}</Text>
            </Text>

            <View style={styles.card}>
              <Text style={styles.dado}>🌡️ {dados.temperatura} °C</Text>
              <Text style={styles.dado}>💧 {dados.umidadeAr} %</Text>
              <Text style={styles.dado}>🌱 Solo: {dados.umidadeSolo == 1 ? 'Seco' : 'Úmido'}</Text>
              <Text style={styles.dado}>☔ {dados.chuva == 1 ? 'Com chuva' : 'Sem chuva'}</Text>
              <Text style={styles.dado}>☀️ {dados.luz == 1 ? 'Claro' : 'Escuro'}</Text>
            </View>

            {dados.historico.length >= 2 ? (
              <View style={styles.grafico}>
                <Line data={chartData} options={chartOptions} />
              </View>
            ) : (
              <Text style={styles.aviso}>Aguardando dados do sensor...</Text>
            )}

            <View style={styles.indicador}>
              {['🌡️', '🌱', '☀️'].map((icone, i) => (
                <Text
                  key={i}
                  style={{
                    opacity: telaAtual === i ? 1 : 0.3,
                    marginHorizontal: 8,
                    fontSize: 28,
                  }}>
                  {icone}
                </Text>
              ))}
            </View>
          </>
        ) : (
          <Text style={styles.aviso}>⚠️ Nenhum sensor vinculado.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#000',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 50,
  },
  container: {
    color: '#fff',
    width: '90%',
    textAlign: 'center',
    paddingTop: 40,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00ff9d',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitulo: {
    color: 'green',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
  },
  dado: { color: '#fff', fontSize: 18, marginBottom: 10 },
  valor: { color: '#00ff9d', fontWeight: 'bold' },
  grafico: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 20,
    height: 400,
    width: '100%',
    marginBottom: 25,
  },
  aviso: { color: '#aaa', marginTop: 20, textAlign: 'center' },
  indicador: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
});
