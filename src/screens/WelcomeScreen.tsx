import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Ionicons name="paw" size={80} color="#0984e3" />
      <Text style={styles.title}>PetHaus</Text>
      <Text style={styles.subtitle}>Los peluditos de casa, en manos expertas y llenas de amor.</Text>
      
      <TouchableOpacity 
        style={styles.btn} 
        onPress={() => navigation.navigate('Listado')}
      >
        <Text style={styles.btnText}>Iniciar Gestión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#0984e3', marginTop: 20 },
  subtitle: { fontSize: 16, color: '#636e72', marginBottom: 40, textAlign: 'center' },
  btn: { backgroundColor: '#0984e3', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 25 },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});