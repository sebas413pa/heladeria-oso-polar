'use strict'
const { models } = require('../db');
const { productos } = models;

module.exports = {
    async listAll(req, res) {
        try {
            const resultado = await productos.findAll({
                where: { estado: 1 }
            });
            res.status(200).json({
                success: true,
                message: "Productos encontrados",
                data: resultado
            });
        } catch (error) {
            console.error("Error al listar productos:", error);
            res.status(500).json({
                success: false,
                message: "Error al obtener productos"
            });
        }
    },

    async getProductById(req, res) {
        const id_producto = req.params.id;
        try {
            const producto = await productos.findOne({
                where: { id_producto, estado: 1 }
            });

            if (!producto) {
                return res.status(404).json({
                    success: false,
                    message: "Producto no encontrado"
                });
            }

            res.status(200).json({
                success: true,
                message: "Producto encontrado",
                data: producto
            });
        } catch (error) {
            console.error("Error al obtener producto:", error);
            res.status(500).json({
                success: false,
                message: "Error al obtener producto"
            });
        }
    },

    async createProduct(req, res) {
        try {
            const producto = await productos.create({
                nombre: req.body.nombre,
                precio: req.body.precio,
                id_sabor: req.body.id_sabor,
                estado: 1
            });

            res.status(201).json({
                success: true,
                message: "Producto creado exitosamente",
                data: producto
            });
        } catch(error) {
            console.error("Error al crear producto:", error);
            res.status(500).json({ 
                success: false,
                message: "Error al crear producto" 
            });
        }
    },

    async updateProduct(req, res) {
        const id_producto = req.params.id;
        try {
            const producto = await productos.findOne({
                where: { id_producto, estado: 1 }
            });

            if (!producto) {
                return res.status(404).json({ 
                    success: false,
                    message: "Producto no encontrado" 
                });
            }

            await producto.update({
                nombre: req.body.nombre,
                precio: req.body.precio,
                id_sabor: req.body.id_sabor
            });

            res.status(200).json({
                success: true,
                message: "Producto actualizado correctamente",
                data: producto
            });
        } catch(error) {
            console.error("Error al actualizar producto:", error);
            res.status(500).json({
                success: false,
                message: "Error al actualizar producto"
            });
        }
    },

    async desactivar(req, res) {
        const id_producto = req.params.id;
        try {
            const producto = await productos.findOne({
                where: { id_producto, estado: 1 }
            });

            if (!producto) {
                return res.status(404).json({ 
                    success: false,
                    message: "Producto no encontrado" 
                });
            }

            await producto.update({ estado: 0 });

            res.status(200).json({
                success: true,
                message: "Producto desactivado correctamente"
            });
        } catch(error) {
            console.error("Error al desactivar producto:", error);
            res.status(500).json({
                success: false,
                message: "Error al desactivar producto"
            });
        }
    }
}
