// src/screens/ListadoScreen.tsx
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SolicitudContext } from '../context/SolicitudContext';
import SolicitudCard from '../components/SolicitudCard';

export default function ListadoScreen() {
    const { solicitudes, dispatch } = useContext(SolicitudContext);
    const navigation = useNavigation<any>();

    // Estado local para el buscador
    const [busqueda, setBusqueda] = useState('');

    // Filtramos la lista según lo que el usuario escriba
    const solicitudesFiltradas = solicitudes.filter(s =>
        s.mascotaNombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        s.clienteNombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar por mascota o dueño..."
                value={busqueda}
                onChangeText={setBusqueda}
            />

            <FlatList
                data={solicitudesFiltradas}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <SolicitudCard
                        solicitud={item}
                        onPress={() => console.log('Ver detalle de', item.mascotaNombre)}
                        onDelete={() => {
                            Alert.alert(
                                "Eliminar solicitud",
                                "¿Estás seguro de que deseas eliminar esta atención?",
                                [
                                    { text: "Cancelar", style: "cancel" },
                                    { text: "Eliminar", onPress: () => dispatch({ type: 'ELIMINAR_SOLICITUD', payload: item.id }), style: "destructive" }
                                ]
                            );
                        }}
                    />
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>No hay solicitudes registradas.</Text>}
            />

            {/* Botón flotante para ir al formulario */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('Crear')}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f4f6f8', paddingTop: 16 },
    searchInput: { backgroundColor: '#fff', marginHorizontal: 16, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 16 },
    listContainer: { paddingHorizontal: 16, paddingBottom: 100 },
    emptyText: { textAlign: 'center', color: '#888', marginTop: 20, fontSize: 16 },
    fab: { position: 'absolute', bottom: 30, right: 30, backgroundColor: '#0984e3', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3 },
    fabText: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginTop: -4 }
});