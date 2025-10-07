import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

class RelatorioGeral extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.informacoes}>
            <View style={styles.campo}>
                <Text style={styles.subtitulo}>Umidade do solo:</Text>
                <Text style={styles.dado}>Dado</Text>
            </View>

            <View style={styles.campo}>
                <Text style={styles.subtitulo}>Temperatura:</Text>
                <Text style={styles.dado}>Dado</Text>
            </View>

            <View style={styles.campo}>
                <Text style={styles.subtitulo}>Chuva:</Text>
                <Text style={styles.dado}>Dado</Text>
            </View>

            <View style={styles.campo}>
                <Text style={styles.subtitulo}>Luz solar:</Text>
                <Text style={styles.dado}>Dado</Text>
            </View>
        </View>

        {/*GRÁFICO */}

        <View style={styles.grafico}>
            <Text style={styles.textIrrigacao}>Irrigação Realizada em 3 meses </Text>

            {/*GRAFICO AQUI */}
            <Image 
              source={require('../imagens/graficoIlustrativo.png')}
              style={{ width: 300, height: 300}}
            />
        
            <Text style={styles.textRepresentacao}>Representação Gráfica</Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center', // <-- importante para deixar os filhos no início horizontalmente
    padding: 20
  },

  informacoes:{
    flexDirection: 'column',
    alignSelf: 'flex-start', // <-- este é o mais importante
    marginTop: 20,
  },

  campo: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10
   
  },

  subtitulo:{
    color: 'green',
    fontSize: 20,
    fontWeight: '700',
    marginRight: 10
  },

  dado:{
    color: 'white',
    fontSize: 20,
  },

  grafico:{
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 30
  },

  textIrrigacao:{
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 20
  },

  textRepresentacao:{
    color: 'white',
    marginTop: 20,
    marginBottom: 40
  }
});

export default RelatorioGeral;