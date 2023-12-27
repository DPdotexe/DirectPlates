// cartController.js
const Cart = require('../models/Cart');

const cartController = {
  addToCart: async (req, res) => {
    try {
      console.log('Richiesta ricevuta su /cart/add');
      console.log('Dati ricevuti:', req.body);

      const { userId, product, quantity } = req.body;

      // Assicurati che l'oggetto product e la sua proprietà _id siano definiti
      if (!product || !product._id) {
        console.log('Prodotto non valido:', product);
        return res.status(400).json({ success: false, message: 'Il prodotto non è valido' });
      }

      // Verifica se l'utente esiste (potrebbe essere necessario aggiungere la tua logica specifica)
      if (!userId) {
        console.log('UserId non valido:', userId);
        return res.status(400).json({ success: false, message: 'UserId non valido' });
      }

      // Trova il carrello dell'utente
      let cart = await Cart.findOne({ userId });

      // Se il carrello non esiste, creane uno nuovo
      if (!cart) {
        cart = new Cart({ userId, products: [] });
      }

      // Cerca il prodotto nel carrello
      const existingProductIndex = cart.products.findIndex(
        (p) => p.productId.toString() === product._id.toString()
      );

      // Aggiorna la quantità se il prodotto è già nel carrello
      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += quantity || 1;
      } else {
        // Aggiungi un nuovo prodotto al carrello
        cart.products.push({ productId: product._id, quantity: quantity || 1 });
      }

      // Salva il carrello aggiornato nel database
      const updatedCart = await cart.save();

      console.log('Cart aggiornato:', updatedCart); // Aggiunto questo log

      // Rispondi con i dettagli del carrello aggiornato
      return res.status(200).json({
        success: true,
        message: 'Prodotto aggiunto al carrello con successo!',
        cart: updatedCart,
      });
    } catch (error) {
      console.error('Errore durante l\'aggiunta al carrello:', error);
      return res.status(500).json({ success: false, message: 'Errore interno del server' });
    }
  },
};

module.exports = cartController;
