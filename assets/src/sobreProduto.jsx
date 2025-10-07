import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class SobreProduto extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.conteudo}>
            <Text style={styles.subtitulo}>Nome do Produto</Text>
            <Text style={styles.conteudo2}>Nome do Produto</Text>

            <Text style={styles.subtitulo}>Data de Fabricação</Text>
            <Text style={styles.conteudo2}>__/__/____</Text>

            <Text style={styles.subtitulo}>ID do Produto</Text>
            <Text style={styles.conteudo2}>n° 01</Text>

            <Text style={styles.subtitulo}>Características</Text>
            <Text style={styles.descricao}>Lorem ipsum dolor, sit amet  doloremccusamus cumulpa expedita amet cum deleniti?</Text>
            
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10
  },

  conteudo:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    marginTop: 70,
    marginBottom: 0
  },

  titulo: {
    color: 'white',
    fontSize: 40,
    fontWeight: '600',
    marginTop: 20,
   
  },

  subtitulo:{
    color: 'green',
    fontSize: 25,
    fontWeight: '700'
  },

  conteudo2:{
    color: 'white',
    marginTop: 5,
    fontSize: 15,
    marginBottom: 30
  },

  descricao:{
    color: 'white',
    marginTop: 5,
    fontSize: 15,
    marginLeft: 20
  }
});

export default SobreProduto;