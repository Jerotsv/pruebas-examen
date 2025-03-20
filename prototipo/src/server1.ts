import express, { Request, Response } from "express";
import cors from "cors";
import { Product, products, generateUniqueId } from "./mockProducts.js"; // Traemos los productos del archivo mockProduct.ts

const app = express();

// Desactivamos la cabecera 'X-Powered-By' para mejorar la seguridad, para que no se muestre que usamos Express
app.disable("x-powered-by");

// Habilitamos CORS para permitir la interacción entre el front y el back
app.use(cors());

// Usamos express.json() para que el servidor pueda leer datos en formato JSON que el cliente pueda enviar
app.use(express.json());

// Endpoint para obtener todos los productos
app.get("/products", (req: Request, res: Response) => {
  try {
    // Intentamos devolver el array de productos
    res.json(products); // Si todo va bien, se envían los productos como JSON
  } catch (error) {
    // Si hay algún error (algo sale mal), respondemos con un código de error 500 (error en el servidor)
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
});

// Endpoint para obtener un producto por su ID
app.get("/products/:id", (req: Request, res: Response) => {
  const { id } = req.params; // Obtenemos el ID del producto desde los parámetros de la URL
  try {
    // Buscamos el producto que tiene el ID que nos pasan
    const product = products.find((p) => p.id === id); // find() devuelve el producto si lo encuentra, sino devuelve undefined
    if (!product) {
      // Si no encontramos el producto, lanzamos un error
      throw new Error("Producto no encontrado"); // Esto hace que el flujo pase al bloque catch
    }
    res.json(product); // Si encontramos el producto, lo devolvemos como JSON
  } catch (error) {
    // Si el error tiene un mensaje, lo usamos, si no, mandamos un mensaje genérico
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    res.status(404).json({ message: errorMessage });
  }
});

// Endpoint para crear un nuevo producto
app.post("/products", (req: Request, res: Response) => {
  try {
    // Aquí tomamos el nuevo producto que viene en el cuerpo de la solicitud (req.body)
    const newProduct: Product = req.body; // El cliente envía los datos del producto para agregarlo
    // Añadimos el nuevo producto al array de productos
    products.push({
      ...newProduct, // Copiamos todas las propiedades del nuevo producto
      created_at: new Date(), // Asignamos la fecha de creación
      updated_at: new Date(), // Asignamos la fecha de actualización
    });

    // Devolvemos el producto que acabamos de crear
    res.status(201).json(newProduct); // Respondemos con un código 201 (producto creado correctamente)
  } catch (error) {
    // Si ocurre algún error (por ejemplo, datos mal formateados), respondemos con un error 500
    res.status(500).json({ message: "Error al crear el producto", error });
  }
});

// Endpoint para actualizar un producto por su ID
app.patch("/products/:id", (req: Request, res: Response) => {
  const { id } = req.params; // Obtenemos el ID del producto de los parámetros de la URL
  try {
    // Buscamos el índice del producto que queremos actualizar
    const productIndex = products.findIndex((p) => p.id === id); // findIndex() devuelve el índice del producto
    if (productIndex === -1) {
      // Si no encontramos el producto, lanzamos un error
      throw new Error("Producto no encontrado"); // Esto hará que pase al bloque catch
    }

    // Si encontramos el producto, lo actualizamos con los nuevos datos que llegan en req.body
    const updatedProduct: Product = {
      ...products[productIndex], // Mantenemos los datos del producto original
      ...req.body, // Actualizamos con los datos que el cliente envió
      updated_at: new Date(), // Asignamos la fecha de actualización
    };

    // Actualizamos el producto en el array
    products[productIndex] = updatedProduct; // Reemplazamos el producto viejo con el actualizado
    res.json(updatedProduct); // Respondemos con el producto actualizado
  } catch (error) {
    // Si hay algún error (como no encontrar el producto), respondemos con un error 404
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    res.status(404).json({ message: errorMessage });
  }
});

// Endpoint para eliminar un producto por su ID
app.delete("/products/:id", (req: Request, res: Response) => {
  const { id } = req.params; // Obtenemos el ID del producto de los parámetros de la URL
  try {
    // Buscamos el índice del producto que queremos eliminar
    const productIndex = products.findIndex((p) => p.id === id); // findIndex() nos da el índice del producto
    if (productIndex === -1) {
      // Si no encontramos el producto, lanzamos un error
      throw new Error("Producto no encontrado"); // Lanza una excepción si no encontramos el producto
    }

    // Si encontramos el producto, lo eliminamos del array
    products.splice(productIndex, 1); // splice() elimina el producto en la posición indicada
    res.status(204).send(); // Respondemos con un código 204 (sin contenido) para indicar que fue eliminado
  } catch (error) {
    // Si hay algún error (como no encontrar el producto), respondemos con un error 404
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    res.status(404).json({ message: errorMessage });
  }
});

// Configuramos el puerto en el que nuestro servidor escuchará las peticiones será el 3000 por defecto
const PORT = 3000;
app.listen(PORT, () => {
  // Aquí mostramos un mensaje en la consola cuando el servidor empieza a escuchar
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
