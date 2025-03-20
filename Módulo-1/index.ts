// Ruta POST para crear un nuevo producto
app.post("/api/products", (req: Request, res: Response) => {
  try {
    const { name, price, stock, is_active } = req.body;

    // Validamos los datos
    if (!name || !price || !stock || is_active === undefined) {
      return res.status(400).send("Datos incompletos para crear el producto.");
    }

    // Creamos un nuevo producto con un ID único
    const newProduct: Product = {
      id: generateUniqueId(),
      name,
      price,
      stock,
      is_active,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Agregamos el nuevo producto a la lista
    products.push(newProduct);

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al crear el producto", error);
    res.status(500).send("Error interno del servidor");
  }
});

// Ruta GET para obtener un producto por su ID
app.get("/api/products/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Buscamos el producto por su ID
    const product = products.find((p) => p.id === id);

    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }

    res.json(product);
  } catch (error) {
    console.error("Error al obtener el producto", error);
    res.status(500).send("Error interno del servidor");
  }
});

// Ruta PATCH para actualizar un producto por su ID
app.patch("/api/products/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, stock, is_active } = req.body;

    const product = products.find((p) => p.id === id);

    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }

    // Actualizamos el producto con los nuevos valores
    if (name) product.name = name;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (is_active !== undefined) product.is_active = is_active;

    product.updated_at = new Date().toISOString(); // Actualizamos la fecha de modificación

    res.json(product);
  } catch (error) {
    console.error("Error al actualizar el producto", error);
    res.status(500).send("Error interno del servidor");
  }
});

// Ruta DELETE para eliminar un producto por su ID
app.delete("/api/products/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return res.status(404).send("Producto no encontrado");
    }

    // Eliminamos el producto de la lista
    products.splice(index, 1);

    res.status(204).send(); // Código de éxito sin contenido
  } catch (error) {
    console.error("Error al eliminar el producto", error);
    res.status(500).send("Error interno del servidor");
  }