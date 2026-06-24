// src/screens/DetalleScreen.tsx
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SolicitudContext } from '../context/SolicitudContext';

export default function DetalleScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { dispatch } = useContext(SolicitudContext);
  
  // Obtenemos la solicitud pasada por navegación
  const solicitud = route.params?.solicitud;

  // Estados para edición
  const [cliente, setCliente] = useState(solicitud.clienteNombre);
  const [telefono, setTelefono] = useState(solicitud.telefono);
  const [descripcion, setDescripcion] = useState(solicitud.descripcion);

  const guardarCambios = () => {
    dispatch({ 
      type: 'ACTUALIZAR_SOLICITUD', 
      payload: { ...solicitud, clienteNombre: cliente, telefono, descripcion } 
    });
    Alert.alert('Éxito', 'Cambios guardados correctamente');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>{solicitud.mascotaNombre}</Text>
      
      {/* Información estática de solo lectura */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Tipo de Atención:</Text>
        <Text style={styles.value}>{solicitud.tipoServicio}</Text>
        
        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.value}>{solicitud.fechaRegistro}</Text>
      </View>

      {/* Campos editables */}
      <Text style={styles.label}>Dueño:</Text>
      <TextInput style={styles.input} value={cliente} onChangeText={setCliente} />
      
      <Text style={styles.label}>Teléfono:</Text>
      <TextInput style={styles.input} value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />
      
      <Text style={styles.label}>Descripción:</Text>
      <TextInput style={[styles.input, styles.textArea]} value={descripcion} onChangeText={setDescripcion} multiline />

      <TouchableOpacity style={styles.btnGuardar} onPress={guardarCambios}>
        <Text style={styles.btnText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#0984e3' },
  infoBox: { backgroundColor: '#f1f2f6', padding: 15, borderRadius: 10, marginBottom: 20 },
  label: { fontWeight: 'bold', color: '#636e72', marginBottom: 5 },
  value: { fontSize: 16, marginBottom: 15, color: '#2d3436' },
  input: { borderWidth: 1, borderColor: '#dfe6e9', borderRadius: 8, padding: 12, marginBottom: 15, fontSize: 16 },
  textArea: { height: 100, textAlignVertical: 'top' },
  btnGuardar: { backgroundColor: '#0984e3', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});