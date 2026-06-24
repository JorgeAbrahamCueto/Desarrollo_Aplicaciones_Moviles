import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { SolicitudContext } from '../context/SolicitudContext';

export default function CrearSolicitudScreen() {
  const navigation = useNavigation<any>();
  const { dispatch } = useContext(SolicitudContext);

  const [clienteNombre, setClienteNombre] = useState('');
  const [errorNombre, setErrorNombre] = useState(''); // Estado para el error
  const [telefono, setTelefono] = useState('');
  const [mascotaNombre, setMascotaNombre] = useState('');
  const [tipoServicio, setTipoServicio] = useState<'Consulta' | 'Vacunación' | 'Grooming' | 'Emergencia'>('Consulta');
  const [prioridad, setPrioridad] = useState<'ALTA' | 'MEDIA' | 'BAJA'>('MEDIA');
  const [descripcion, setDescripcion] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const guardarSolicitud = () => {
    // Validación del nombre
    if (!clienteNombre) {
      setErrorNombre('El nombre del dueño es obligatorio');
      return;
    } else {
      setErrorNombre('');
    }

    if (!telefono || !mascotaNombre) {
      Alert.alert('Error', 'Por favor llena los campos obligatorios.');
      return;
    }

    dispatch({ 
      type: 'AGREGAR_SOLICITUD', 
      payload: { 
        id: Date.now().toString(), 
        clienteNombre, telefono, mascotaNombre, tipoServicio, prioridad, 
        descripcion, estado: 'PENDIENTE', fechaRegistro: date.toLocaleDateString() 
      } 
    });
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nombre del Dueño *</Text>
      <TextInput 
        style={[styles.input, errorNombre ? styles.inputError : null]} 
        value={clienteNombre} 
        onChangeText={(text) => {
          setClienteNombre(text);
          if (text) setErrorNombre(''); // Limpiar error al escribir
        }} 
      />
      {/* Mensaje de error debajo del input */}
      {errorNombre ? <Text style={styles.errorText}>{errorNombre}</Text> : null}

      <Text style={styles.label}>Teléfono *</Text>
      <TextInput style={styles.input} value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />

      <Text style={styles.label}>Nombre de la Mascota *</Text>
      <TextInput style={styles.input} value={mascotaNombre} onChangeText={setMascotaNombre} />

      <Text style={styles.label}>Tipo de Servicio</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={tipoServicio} onValueChange={(item) => setTipoServicio(item)}>
          <Picker.Item label="Consulta" value="Consulta" />
          <Picker.Item label="Vacunación" value="Vacunación" />
          <Picker.Item label="Grooming" value="Grooming" />
          <Picker.Item label="Emergencia" value="Emergencia" />
        </Picker>
      </View>

      <Text style={styles.label}>Prioridad</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={prioridad} onValueChange={(item) => setPrioridad(item)}>
          <Picker.Item label="Alta" value="ALTA" />
          <Picker.Item label="Media" value="MEDIA" />
          <Picker.Item label="Baja" value="BAJA" />
        </Picker>
      </View>

      <Text style={styles.label}>Fecha de Atención</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShow(true)}>
        <Text>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {show && <DateTimePicker value={date} mode="date" onChange={(e, d) => { setShow(false); if(d) setDate(d); }} />}

      <Text style={styles.label}>Descripción</Text>
      <TextInput style={[styles.input, styles.textArea]} value={descripcion} onChangeText={setDescripcion} multiline />

      <TouchableOpacity style={styles.btn} onPress={guardarSolicitud}>
        <Text style={styles.btnText}>Registrar Atención</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontWeight: 'bold', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 5 },
  inputError: { borderColor: 'red' },
  errorText: { color: 'red', fontSize: 12, marginBottom: 10 },
  textArea: { height: 80, textAlignVertical: 'top' },
  pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 15 },
  dateButton: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 15 },
  btn: { backgroundColor: '#0984e3', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 40 },
  btnText: { color: '#fff', fontWeight: 'bold' }
});