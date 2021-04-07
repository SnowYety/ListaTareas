require('colors');
const { guardarDB, leerDb } = require('./helpers/guardarArchivo');
//const {mostarMenu,pausa}= require('./helpers/mensajes');
const {inquirerMenu,pausa, leerInput} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
console.clear();

const main = async()=>{
    let opt='';
    const tareas = new Tareas();
    const tareasDB = leerDb();

    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }

    do{
        //Imprimir el menu
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                const desc = await leerInput('descripcion: ')
                tareas.crearTarea(desc);
            break;
            case '2':
                console.log(tareas.listadoArr)
            break;
        }

        //guardarDB(tareas.listadoArr);

        await pausa();
    }while( opt !== '0')
    
}

main();