import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import ListadoScreen from '../screens/ListadoScreen';
import CrearSolicitudScreen from '../screens/CrearSolicitudScreen';
import DetalleScreen from '../screens/DetalleScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Listado" component={ListadoScreen} options={{ title: 'Clínica Veterinaria' }} />
      <Stack.Screen name="Crear" component={CrearSolicitudScreen} options={{ title: 'Nueva Solicitud' }} />
      <Stack.Screen name="Detalle" component={DetalleScreen} options={{ title: 'Detalle / Editar' }} />
    </Stack.Navigator>
  );
}