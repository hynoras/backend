const Cart = require('../models/cartModel');
const CartDetail = require('../models/cartDetailModel'); // assuming you have this model defined

module.exports = {
    getCartByUserId: async (req, res) => {
        const userId = req.user.id; // This assumes you have user info in req.user
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