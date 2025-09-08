const { models } = require('../db');
const { sabores } = models;

module.exports = {
listar: async (req, res) => {
    try {
      const data = await sabores.findAll({
        where: { estado:1 }
      });
      res.status(200).json({
        success: true,
        message: "Sabores encontrados",
        data: data
      });
    } catch (error) {
      console.error("Error al listar sabores:", error);
      res.status(500).json({ 
        success:false,
        message: "Error al obtener los sabores" 
      });
    }
  },
  crear: async(req,res) => {
    try{
      const nuevoSabor = await sabores.create(req.body);
      res.status(201).json({
        success: true,
        message: "Sabor creado exitosamente",
        data: nuevoSabor
      });
    } catch(error) {
      console.error("Error al crear sabor",error);
      res.status(500).json({ 
        success:false,
        message: "Error al crear el sabor" 
      });
    }
  },
  actualizar: async(req,res) => {
    try{
      const { id_sabor } =req.params;
      const saborActualizar = await sabores.findOne({ where: { id_sabor, estado:1}});
      if(!saborActualizar || !saborActualizar.estado ){
        return res.status(404).json({
          success: false,
          message: "Sabor no encontrado"
        });
      }
      await saborActualizar.update(req.body);
      res.status(200).json({
        success: true,
        message: "Sabor actualizado exitosamente",
        data: saborActualizar
      });
    }catch(error){
      console.error("Error al actualizar el sabor",error);
      res.status(500).json({ 
        success:false,
        message: "Error al actualizar el sabor"
      })
    }

  },
  desactivar: async (req,res) => {
    try{
      const { id_sabor } =req.params;
      const saborDesactivar = await sabores.findByPk(id_sabor);
      
      if(!saborDesactivar){
      return res.status(404).json({
        success: false,
        message: "Sabor no encontrado" 
      })
      }

      await saborDesactivar.update({ estado:0 });
      res.status(200).json({
        success:true,
        message: "Sabor desactivado exitosamente",
      })

    }catch(error){
      console.error("Error al desactivar el sabor", error);
      res.status(500).json({
        success:false,
        message: "Error al desactivar el sabor"
      });
    }

  }
};