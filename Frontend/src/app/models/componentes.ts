export interface Componente {
    id_componente?: number; // Opcional, ya que se genera automáticamente
    id_paquete: number; // Identificador del paquete al que pertenece el componente
    tipo_componente: 'piñata' | 'palo' | 'globos' | 'centros_de_mesa' | 'decoracion'; // Tipos válidos
    nombre_componente: string; // Ejemplo: "Globos temáticos de Mario Bros"
    cantidad: number; // Cantidad de este componente
  }
  