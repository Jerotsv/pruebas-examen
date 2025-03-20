// Definimos la interfaz Product
export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

// Creamos un array de productos de ejemplo
export const products: Product[] = [
  {
    id: "1",
    name: "Agua",
    price: 10.99,
    stock: 20,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "2",
    name: "Aquarius",
    price: 15.49,
    stock: 30,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

// // Función para generar un ID único para los productos
// export function generateUniqueId(): string {
//   return Math.random().toString(36); // Genera un ID aleatorio único
// }

// Mi idea era generar los id de manera random, pero por falta de tiempo no he podido hacerlo
