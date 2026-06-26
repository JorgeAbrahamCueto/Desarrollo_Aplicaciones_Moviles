import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function DetalleSolicitudScreen() {
  // Simulamos que recibimos esta data de la pantalla anterior
  const solicitudMock = {
    id: '1',
    clienteNombre: 'María López',
    mascotaNombre: 'Luna',
    estado: 'EN_ATENCION',
    descripcion: 'Revisión por posible infección estomacal.',
  };

  const [estado, setEstado] = useState(solicitudMock.estado);
  const [descripcion, setDescripcion] = useState(solicitudMock.descripcion);

  // 👉 AQUÍ VA: La función de confirmación de eliminación
  const confirmarEliminacion = (id: string) => {
    Alert.alert(
      "Eliminar Solicitud", // Título
      "¿Estás seguro de que deseas eliminar esta solicitud? Esta acción no se puede deshacer.", // Mensaje
      [
        {
          text: "Cancelar",
          style: "cancel" // Botón gris inofensivo
        },
        { 
          text: "Sí, Eliminar", 
          onPress: () => {
            // Aquí irá la lógica para borrar de tu Context/Estado Global
            console.log("Eliminando solicitud ID:", id);
            // alert('Solicitud eliminada (simulación)');
          },
          style: "destructive" // En iOS lo pinta de rojo automáticamente
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Detalle de la Solicitud</Text>
      
      <View style={styles.cardInfo}>
        <Text style={styles.infoText}><Text style={styles.bold}>Mascota:</Text> {solicitudMock.mascotaNombre}</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>Cliente:</Text> {solicitudMock.clienteNombre}</Text>
      </View>

      <Text style={styles.label}>Editar Estado:</Text>
      <View style={styles.statusContainer}>
        {['PENDIENTE', 'EN_ATENCION', 'FINALIZADO'].map((s) => (
          <TouchableOpacity 
            key={s} 
            style={[styles.statusBtn, estado === s && styles.statusBtnActive]}
            onPress={() => setEstado(s)}
          >
            <Text style={[styles.statusText, estado === s && styles.statusTextActive]}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Editar Descripción:</Text>
      <TextInput 
        style={styles.textArea} 
        value={descripcion} 
        onChangeText={setDescripcion} 
        multiline 
      />

      <TouchableOpacity style={styles.updateBtn}>
        <Text style={styles.updateBtnText}>Guardar Cambios</Text>
      </TouchableOpacity>

      {/* 👉 AQUÍ VA: El nuevo botón rojo para eliminar que dispara la alerta */}
      <TouchableOpacity 
        style={styles.deleteBtn} 
        onPress={() => confirmarEliminacion(solicitudMock.id)}
      >
        <Text style={styles.deleteBtnText}>Eliminar Solicitud</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8', padding: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#2c3e50', marginBottom: 20 },
  cardInfo: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 20, borderWidth: 1, borderColor: '#e1e8ed' },
  infoText: { fontSize: 16, marginBottom: 5, color: '#34495e' },
  bold: { fontWeight: 'bold' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#2c3e50', marginBottom: 10 },
  statusContainer: { flexDirection: 'row', gap: 10, marginBottom: 20, flexWrap: 'wrap' },
  statusBtn: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, backgroundColor: '#e1e8ed' },
  statusBtnActive: { backgroundColor: '#3498db' },
  statusText: { fontSize: 12, color: '#7f8c8d', fontWeight: 'bold' },
  statusTextActive: { color: '#fff' },
  textArea: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, height: 100, textAlignVertical: 'top', marginBottom: 20 },
  updateBtn: { backgroundColor: '#f39c12', padding: 15, borderRadius: 8, alignItems: 'center' },
  updateBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  
  // 👉 AQUÍ VAN: Los estilos del botón de eliminar
  deleteBtn: { backgroundColor: '#e74c3c', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 15 },
  deleteBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});