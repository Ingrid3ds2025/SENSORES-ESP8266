import React from 'react';
import {View, StyleSheet,Text, TextInput} from 'react-native';


const ConfigurarSensor = () => {
  const [text, onChangeText] = React.useState('Escreva aqui');
  

  return (
    <View style={styles.container}>

      {/*FORMULARIO PARA PREENCHIMENTO DOS DADOS */}
      <View style={styles.formulario}>

        {/*TITULO */}
        <Text style={styles.titulo}>VAMOS CONFIGURAR SEU SENSOR!</Text>

        {/*INSIRIR NOME DO SENSOR */}
        <Text style={styles.subtitulo}>DE UM NOME PARA O SEU SENSOR</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />

        {/*INSIRIR NOME DO SENSOR */}
        <Text style={styles.subtitulo}> QUAL O TAMANHO DA ÁREA DE ONDE ELE FICA?</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />

        {/*INSIRIR NOME DO SENSOR */}
        <Text style={styles.subtitulo}>DE UM NOME PARA O SEU SENSOR</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />

        {/*INSIRIR NOME DO SENSOR */}
        <Text style={styles.subtitulo}>DE UM NOME PARA O SEU SENSOR</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 10
    },

    titulo: {
        color: 'white',
        fontSize:20,
        fontWeight: '600',
        marginTop: 20,
       
      },

    formulario: {
        color: 'white',
    },

    input: {
        color: 'white',
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: 'green',
        padding: 10,
    },
});

export default ConfigurarSensor;