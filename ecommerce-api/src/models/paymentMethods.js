// src/models/PaymentMethod.js
import mongoose from 'mongoose';

const paymentMethodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['credit_card', 'debit_card', 'cash_on_delivery'],
  },
  provider: {
    type: String, 
    default: 'generic' 
  },
  cardNumber: {
    type: String,
    required: function() { 
      return this.type !== 'cash_on_delivery'; 
    }
  },
  cardHolderName: {
    type: String,
    required: function() { 
      return this.type !== 'cash_on_delivery'; 
    }
  },
  expiryDate: {
    type: String, 
    required: function() { 
      return this.type !== 'cash_on_delivery'; 
    }
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true 
});

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);

export default PaymentMethod;