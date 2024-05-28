const express = require('express');
const { Sequelize } = require('sequelize');
const Product = require('../models/productModel');
const PurchaseOrder = require('../models/orderModel');
const OrderDetail = require('../models/orderDetailModel');
const CartDetail = require('../models/cartDetailModel');

const sequelize = new Sequelize("mysql://quangdb:Quang23022002@db4free.net:3306/quangdb", {
    dialectOptions: {
        connectTimeout: 60000 // Increase the connection timeout
    },
    retry: {
        max: 5 // Maximum number of retries
    }
});

module.exports = {
    generateOrder: async (req, res) => {
        const transaction = await sequelize.transaction();

        try {
            const { custName, custPhoneNo, shippingMethod, shippingAddr } = req.body;
            const userId = req.user.id;
            const { cartId } = req.params;

            order = await PurchaseOrder.create({
                userId,
                custName,
                custPhoneNo,
                shippingMethod,
                shippingAddr,
                ordDate: new Date()
            }, { transaction });

            const ordId = order.ordId;

            const cartDetails = await CartDetail.findAll({ where: { cartId }, transaction });
            if (!cartDetails || cartDetails.length === 0) {
                await transaction.rollback();
                return res.status(404).json({ message: 'Cart is empty or not found' });
            }

            for (const cartDetail of cartDetails) {
                await OrderDetail.create({
                    ordId,
                    prodId: cartDetail.prodId,
                    totalPrice: cartDetail.totalPrice,
                    totalQuan: cartDetail.totalQuan,
                }, { transaction });
            }

            await CartDetail.destroy({ where: { cartId }, transaction });

            await transaction.commit();

            res.status(201).json({
                message: "Order created successfully",
                order,
                orderDetail: cartDetails
            });

        } catch (error) {
            await transaction.rollback();
            console.error("Error generating order:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    deleteOrder: async (req, res) => {
        try {
            const { ordId } = req.params;

            await OrderDetail.destroy({ where: { ordId } });
            await PurchaseOrder.destroy({ where: { ordId } });

            res.json({ message: "Order deleted successfully" });

        } catch(error) {
            console.error("Error deleting order:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}