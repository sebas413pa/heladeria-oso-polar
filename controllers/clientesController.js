const {models} = require('../db');
const { clientes } = models;

module.exports = {
    listar: async (req, res) => {
        try {
            const listaClientes = await clientes.findAll({
                where: { estado: 1 }
            });
            res.status(200).json({
                success: true,
                message: 'Clientes encontrados',
                data: listaClientes
            });
        } catch (error) {
            console.error('Error al listar clientes:', error);
            res.status(500).json({ 
                success: false,
                message: 'Error al obtener los clientes' 
            });
        }
    },
    crear: async (req, res) => {
        try {
            const nuevoCliente = await clientes.create(req.body);
            res.status(201).json({
                success: true,
                message: 'Cliente creado exitosamente',
                data: nuevoCliente
            });
        } catch (error) {
            console.error('Error al crear cliente:', error);
            res.status(500).json({
                success: false,
                message: 'Error al crear el cliente'
            });
        }
    },
    actualizar: async (req, res) => {
        try {
            const { id_cliente } = req.params;
            const clienteActualizar = await clientes.findOne({ where: { id_cliente, estado: 1 } });
            if (!clienteActualizar || !clienteActualizar.estado) {
                return res.status(404).json({
                    success: false,
                    message: 'Cliente no encontrado'
                });
            }
            const clienteModificado = await clientes.update(req.body, {
                where: { id_cliente }
            });
            res.status(200).json({
                success: true,
                message: 'Cliente actualizado exitosamente',
                data: clienteModificado
            });
        } catch (error) {
            console.error('Error al actualizar cliente:', error);
            res.status(500).json({
                success: false,
                message: 'Error al actualizar el cliente'
            });
        }
    },
    desactivar: async (req, res) => {
        try {
            const { id_cliente } = req.params;
            const clienteDesactivar = await clientes.findOne({ where: { id_cliente, estado: 1 } });

            if(!clienteDesactivar) {
                return res.status(404).json({
                    success: false,
                    message: 'Cliente no encontrado'
                });
            }
            await clienteDesactivar.update({ estado: 0 });
            res.status(200).json({
                success: true,
                message: 'Cliente desactivado exitosamente'
            });
        } catch (error) {
            console.error('Error al desactivar cliente:', error);
            res.status(500).json({
                success: false,
                message: 'Error al desactivar el cliente'
            });
        }
      }
    };
