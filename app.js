require('colors');
const {mostarMenu,pausa}= require('./helpers/mensajes');

console.clear();

const main = async()=>{

    let opt='';
    do{
        opt = await mostarMenu();
        console.log({opt})
        await pausa();
    }while( opt !== '0')
    
    //pausa();
}

main();