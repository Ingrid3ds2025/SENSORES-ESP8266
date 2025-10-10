import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaInicial from '../pages/telas/telaInicial';
import PerfilUsuario from '../pages/telas/perfilUsuario';
import RelatorioGeral from '../pages/telas/relatorioGeral';
import Welcome from '../pages/welcome/bemVindo';
import SingIn from '../pages/singIn/telaLogin';
import CadastroUsuario from '../pages/singIn/telaCadastro';
import AuthLoading from '../routes/AuthLoading';  // Importante

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="AuthLoading">

       <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      {/* Tela intermediária para verificar se o usuário está logado */}
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
    </Stack.Navigator>
  );
}
