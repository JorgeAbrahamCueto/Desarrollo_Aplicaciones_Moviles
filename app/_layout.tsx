import React from 'react';
import { Stack } from 'expo-router';
import { SolicitudProvider } from '../src/context/SolicitudContext'; 

export default function RootLayout() {
  return (
    // Envolvemos toda la aplicación con nuestro Provider de datos
    <SolicitudProvider>
      <Stack>
        {/* Pantalla principal (Listado) */}
        <Stack.Screen 
          name="index" 
          options={{ title: 'Solicitudes de Atención', headerShown: true }} 
        />
        {/* Pantalla secundaria (Formulario) */}
        <Stack.Screen 
          name="crear" 
          options={{ title: 'Nueva Solicitud', headerShown: true }} 
        />
      </Stack>
    </SolicitudProvider>
  );
}