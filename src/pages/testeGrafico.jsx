// TesteGrafico.js
import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const TesteGrafico = () => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', padding: 20 }}>
      <Text style={{ color: 'white', textAlign: 'center', marginBottom: 20 }}>
        Teste de Gráfico
      </Text>
      
      <LineChart
        data={{
          labels: ["10:00", "10:05", "10:10", "10:15"],
          datasets: [
            {
              data: [20, 22, 25, 24],
              color: () => 'tomato',
            },
            {
              data: [60, 65, 70, 68],
              color: () => 'skyblue',
            }
          ]
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#000',
          backgroundGradientFrom: '#000',
          backgroundGradientTo: '#000',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        bezier
      />
    </View>
  );
};

export default TesteGrafico;