// Categorías del producto
interface Categoria {
    nombre: string;
}

// Información base del producto
interface ProductoBase {
    id: number;
    nombre: string;
    descripcion: string;
    marca: string;
    categorias: Categoria;
}

// Variante del producto
interface Variante {
    id: number;
    nombre_variante: string;
    procesador: string;
    display: string;
    camara: string;
    bateria: string;
    conectividad: string;
    sistema_operativo: string;
}

// Color del producto
interface Color {
    nombre: string;
}

// Almacenamiento del producto
interface Almacenamiento {
    capacidad: string;
}

// RAM del producto
interface EspecificacionRam {
    tipo: string;
    capacidad: string;
}

// Producto SKU con relaciones
interface ProductoSKU {
    id: number;
    sku: string;
    stock: number;
    imagen_url: string;
    active: boolean;
    precio: number;
    productos_base: ProductoBase;
    variantes: Variante;
    colores: Color;
    almacenamientos: Almacenamiento;
    especificaciones_ram: EspecificacionRam;
}

// Item del pedido
interface PedidoItem {
    id: number;
    pedido_id: string;
    producto_id: number;
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
    producto: ProductoSKU;
}

interface Direccion {
    id_direccion: string;
    direccion_1: string;
    direccion_2?: string | null;
    ciudad: string;
    estado: string;
    codigo_postal: string;
    pais: string;
}

interface Usuario {
    id_usuario: string;
    nombre: string;
    correo: string;
}

// Pedido
export interface PedidoRow {
    id: string;
    usuario_id: string;
    direccion_envio_id: number;
    fecha_pedido: string; // ISO string
    estado: "pendiente" | "confirmado" | "enviado" | "entregado" | "cancelado";
    total: number;
    items: PedidoItem[];
    direccion: Direccion;
    usuario: Usuario;
}

