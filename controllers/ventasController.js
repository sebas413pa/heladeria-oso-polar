'use strict'
const { where } = require('sequelize');
const { models } = require('../db');
const { ventas } = models;
const { detalleventa} = models;
const { productos } = models;

module.exports = {
    async listByDate(req, res){
        const start_date = req.body.fecha_inicio;
        const end_date = req.body.fecha_final;

        if (!start_date || !end_date) {
            return res.status(400).json({
                success: false,
                message: "Debe enviar la fecha de inicio y final"
            });
        }

        try {
            const resultado = await ventas.findAll({
                where: {
                    fecha: {
                        [require('sequelize').Op.between]: [start_date, end_date]
                    },
                    estado: 1
                },
                include: [
                    {
                        model: detalleventa,
                        as: 'detalleventa'
                    }
                ]
            });
            res.status(200).json({
                success: true,
                message: "Ventas encontradas",
                data: resultado
            });
        } catch (error) {
            console.error("Error al listar las ventas por fecha:", error);
            res.status(500).json({
                success: false,
                message: "Error al obtener las ventas por fecha"
            });
        }
    },
    async listAll (req, res) {
        try {
            const resultado = await ventas.findAll({
                where: {
                    estado: 1
                },
                include: [
                    {
                        model: detalleventa,
                        as: 'detalleventa' 
                    }
                ]
            });
            res.status(200).json({
                success: true,
                message: "Ventas encontradas",
                data: resultado
            });
        } catch (error) {
            console.error("Error al listar las ventas:", error);
            res.status(500).json({
                success: false,
                message: "Error al obtener las ventas"
            });
        }
    },

    async createSale(req, res) {
        const detalles = req.body.detalles
        const cliente = req.body.id_cliente
        let subtotal
        let total = 0;

        try {
            const venta = await ventas.create({
                id_cliente: cliente,
                fecha: Date.now(),
                estado: 1
            });

            for (const detalle of detalles) {
                const _producto = await productos.findOne({
                    where:{
                        id_producto: detalle.id_producto,
                        estado: 1
                    }
                });
                if (!_producto) {
                    throw new Error(`Producto con id ${detalle.id_producto} no encontrado`);
                }
                subtotal = _producto.precio * detalle.cantidad;
                total += subtotal;
                await detalleventa.create({
                    id_venta: venta.id_venta,
                    id_producto: detalle.id_producto,
                    cantidad: detalle.cantidad,
                    subtotal: subtotal,
                    estado: 1
                });
            }
            await venta.update({
                total
            });
            await venta.reload();
            res.status(201).json({
                success: true,
                message: "Venta creada exitosamente",
                data: venta
            });
        } catch(error) {
            console.error("Error al crear la venta", error);
            res.status(500).json({ 
                success: false,
                message: "Error al crear la venta" 
            });
        }
    },

    async desactivar (req, res){
        const id_venta = req.params.id;
        try {
            const venta = await ventas.findOne({
                where: {
                    id_venta,
                    estado: 1
                }
            });

            if (!venta) {
                return res.status(404).json({ 
                    success: false,
                    message: "Venta no encontrada" 
                });
            }

            await venta.update({
                estado: 0
            });

            const detalles = await detalleventa.findAll({
                where: {
                    estado: 1,
                    id_venta
                }
            });
            for (const detalle of detalles) {
                await detalle.update({
                    estado: 0
                });
            }
            res.status(200).json({
                success: true,
                message: "Venta desactivada correctamente"
            });
        } catch(error) {
            console.error("Error al desactivar la venta", error);
            res.status(500).json({
                success: false,
                message: "Error al desactivar la venta"
            });
        }

    }
}