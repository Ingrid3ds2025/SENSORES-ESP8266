import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaInicial from '../../src/pages/telas/telaInicial';  // Certifique-se de que o caminho está correto
import PerfilUsuario from '../../src/pages/telas/perfilUsuario';
import RelatorioGeral from '../../src/pages/telas/relatorioGeral';
import Welcome from '../pages/welcome/bemVindo';
import SingIn from '../pages/singIn/telaLogin';
import CadastroUsuario from '../pages/singIn/telaCadastro';


const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    
      <Stack.Navigator>

          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{
              title: 'BEM-VINDO',
              headerStyle: { backgroundColor: 'black' },
              headerTintColor: 'white',
              headerTitleStyle: { fontWeight: 'bold' },
              headerShown: false,  
            }}
          />
          
          <Stack.Screen
            name="TelaInicial"
            component={TelaInicial}  
            options={{ headerShown: false }}  
          />

          <Stack.Screen
            name="PerfilUsuario"
            component={PerfilUsuario}
            options={{
              title: 'PERFIL',
              headerStyle: { backgroundColor: 'black' },
              headerTintColor: 'white',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
          
          <Stack.Screen
            name="RelatorioGeral"
            component={RelatorioGeral}
            options={{
              title: 'RELATÓRIO GERAL',
              headerStyle: { backgroundColor: 'black' },
              headerTintColor: 'white',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
        
          <Stack.Screen
            name="SignIn"
            component={SingIn}
            options={{
              title: 'LOGIN',
              headerStyle: { backgroundColor: 'black' },
              headerTintColor: 'white',
              headerTitleStyle: { fontWeight: 'bold' },
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="CadastroUsuario"
            component={CadastroUsuario}
            options={{
              title: 'CADASTRO DE USUÁRIO',
              headerStyle: { backgroundColor: 'black' },
              headerTintColor: 'white',
              headerTitleStyle: { fontWeight: 'bold' },
              headerShown: false,
            }}
          />
      </Stack.Navigator>
    
  );
}
