import Cart from "../models/cart.js";

// --- FUNCIÓN DE AÑADIR (CORREGIDA) ---
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

async function removeProductFromCart(req, res, next) {
  try {
    const userId = req.user._id || req.user.id || req.user.userId;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    cart.products.splice(productIndex, 1);
    await cart.save();
    await cart.populate('products.product');

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error removing product from cart:', error);
    next(error);
  }
}

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

async function getCartByUser(req, res, next) {
  try {
    const userId = req.params.id;
    const cart = await Cart.findOne({ user: userId }).populate("products.product");
    if (!cart) {
      return res.status(404).json({ message: "No cart found for this user" });
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


// --- EXPORTACIÓN COMPLETA (LA SOLUCIÓN AL CRASH) ---
export {
  addProductToCart,
  removeProductFromCart,
  getCartByUser,
  getCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart,
};

