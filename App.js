import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Routes from './src/routes';
import PerfilUsuario from './src/pages/telas/perfilUsuario';


const Stack = createNativeStackNavigator(); 

export default function App() {
  return (

         
            // <NavigationContainer>
            //   <StatusBar backgroundColor='#38A69D' barStyle='light-content'/>
            //   <Routes/> 
            // </NavigationContainer>
             <PerfilUsuario/>
          
          
  );
}

