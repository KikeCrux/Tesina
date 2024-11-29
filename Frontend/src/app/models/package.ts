export interface Package {
    id_paquete?: number; // Opcional, ya que se genera automáticamente en el backend
    nombre_paquete: string;
    descripcion?: string; // Opcional
    precio_paquete: number;
    decoracion?: string; // Opcional
  }