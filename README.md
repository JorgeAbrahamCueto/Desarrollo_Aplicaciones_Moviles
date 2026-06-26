# Clínica Veterinaria - Sistema de Gestión de Solicitudes

Este proyecto es una aplicación móvil desarrollada en **React Native con Expo** diseñada para gestionar las solicitudes de atención de la clinica veterinaria PetHaus. La aplicación permite un flujo completo de creación, visualización, edición y eliminación de solicitudes (CRUD).

## 🚀 Características Principales
* **Gestión de Estado:** Implementación de `Context API` y `useReducer` para una gestión eficiente de los datos a nivel global.
* **Navegación Profesional:** Flujo completo mediante `React Navigation` (Bienvenida -> Listado -> Detalle/Editar -> Crear).
* **UI/UX Atractiva:** Uso de tarjetas interactivas, iconos dinámicos según el tipo de servicio y chips de prioridad.
* **Validaciones:** Validación de formularios en tiempo real con mensajes visuales de error.
* **Tipado Robusto:** Código íntegramente desarrollado con **TypeScript**.

## 🛠 Tecnologías Utilizadas
* **Framework:** React Native (Expo)
* **Lenguaje:** TypeScript
* **Estado:** Context API + useReducer
* **Navegación:** @react-navigation/stack
* **Iconos:** @expo/vector-icons
* **Componentes:** React Native (FlatList, ScrollView, TextInput, Picker, etc.)

## 📋 Instrucciones de Ejecución

### Requisitos previos
* Tener instalado [Node.js](https://nodejs.org/).
* Tener instalado [Expo CLI](https://docs.expo.dev/).

### Pasos para ejecutar
1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/JorgeAbrahamCueto/Desarrollo_Aplicaciones_Moviles.git](https://github.com/JorgeAbrahamCueto/Desarrollo_Aplicaciones_Moviles.git)
   cd NOMBRE_DEL_PROYECTO
2. **Instalar dependencias:**
   npm install
3. **Ejecutar la Aplicacion:**
   npx expo start