import Cart from "../models/cart.js";

// --- 1. AÑADIR PRODUCTO (Lógica Robusta) ---
async function addProductToCart(req, res, next) {
  try {
    const userId = req.user._id || req.user.id || req.user.userId;
    const { productId, quantity = 1 } = req.body;

    if (!productId || quantity < 1) {
      return res
        .status(400)
        .json({ error: "Product ID and valid quantity are required" });
    }

    let cart = await Cart.findOne({ user: userId });

    const newProductInCart = { product: productId, quantity };

    if (!cart) {
      cart = new Cart({
        user: userId,
        products: [newProductInCart],
      });
    } else {
      const existingProductIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );

      if (existingProductIndex >= 0) {
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        cart.products.push(newProductInCart);
      }
    }

    await cart.save();
    await cart.populate("products.product");

    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
}

// --- 2. ELIMINAR UN PRODUCTO ---
async function removeProductFromCart(req, res, next) {
  try {
    const userId = req.user._id || req.user.id || req.user.userId;
    // Aceptamos productId por params (URL) o body, por seguridad
    const productId = req.params.productId || req.body.productId;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Filtramos para quitar el producto
    const initialLength = cart.products.length;
    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );

    if (cart.products.length === initialLength) {
        return res.status(404).json({ message: 'Product not found in cart' });
    }

    await cart.save();
    await cart.populate('products.product');

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error removing product from cart:', error);
    next(error);
  }
}

// --- 3. ACTUALIZAR CANTIDAD (NUEVA: Para botones + y -) ---
async function updateProductQuantity(req, res, next) {
    try {
      // Obtenemos userId del token
      const userId = req.user._id || req.user.id || req.user.userId;
      const { productId, quantity } = req.body;
  
      const cart = await Cart.findOne({ user: userId });
      if (!cart) return res.status(404).json({ message: "Cart not found" });
  
      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );
  
      if (productIndex > -1) {
        if (quantity > 0) {
          cart.products[productIndex].quantity = quantity;
        } else {
          // Si la cantidad es 0, eliminamos el producto
          cart.products.splice(productIndex, 1);
        }
        await cart.save();
        await cart.populate("products.product");
        res.status(200).json(cart);
      } else {
        res.status(404).json({ message: "Product not found in cart" });
      }
    } catch (error) {
      next(error);
    }
  }

// --- 4. VACIAR CARRITO (NUEVA: Para botón "Vaciar") ---
async function clearCart(req, res, next) {
    try {
      const userId = req.user._id || req.user.id || req.user.userId;
      
      // Borramos el carrito completo de este usuario
      const deletedCart = await Cart.findOneAndDelete({ user: userId });
      
      if (!deletedCart) {
          return res.status(404).json({ message: "Cart not found to clear" });
      }

      res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
      next(error);
    }
  }

// --- 5. OBTENER CARRITO POR USUARIO ---
async function getCartByUser(req, res, next) {
  try {
    // Intentamos sacar el ID del token primero, si no del param
    const userId = req.user?._id || req.user?.userId || req.params.id;
    
    const cart = await Cart.findOne({ user: userId }).populate("products.product");
    if (!cart) {
      return res.status(404).json({ message: "No cart found for this user" });
    }
    res.json(cart);
  } catch (error) {
    next(error);
  }
}

// --- FUNCIONES ADMIN / EXTRAS (Tus originales) ---

async function getCarts(req, res, next) {
  try {
    const carts = await Cart.find().populate("user").populate("products.product");
    res.json(carts);
  } catch (error) {
    next(error);
  }
}

async function getCartById(req, res, next) {
  try {
    const id = req.params.id;
    const cart = await Cart.findById(id).populate("user").populate("products.product");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    next(error);
  }
}

async function createCart(req, res, next) {
  try {
    const { user, products } = req.body;
    const newCart = await Cart.create({ user, products });
    await newCart.populate("user").populate("products.product");
    res.status(201).json(newCart);
  } catch (error) {
    next(error);
  }
}

async function updateCart(req, res, next) {
    try {
        const { id } = req.params;
        const updatedCart = await Cart.findByIdAndUpdate(id, req.body, { new: true })
            .populate("user")
            .populate("products.product");
        if (!updatedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(updatedCart);
    } catch (error) {
        next(error);
    }
}

async function deleteCart(req, res, next) {
    try {
        const { id } = req.params;
        const deletedCart = await Cart.findByIdAndDelete(id);
        if (!deletedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

// --- EXPORTACIÓN COMPLETA ---
export {
  addProductToCart,
  removeProductFromCart,
  updateProductQuantity, // Nueva
  clearCart,             // Nueva
  getCartByUser,
  getCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart,
};