import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { db } from './firebaseConfig';
import { ref, onValue } from "firebase/database";

class TelaInicial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuAberto: false,
      temperatura: '--',
      umidade: '--',
      chuva: false,
    };
  }

  componentDidMount() {
    // Listener para Temperatura
    onValue(ref(db, 'sensores/temperatura'), (snapshot) => {
      if (snapshot.exists()) {
        this.setState({ temperatura: snapshot.val() });
      }
    });

    // Listener para Umidade
    onValue(ref(db, 'sensores/umidade'), (snapshot) => {
      if (snapshot.exists()) {
        this.setState({ umidade: snapshot.val() });
      }
    });

    //Ligação para chuva
    onValue(ref(db, 'sensores/chuva'), (snapshot) => {
      if(snapshot.exists()){
        this.state({chuva: snapshot.val()});
      }
    })
  }


  toggleMenu = () => {
    this.setState({ menuAberto: !this.state.menuAberto });
  };

  render() {
    const { width, height } = Dimensions.get('window');
    const { temperatura, umidade, chuva } = this.state;

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
          
          {/* Texto da temperatura */}
          <View style={styles.containerTemperatura}>
            <Text style={styles.textoTempo}>
              Temperatura: {temperatura}°C 
            </Text>
             <Text style={styles.textoTempo}>
               {chuva ? "🌧️ Chovendo" : "☀️ Sem chuva"}
            </Text>
          </View>
        </View>

        <View style={styles.conteudo2}>
          <Text style={ styles.textoUmidade }>Umidade do solo</Text>
          <Text style={ styles.porcentagemUmidade }>{umidade}%</Text>
          <Text style={ styles.textoIrrigacao }>Irrigação realizada 0 vezes em 2 dias.</Text>
        </View>

        <View style={styles.conteudo3}>
          <Image 
            source={require('../../../imagens/planta.png')}
            style={{ width: 300, height: 300}}
          />
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
                    this.props.navigation.navigate('PerfilUsuario');}}>
                <Text style={styles.menuItem}>Perfil</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                  style={styles.menuItemButton} 
                  onPress={() => {
                    this.toggleMenu(); 
                    this.props.navigation.navigate('RelatorioGeral');}}>
                <Text style={styles.menuItem}>Relatório Geral</Text>
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
    padding:10 },

  conteudo1: 
  { flex: 1, 
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
    width: '100%', 
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

  textoIrrigacao: { 
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
      backgroundColor: 'rgba(0, 0, 0, 0.9)', 
      zIndex: 100, 
      justifyContent: 'center',
       alignItems: 'center' 
      },

  botaoFecharMenu: { 
    position: 'absolute', 
    top: 50, 
    right: 20 
  },

  menuContent: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },

  menuItem: { 
    color: 'white', 
    fontSize: 30, 
    marginVertical: 20 
  }
});

export default TelaInicial;
