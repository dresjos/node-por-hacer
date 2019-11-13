const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    //Converting the data into json readable data.
    let data = JSON.stringify(listadoPorHacer);
    //Here is writing the data on the file.
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

    //console.log(listadoPorHacer);
}

const crear = (descripcion) => {

    //cargarDB();
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    //buscar en la DB lo que coincida con la descripcion de parametro
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion)
        //If the value was not found, index=-1
        //otherwise index=position on db
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    //Delete from the array and then guardarDB()
    //the 3 lines below is what I wrote to solve the delete problem. 
    //         let valor = listadoPorHacer.splice(listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion), 1)
    //         guardarDB();
    //         return true;

    //the following lines is the solution from the teacher
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion //va a regresar un array con los diferentes a lo que he escrito
    );
    //if the two arrays have the same length, means nothing has been deleted
    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}