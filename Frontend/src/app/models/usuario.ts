export interface Usuario {
    id_usuario: number;
    nombre_cliente: string;
    correo: string;
    telefono: string;
    tipo_usuario: 'mayoreo' | 'menudeo';
}

export interface UsuarioRegistro {
    nombre_cliente: string;
    correo: string;
    telefono: string;
    contrasena: string;
    tipo_usuario: 'mayoreo' | 'menudeo';
}

export interface Usuario extends UsuarioRegistro {
    id_usuario: number;
}