const Cart = require('../models/cartModel'); 

module.exports = {
    getCartByUserId: async (req, res) => {
        const userId = req.user.id;
        try {
            let cart = await Cart.findOne({ where: { userId } });
            if (!cart) {
                cart = await Cart.create({ userId });
            }
            res.status(200).json({ cartId: cart.cartId });
        } catch (error) {
            console.error("Error fetching/creating cart:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    
};