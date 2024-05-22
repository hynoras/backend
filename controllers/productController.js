const express = require("express");
const { Sequelize, where } = require("sequelize");
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");

const sequelize = new Sequelize("mysql://quangdb:Quang23022002@db4free.net:3306/quangdb", {
    dialectOptions: {
        connectTimeout: 60000 // Increase the connection timeout
    },
    retry: {
        max: 5 // Maximum number of retries
    }
});

module.exports = {
    retrieveAllProduct: async (req, res) => {
        try{
            const existingProduct = await Product.findAll({
            include: [
                {
                    model: Category,
                    attributes: ['catId', 'catName']
                }
            ]
            });
            return res.status(200).json(existingProduct);

        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    retrieveOneProductById: async(req, res) => {
        try {
            const prodId = req.params.id;
            const product = await Product.findOne({ prodId });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            console.error("Error retrieving product:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    addProduct: async (req, res) => {

        const transaction = await sequelize.transaction();

        try {
            const { prodName, prodDesc, prodPrice, prodQuan, prodImg, catName } = req.body;
        
            // Create new user
            const newProduct = await Product.create({ 
                prodName, 
                prodDesc, 
                prodPrice, 
                prodQuan, 
                prodImg 
            }, { transaction });
            
            const newCategory = await Category.create({ 
                catName, 
                prodId: newProduct.prodId }, { transaction });

            await transaction.commit();
            
            res.status(201).json({ 
                message: "Product added successfully", 
                product: newProduct,
                category: newCategory
            });
        } catch (error) {
            await transaction.rollback();
          console.error("Error adding product:", error);
          res.status(500).json({ message: "Internal Server Error" });
        }
      },
}