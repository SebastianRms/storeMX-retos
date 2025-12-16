// src/controllers/paymentController.js
import PaymentMethod from '../models/paymentMethods.js';

// Crear un nuevo método de pago
export const createPaymentMethod = async (req, res) => {
  try {
    // 1. Extraemos los datos que envía el Frontend (Angular)
    const { type, cardNumber, cardHolderName, expiryDate } = req.body;
    
    // Obtenemos el ID del usuario desde el Token (inyectado por authMiddleware)
    const userId = req.user.userId || req.user._id;

    let finalCardNumber = cardNumber;
    let provider = 'generic';

    // 2. LÓGICA DE SEGURIDAD (Solo si NO es pago en efectivo)
    if (type !== 'cash_on_delivery') {
        
        // Validación básica de longitud antes de procesar
        if (!cardNumber || cardNumber.length < 15) {
            return res.status(400).json({ message: 'Número de tarjeta inválido' });
        }

        // A. DETECTAR PROVEEDOR (Visa empieza con 4, Master con 5, etc.)
        if (cardNumber.startsWith('4')) provider = 'Visa';
        else if (cardNumber.startsWith('5')) provider = 'Mastercard';
        else if (cardNumber.startsWith('3')) provider = 'Amex';

        // B. TOKENIZACIÓN SIMULADA: Cortamos y guardamos solo los últimos 4
        // Ejemplo: "4111...1234" se convierte en "1234"
        finalCardNumber = cardNumber.slice(-4); 
    }

    // 3. Crear el objeto para guardar en BD
    const newMethod = new PaymentMethod({
      user: userId,
      type,
      provider,         // Guardamos si es Visa/Master
      cardNumber: finalCardNumber, // Guardamos SOLO los 4 dígitos (seguro)
      cardHolderName,
      expiryDate,
      isDefault: false  // Por defecto no es la principal
    });

    // 4. Guardar en MongoDB
    await newMethod.save();

    res.status(201).json({
        message: 'Método de pago agregado con éxito',
        paymentMethod: newMethod
    });

  } catch (error) {
    console.error("Error en createPaymentMethod:", error);
    res.status(500).json({ message: 'Error al procesar el método de pago', error: error.message });
  }
};

// Obtener los métodos de pago del usuario
export const getPaymentMethods = async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id;
    // Buscamos todos los métodos que pertenezcan a este usuario
    const methods = await PaymentMethod.find({ user: userId }).sort({ createdAt: -1 });
    
    res.status(200).json(methods);
  } catch (error) {
    console.error("Error en getPaymentMethods:", error);
    res.status(500).json({ message: 'Error al obtener métodos de pago', error });
  }
};

// Eliminar método de pago
export const deletePaymentMethod = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId || req.user._id;

        // Verificamos que el método exista y PERTENEZCA al usuario que lo quiere borrar
        const deleted = await PaymentMethod.findOneAndDelete({ _id: id, user: userId });

        if (!deleted) {
            return res.status(404).json({ message: 'Método de pago no encontrado o no autorizado' });
        }

        res.status(200).json({ message: 'Método de pago eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};