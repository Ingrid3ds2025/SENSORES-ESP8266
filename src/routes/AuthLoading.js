import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function AuthLoading({ navigation }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace('Welcome');
      } else {
        navigation.replace('TelaInicial');  // ou SignIn, se preferir
      }
      setLoading(false); // só pra garantir que acabou o loading
    });

    return unsubscribe; // cleanup
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#38A69D" />
      </View>
    );
  }

  return null; // não renderiza nada se já navegou
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
