import React, { createContext, useReducer, ReactNode } from 'react';
import { Solicitud } from '../models/Solicitud';

type Action = 
  | { type: 'AGREGAR_SOLICITUD'; payload: Solicitud }
  | { type: 'ELIMINAR_SOLICITUD'; payload: string }
  | { type: 'ACTUALIZAR_SOLICITUD'; payload: Solicitud };

export const SolicitudContext = createContext<{
  solicitudes: Solicitud[];
  dispatch: React.Dispatch<Action>;
}>({ solicitudes: [], dispatch: () => {} });

const solicitudReducer = (state: Solicitud[], action: Action): Solicitud[] => {
  switch (action.type) {
    case 'AGREGAR_SOLICITUD': return [...state, action.payload];
    case 'ELIMINAR_SOLICITUD': return state.filter(s => s.id !== action.payload);
    case 'ACTUALIZAR_SOLICITUD': return state.map(s => s.id === action.payload.id ? action.payload : s);
    default: return state;
  }
};

export const SolicitudProvider = ({ children }: { children: ReactNode }) => {
  const [solicitudes, dispatch] = useReducer(solicitudReducer, []);
  return (
    <SolicitudContext.Provider value={{ solicitudes, dispatch }}>
      {children}
    </SolicitudContext.Provider>
  );
};