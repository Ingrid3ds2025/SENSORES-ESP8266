import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaInicial from '../pages/telas/telaInicial';
import PerfilUsuario from '../pages/telas/perfilUsuario';
import RelatorioGeral from '../pages/telas/relatorioGeral';
import Welcome from '../pages/welcome/bemVindo';
import SingIn from '../pages/singIn/telaLogin';
import CadastroUsuario from '../pages/singIn/telaCadastro';
import AuthLoading from '../routes/AuthLoading';
import ConfigSensor from '../pages/telas/configSensor';
import TelaEsqueceuSenha from '../pages/singIn/telaEsqueceuSenha';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="AuthLoading">
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="AuthLoading"
        component={AuthLoading}
        options={{ headerShown: false }}
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
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CadastroUsuario"
        component={CadastroUsuario}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EsqueceuSenha"
        component={TelaEsqueceuSenha}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ConfigSensor"
        component={ConfigSensor}
        options={{
          title: 'ConfigSensor',
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Stack.Navigator>
  );
}
