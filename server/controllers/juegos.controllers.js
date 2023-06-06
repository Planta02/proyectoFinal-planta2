const { response, request }= require('express');
const { PrismaClient }= require('@prisma/client');

const prisma = new PrismaClient();

const agregarJuego = async(req=request, res=response) =>{

    const {name, type, price} = req.body;
    const result = await prisma.games.create({
        data:{
            name,
            type,
            price
        }
    }).catch((e)=>{
        return e.message;
    }).finally(async ()=>{
        await prisma.$disconnect()
    })

    res.json({
        result
    })
}

const visualizarJuego = async(req=request, res=response) =>{
    const juegos = await prisma.games.findMany()
    .catch((e)=>{
        return e.message;
    }).finally(async ()=>{
        await prisma.$disconnect()
    })
    res.json({
        juegos
    })
}

const editarJuego = async(req=request, res=response) =>{
    const {id, type, price} = req.body;
    const updateGame = await prisma.games.update({
        where:{
            id,
        },
        data:{
            type,
            price
        },
    }).catch((e)=>{
        return e.message;
    }).finally(async ()=>{
        await prisma.$disconnect()
    })
    res.json({
        updateGame
    })
}

const eliminarJuego = async(req=request, res=response) =>{
    const { name } = req.body;
    const deleteGame = await prisma.games.delete({
        where:{
            name,
        },
    }).catch((e)=>{
        return e.message;
    }).finally(async ()=>{
        await prisma.$disconnect()
    })
    res.json({
        deleteGame
    })
}


module.exports = {
    
    agregarJuego,
    visualizarJuego,
    editarJuego,
    eliminarJuego

}