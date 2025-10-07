import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';

class TelaInicial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuAberto: false
    };
  }

  toggleMenu = () => {
    this.setState({ menuAberto: !this.state.menuAberto });
  };


  render() {
    const { width, height } = Dimensions.get('window');
    
    return (
      <View style={styles.container}>
        {/* Conteúdo principal */}
        <View style={styles.conteudo1}>
          <TouchableOpacity 
            onPress={this.toggleMenu}
            style={styles.botaoMenu}
          >
            <Text style={styles.iconeMenu}>☰</Text>
          </TouchableOpacity>
          
          {/* Texto da temperatura posicionado abaixo do menu */}
          <View style={styles.containerTemperatura}>
            <Text style={styles.textoTempo}>Temperatura de 7°C 🌧️</Text>
          </View>
        </View>

        <View style={styles.conteudo2}>
          <Text style={ styles.textoUmidade }>Umidade do solo</Text>
          <Text style={ styles.porcentagemUmidade }>68%</Text>
          <Text style={ styles.textoIrrigacao }>Irrigação realizada 0 vezes em 2 dias.</Text>
        </View>
        <View style={styles.conteudo3}>
          <Text>
            <Image 
              source={require('../imagens/planta.png')}
              style={{ width: 300, height: 300}}
            />
          </Text>
        </View>

        {/* Menu em tela cheia */}
        {this.state.menuAberto && (
          <View style={[styles.menuFullscreen, { width, height }]}>
            <TouchableOpacity 
              onPress={this.toggleMenu}
              style={styles.botaoFecharMenu}
            >
              <Text style={styles.iconeMenu}>✕</Text>
            </TouchableOpacity>
            
            <View style={styles.menuContent}>

             <TouchableOpacity 
                  style={styles.menuItemButton} 
                  onPress={() => {
                    this.toggleMenu(); 
                    this.props.navigation.navigate('SobreProduto');}}>
                <Text style={styles.menuItem}>Sobre Produto</Text>
             </TouchableOpacity>

             <TouchableOpacity 
                  style={styles.menuItemButton} 
                  onPress={() => {
                    this.toggleMenu(); 
                    this.props.navigation.navigate('RelatorioGeral');}}>
                <Text style={styles.menuItem}>Relatório Geral</Text>
             </TouchableOpacity>

             <TouchableOpacity 
                  style={styles.menuItemButton} 
                  onPress={() => {
                    this.toggleMenu(); 
                    this.props.navigation.navigate('DescricaoArea');}}>
                <Text style={styles.menuItem}>Descrição da Area</Text>
             </TouchableOpacity>
             
            </View>
          </View>
        )}
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding:10
  },
  conteudo1: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-end',
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
    marginTop: 20, // Espaço entre o menu e a temperatura
  },
  textoTempo: {
    fontSize: 20,
    color: 'white',
  },
  conteudo2: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0
  },

  textoUmidade: {
    fontSize: 25,
    color: 'white',
    fontWeight: 900,
    marginBottom: 0,
  },

  porcentagemUmidade: {
    fontSize: 100,
    color: 'white',
    fontWeight: 900,
    marginTop: 0,
  },

  textoIrrigacao: {
    fontSize: 15,
    color: 'white',
    marginTop: 0,
  },

  conteudo3: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  menuFullscreen: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoFecharMenu: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  menuContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItem: {
    color: 'white',
    fontSize: 30,
    marginVertical: 20,
  }
});

export default TelaInicial;