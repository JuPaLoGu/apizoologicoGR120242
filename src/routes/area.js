const express = require("express");
const router = express.Router(); //manejador de rutas de express
const animalSchema = require("../model/animal");
const areaSchema = require("../model/area");

//areas
router.post("/areas", (req, res) =>{
    const area = animalSchema(req.body);
    area
        .save().then((data)=> {
            res.json(data)
        }).catch((error)=> res.send(error));
});

//modificar los datos de un area para agregar un animal
router.put("/areas/:id", async(req, res)=>{
    const{id} = req.params;
    const animal = animalSchema(req.body);
    var idAnimal = null;
    
    const animalConsulta = await animalSchema.findOne ({ codigo: req.body.codigo});
    if(!animalConsulta){
        await animal.save().then((dataAnimal)=>{
            idAnimal = dataAnimal._id;
        });
    }else{
        idAnimal = animalConsulta._id;
    }


areaSchema
    .updateOne({_id: id},{
        $addToSet: {animales:idAnimal}
    })
    .then((data)=> res.json(data))
    .catch((erro) => res.json({message:}))
});

module.exports = router;
