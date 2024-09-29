export interface Usuario {
    id_usuario: number;
    nombre_cliente: string;
    correo: string;
    telefono: string;
    tipo_usuario: 'mayoreo' | 'menudeo';
}