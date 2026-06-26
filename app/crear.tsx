import React, { useState, useContext } from 'react'; 
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SolicitudContext } from '../src/context/SolicitudContext'; 

export default function CrearSolicitudScreen() {
  const router = useRouter();
  const { dispatch } = useContext(SolicitudContext);

  const [clienteNombre, setClienteNombre] = useState('');
  const [mascotaNombre, setMascotaNombre] = useState('');
  const [tipoServicio, setTipoServicio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [errores, setErrores] = useState({ clienteNombre: '', mascotaNombre: '' });

  const guardarSolicitud = () => {
    let valid = true;
    let nuevosErrores = { clienteNombre: '', mascotaNombre: '' };

    if (clienteNombre.trim() === '') {
      nuevosErrores.clienteNombre = '* Requerido';
      valid = false;
    }
    if (mascotaNombre.trim() === '') {
      nuevosErrores.mascotaNombre = '* Requerido';
      valid = false;
    }

    setErrores(nuevosErrores);

    if (valid) {
      const nuevaSolicitud = {
        id: Date.now().toString(),
        clienteNombre,
        telefono: 'No especificado',
        mascotaNombre,
        tipoServicio: tipoServicio || 'Consulta',
        prioridad: 'MEDIA',
        descripcion,
        estado: 'PENDIENTE' as const, // Debe coincidir con tu modelo
        fechaRegistro: new Date().toLocaleDateString(),
      };

      dispatch({ type: 'AGREGAR_SOLICITUD', payload: nuevaSolicitud });
      alert('¡Solicitud registrada correctamente!');
      router.back(); // Volvemos automáticamente al listado
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre del Cliente</Text>
        <TextInput 
          style={[styles.input, errores.clienteNombre ? styles.inputError : null]} 
          value={clienteNombre} 
          onChangeText={(text) => {
            setClienteNombre(text);
            setErrores({ ...errores, clienteNombre: '' }); 
          }} 
        />
        {errores.clienteNombre ? <Text style={styles.errorText}>{errores.clienteNombre}</Text> : null}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre de la Mascota</Text>
        <TextInput 
          style={[styles.input, errores.mascotaNombre ? styles.inputError : null]} 
          value={mascotaNombre} 
          onChangeText={(text) => {
            setMascotaNombre(text);
            setErrores({ ...errores, mascotaNombre: '' }); 
          }} 
        />
        {errores.mascotaNombre ? <Text style={styles.errorText}>{errores.mascotaNombre}</Text> : null}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Tipo de Servicio</Text>
        <TextInput style={styles.input} value={tipoServicio} onChangeText={setTipoServicio} />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Descripción</Text>
        <TextInput style={[styles.input, styles.textArea]} value={descripcion} onChangeText={setDescripcion} multiline numberOfLines={4} />
      </View>

      <TouchableOpacity style={styles.submitBtn} onPress={guardarSolicitud}>
        <Text style={styles.submitBtnText}>Registrar Solicitud</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  formGroup: { marginBottom: 18 },
  label: { marginBottom: 8, fontSize: 16, color: '#333', fontWeight: '500' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, backgroundColor: '#fafafa' },
  inputError: { borderColor: '#d9534f', borderWidth: 1.5 },
  errorText: { marginTop: 6, color: '#d9534f', fontSize: 14, fontWeight: 'bold' },
  textArea: { minHeight: 100, textAlignVertical: 'top' },
  submitBtn: { marginTop: 10, marginBottom: 40, backgroundColor: '#0066cc', paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
  submitBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});