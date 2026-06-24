export interface Solicitud {
  id: string;
  clienteNombre: string;
  telefono: string;
  mascotaNombre: string;
  tipoServicio: 'Consulta' | 'Vacunación' | 'Grooming' | 'Emergencia';
  prioridad: 'ALTA' | 'MEDIA' | 'BAJA';
  descripcion: string;
  estado: 'PENDIENTE' | 'EN ATENCION' | 'FINALIZADO';
  fechaRegistro: string;
}