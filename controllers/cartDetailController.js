const express = require('express');
const { Sequelize } = require('sequelize');
const Cart = require('../models/cartModel');
const CartDetail = require('../models/cartDetailModel');
const Product = require('../models/productModel');

const sequelize = new Sequelize("mysql://quangdb:Quang23022002@db4free.net:3306/quangdb", {
    dialectOptions: {
        connectTimeout: 60000 // Increase the connection timeout
    },
    retry: {
        max: 5 // Maximum number of retries
    }
});

module.exports = {
    addToCart: async (req, res) => {
        const transaction = await sequelize.transaction();

        try {
            const { currQuan } = req.body;
            const { cartId, prodId } = req.params; // Get cartId and prodId from request params

            // Find the product price
            const product = await Product.findByPk(prodId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            const currPrice = product.prodPrice * currQuan;

            // Check if the product is already in the cart
            let cartItem = await CartDetail.findOne({ where: { cartId, prodId }, transaction });

            if (cartItem) {
                // If the product is already in the cart, update the quantity and price
                cartItem.currQuan += parseInt(currQuan);
                cartItem.currPrice += currPrice;
                await cartItem.save({ transaction });
            } else {
                // If the product is not in the cart, add it
                cartItem = await CartDetail.create({
                    cartId,
                    prodId,
                    currPrice,
                    currQuan,
                    totalPrice: currPrice,
                    totalQuan: currQuan
                }, { transaction });
            }

            // Calculate the total price and quantity for the cart
            const cartItems = await CartDetail.findAll({ where: { cartId }, transaction });
            const totalPrice = cartItems.reduce((sum, item) => sum + item.currPrice, 0);
            const totalQuan = cartItems.reduce((sum, item) => sum + item.currQuan, 0);

            await CartDetail.update(
                { totalPrice, totalQuan },
                { where: { cartId }, transaction }
            );

            await transaction.commit();

            res.status(201).json({
                message: "Product added successfully",
                cartItem,
                totalPrice,
                totalQuan
            });

        } catch (error) {
            await transaction.rollback();
            console.error("Error adding item to cart:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
};
