import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; 
import { SolicitudContext } from '../src/context/SolicitudContext'; 
import SolicitudCard from '../src/components/SolicitudCard'; // Asegúrate de que esta ruta sea correcta

export default function ListadoScreen() {
  const router = useRouter(); 
  const { solicitudes, dispatch } = useContext(SolicitudContext);
  
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('TODOS');

  const solicitudesFiltradas = solicitudes.filter(s => {
    const coincideBusqueda = s.mascotaNombre.toLowerCase().includes(busqueda.toLowerCase()) || 
                             s.clienteNombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = filtroEstado === 'TODOS' || s.estado === filtroEstado;
    return coincideBusqueda && coincideEstado;
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por mascota o cliente..."
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <FlatList
        data={solicitudesFiltradas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <SolicitudCard 
            solicitud={item} 
            onPress={() => console.log('Ir a detalle')}
            onDelete={() => dispatch({ type: 'ELIMINAR_SOLICITUD', payload: item.id })}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay solicitudes registradas.</Text>}
      />

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => router.push('crear')} 
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8', paddingTop: 15 },
  searchInput: { backgroundColor: '#ffffff', marginHorizontal: 20, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 8, borderWidth: 1, borderColor: '#e1e8ed', marginBottom: 15 },
  listContainer: { paddingHorizontal: 20, paddingBottom: 100 },
  emptyText: { textAlign: 'center', color: '#7f8c8d', marginTop: 20 },
  fab: { position: 'absolute', bottom: 30, right: 30, backgroundColor: '#0066cc', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  fabText: { color: '#fff', fontSize: 30, fontWeight: 'bold' }
});