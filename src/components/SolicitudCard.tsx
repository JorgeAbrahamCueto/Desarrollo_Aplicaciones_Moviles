import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 1. Importar los iconos
import { Solicitud } from '../models/Solicitud';

export default function SolicitudCard({ solicitud, onDelete, onPress }: any) {
  
  //Función para elegir el icono según el servicio
  const getIcon = () => {
    switch (solicitud.tipoServicio) {
      case 'Vacunación': return 'medkit';
      case 'Grooming': return 'cut';
      case 'Emergencia': return 'alert';
      default: return 'bandage';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* 3. Renderizar el icono */}
          <Ionicons name={getIcon()} size={24} color="#0984e3" style={{ marginRight: 8 }} />
          <Text style={styles.mascota}>{solicitud.mascotaNombre}</Text>
        </View>
        <Text style={styles.prioridad}>{solicitud.prioridad}</Text>
      </View>
      
      <Text style={styles.text}>Dueño: {solicitud.clienteNombre}</Text>
      <Text style={styles.text}>Teléfono: {solicitud.telefono}</Text>
      <Text style={styles.servicio}>Atención: {solicitud.tipoServicio}</Text>
      <Text style={styles.desc} numberOfLines={2}>Desc: {solicitud.descripcion}</Text>
      <Text style={styles.fecha}>Fecha: {solicitud.fechaRegistro}</Text>
      
      <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>Eliminar</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10, elevation: 3 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, alignItems: 'center' },
  mascota: { fontSize: 18, fontWeight: 'bold' },
  prioridad: { color: '#0984e3', fontWeight: 'bold' },
  text: { fontSize: 14, color: '#2d3436' },
  servicio: { fontSize: 14, fontWeight: 'bold', color: '#6c5ce7' },
  desc: { fontSize: 13, color: '#636e72', marginTop: 2 },
  fecha: { fontSize: 12, color: '#b2bec3', marginTop: 5 },
  deleteBtn: { marginTop: 10, backgroundColor: '#ff7675', padding: 8, borderRadius: 5, alignItems: 'center' }
});