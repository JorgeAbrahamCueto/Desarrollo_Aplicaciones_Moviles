import 'react-native-gesture-handler'; // 
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SolicitudProvider } from './src/context/SolicitudContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    // 1. Proveemos los datos globales a toda la app
    <SolicitudProvider>
      {/* 2. Habilitamos la navegación */}
      <NavigationContainer>
        {/* 3. Cargamos nuestras pantallas */}
        <AppNavigator />
      </NavigationContainer>
    </SolicitudProvider>
  );
}