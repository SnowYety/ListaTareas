require('colors');
const { guardarDB, leerDb } = require('./helpers/guardarArchivo');
//const {mostarMenu,pausa}= require('./helpers/mensajes');
const {inquirerMenu,pausa, leerInput, listadoTareasBorrar,confirmar, mostrarListadoCheksList} = require('./helpers/inquirer');
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
                tareas.listadoCompleto()
            break;
            case '3':
                tareas.listarPendientesCompletadas();
            break;
            case '4':
                tareas.listarPendientesCompletadas(false);
            break;
            case '5':
                const ids = await mostrarListadoCheksList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;
            case '6':
                const id =await listadoTareasBorrar(tareas.listadoArr);

                if(id !== '0'){
                    const ok = await confirmar('Esta seguro de Borrar esta Tarea');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('La Tarea se Borro correctamente'.green);
                    }
                }
            break;
        }

        guardarDB(tareas.listadoArr);

        await pausa();
    }while( opt !== '0')
    
}

main();